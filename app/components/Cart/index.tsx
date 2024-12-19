"use client";

import React from "react";
import { useData } from "../../contexts/DataContext";
import "./cart.css";

const Cart: React.FC = () => {
  const {
    setOpenModal,
    addNewProductToCart,
    reduceProductFromCart,
    removeProductFromCart,
    cartProducts,
  } = useData();

  const calculateTotal = () => {
    return cartProducts.reduce((total, product) => {
      const productTotal = product.amount
        ? product.price * product.amount
        : product.price;
      return total + productTotal;
    }, 0);
  };

  const totalAmount = calculateTotal();

  return (
    <div className="cart">
      <h2 className="description">Cart</h2>
      {cartProducts.length ? (
        <>
          {cartProducts.map((product) => (
            <div className="cart-products" key={product.id}>
              <div className="cart-text">
                <h4 className="cart-title">{product.title}</h4>
                <h4 className="cart-price">
                  $
                  {product.amount
                    ? (product.price * product.amount).toFixed(2)
                    : product.price.toFixed(2)}
                </h4>
              </div>
              <div className="cart-amount">
                <button
                  className="btn-amount"
                  onClick={() => reduceProductFromCart(product.id)}
                >
                  -
                </button>
                <h5 className="cart-number">{product?.amount}</h5>
                <button
                  className="btn-amount"
                  onClick={() => addNewProductToCart(product)}
                >
                  +
                </button>
                <button
                  className="btn-remove-item"
                  onClick={() => removeProductFromCart(product.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="cart-total">
            <h4 className="cart-total-text">Total:</h4>
            <h4 className="cart-total-amount">${totalAmount.toFixed(2)}</h4>
          </div>
          <button
            className="btn-gradient btn-confirm"
            onClick={() => setOpenModal(true)}
          >
            Confirm Order
          </button>
        </>
      ) : (
        <h4 className="no-items">Add some items to the cart.</h4>
      )}
    </div>
  );
};

export default Cart;
