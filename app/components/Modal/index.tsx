"use client";

import { useData } from "@/app/contexts/DataContext";
import React, { useEffect, useRef, useState } from "react";
import "./modal.css";
import { Bounce, toast, ToastContainer } from "react-toastify";

interface DataConfirmation {
  name: string;
  email: string;
  address: string;
}

const ModalConfirmOrder: React.FC = () => {
  const [dataConfirmation, setDataConfirmation] = useState<DataConfirmation>({
    name: "",
    email: "",
    address: "",
  });
  const { openModal, setCartProducts, setOpenModal } = useData();
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (openModal && modalRef.current) {
      modalRef.current.focus();
    }
  }, [openModal]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const modalElement = document.querySelector(".modal-content");
      if (modalElement && !modalElement.contains(event.target as Node)) {
        setOpenModal(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setOpenModal]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDataConfirmation((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      dataConfirmation.name &&
      dataConfirmation.email &&
      dataConfirmation.address
    ) {
      setCartProducts([]);
      toast.success("Your order is confirmed", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
        theme: "light",
        transition: Bounce,
      });
      setOpenModal(false);
    }
  };

  return (
    <>
      <ToastContainer />
      {openModal ? (
        <div className="modal" ref={modalRef} tabIndex={0} role="dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Confirm your order</h2>
              <button
                className="btn-close-modal"
                aria-label="Close modal"
                onClick={() => setOpenModal(false)}
              >
                X
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="modal-name">
                  <label className="label" htmlFor="name">
                    Name
                  </label>
                  <input
                    className="input"
                    id="name"
                    type="text"
                    name="name"
                    value={dataConfirmation.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="modal-email">
                  <label className="label" htmlFor="email">
                    Email
                  </label>
                  <input
                    className="input"
                    id="email"
                    type="email" // Eu sei que apenas assim aceita emails como "teste@domain" sem .com ou .pt por exemplo,
                    // mas pesquisei e vi que existem emails válidos assim então preferi não alterar. Mas se fosse para ser menos flexível, usaria regex,
                    // algo deste gênero: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
                    name="email"
                    value={dataConfirmation.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="modal-address">
                  <label className="label" htmlFor="address">
                    Address
                  </label>
                  <input
                    className="input"
                    id="address"
                    type="text"
                    name="address"
                    value={dataConfirmation.address}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <button className="btn-gradient btn-submit-order" type="submit">
                Submit Order
              </button>
            </form>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default ModalConfirmOrder;
