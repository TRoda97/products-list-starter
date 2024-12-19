"use client";

import React from "react";
import "./cards.css";
import Image from "next/image";
import { useData } from "../../contexts/DataContext";

const Cards: React.FC = () => {
  const { addNewProductToCart, productsList } = useData();

  return (
    <div className="cards">
      {productsList.map((product) => (
        <div className="product-card" key={product.id}>
          <div className="product-image">
            <Image
              src={product.images[0]}
              alt={product.title}
              layout="fill"
              objectFit="contain"
            />
          </div>
          <div className="product-info">
            <h3 className="product-title">{product.title}</h3>
            <div className="product-footer">
              <p className="product-price">${product.price.toFixed(2)}</p>
              <button
                className="btn-gradient btn-add-to-cart"
                onClick={() => addNewProductToCart(product)}
              >
                Adicionar ao Carrinho
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cards;
