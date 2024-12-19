"use client";

import { getProductsList, Product } from "@/services/product";
import React, { createContext, useState, useEffect, useContext } from "react";
import "../page.css";

type DataContextType = {
  productsList: Product[];
  loading: boolean;
  error: string | null;
  cartProducts: Product[];
  openModal: boolean;
  addNewProductToCart: (product: Product) => void;
  reduceProductFromCart: (productId: number) => void;
  removeProductFromCart: (productId: number) => void;
  setOpenModal: (value: boolean) => void;
  setCartProducts: (value: Product[]) => void;
};

interface Props {
  children: React.ReactNode;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<Props> = ({ children }) => {
  const [productsList, setProductsList] = useState<Product[]>([]);
  const [cartProducts, setCartProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const storedCart = localStorage.getItem("cartProducts");
    if (storedCart) {
      setCartProducts(JSON.parse(storedCart));
    }
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await getProductsList();
      setProductsList(data);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Ocorreu um erro desconhecido");
      }
    } finally {
      setLoading(false);
    }
  };

  const addNewProductToCart = (product: Product) => {
    setCartProducts((prevState) => {
      const existingProductIndex = prevState.findIndex(
        (item) => item.id === product.id,
      );

      let updatedCart;
      if (existingProductIndex !== -1) {
        updatedCart = prevState.map((item, index) =>
          index === existingProductIndex
            ? { ...item, amount: (item.amount || 1) + 1 }
            : item,
        );
      } else {
        updatedCart = [...prevState, { ...product, amount: 1 }];
      }

      localStorage.setItem("cartProducts", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const reduceProductFromCart = (productId: number) => {
    setCartProducts((prevState) => {
      const updatedCart = prevState.reduce((acc, item) => {
        if (item.id === productId) {
          if (item?.amount && item.amount > 1) {
            acc.push({ ...item, amount: item.amount - 1 });
          }
        } else {
          acc.push(item);
        }
        return acc;
      }, [] as Product[]);

      localStorage.setItem("cartProducts", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const removeProductFromCart = (productId: number) => {
    setCartProducts((prevState) => {
      const updatedCart = prevState.filter((item) => item.id !== productId);

      localStorage.setItem("cartProducts", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  if (loading)
    return (
      <div className="loading-container">
        <div className="loading" />
      </div>
    );
  if (error) return <div className="error">{error}</div>;

  return (
    <DataContext.Provider
      value={{
        productsList,
        loading,
        error,
        cartProducts,
        openModal,
        addNewProductToCart,
        reduceProductFromCart,
        removeProductFromCart,
        setOpenModal,
        setCartProducts,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = (): DataContextType => {
  const context = useContext(DataContext);

  if (!context) {
    throw new Error("useData must be used within an DataProvider");
  }

  return context;
};
