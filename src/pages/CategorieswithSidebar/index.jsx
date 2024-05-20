import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Helmet } from "react-helmet";
import { Text, Heading } from "../../components";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

import { useNavigate } from "react-router-dom";
import {
  increaseQuantity,
  decreaseQuantity,
  removeCart,
} from "../../cartRedux/cartSlice";

import AddProductModal from "../../categoriesComponents/addProductModel";
import DeleteProductModal from "../../categoriesComponents/deleteProductModal";
import UpdateProductModal from "categoriesComponents/updateProductModal";
import CartCheckout from "categoriesComponents/cartCheckout";

export default function CategorieswithSidebarPage() {
  const isOpen = useSelector((state) => state.isOpen);

  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);

  const [Open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [isCartOpen, setIsCartOpen] = useState(false);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:4000/categories");

      if (!response.ok) {
        throw new Error("Failed to fetch categories: " + response.status);
      }

      const data = await response.json();
      console.log("Categories data:", data);
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const productsPage = (prodNum) => {
    navigate(`/ProductList/${prodNum}`);
  };

  const handleModalToggle = () => {
    setOpen(true);
    const modal = document.getElementById("authentication-modal");
    modal.classList.toggle("hidden");
    modal.classList.toggle("flex");
  };

  const handleUpdateToggle = () => {
    setOpen(true);
    const modal = document.getElementById("update-modal");
    modal.classList.toggle("hidden");
    modal.classList.toggle("flex");
  };

  const handleDeleteToggle = () => {
    setOpen(true);
    const modal = document.getElementById("delete-modal");
    modal.classList.toggle("hidden");
    modal.classList.toggle("flex");
  };

  const checkOut = () => {
    setIsCartOpen(true);
  };

  const closeCheckout = () => {
    setIsCartOpen(false);
  };

  const handleIncrease = (id) => {
    dispatch(increaseQuantity({ id }));
  };

  const handleDecrease = (id) => {
    const currentItem = cart.find((item) => item.id === id); // Find the item in the cart
    if (currentItem && currentItem.quantity > 0) {
      dispatch(decreaseQuantity({ id }));
      if (currentItem.quantity === 1) {
        // If the quantity becomes 0 after decreasing, remove the item from the cart
        dispatch(removeCart({ id }));
      }
    }
  };

  //close the add modal
  const handleModalHide = () => {
    setOpen(false);

    const modal = document.getElementById("authentication-modal");

    modal.classList.add("hidden");
    modal.classList.remove("flex");
  };

  //close the  delete modal
  const deleteModalHide = () => {
    setOpen(false);
    const modal = document.getElementById("delete-modal");
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  };

  //close the update modal
  const updateModalHide = () => {
    setOpen(false);
    const modal = document.getElementById("update-modal");
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  };

  const cart = useSelector((store) => store.cart.carts);

  return (
    <>
      <Helmet>
        <title>POS system</title>
        <meta
          name="description"
          content="Web site created using create-react-app"
        />
      </Helmet>

      {/*  ADD PRODUCT MODAL */}

      <AddProductModal handleModalHide={handleModalHide} />

      {/*  DELETE PRODUCT MODAL */}

      <DeleteProductModal deleteModalHide={deleteModalHide} />

      {/* UPDATE PRODUCT MODAL */}
      <UpdateProductModal updateModalHide={updateModalHide} />

      <div className="flex flex-col items-center justify-start w-full bg-white-A700">
        <Header className="flex flex-row justify-between items-center w-full p-6 sm:p-5 bg-white-A700" />
        {console.log("isOpen", Open)}
        <div
          className={`flex flex-col items-center justify-start w-full mt-8 gap-14 md:px-5 max-w-[1636px] relative ${
            Open ? "opacity-50 pointer-events-none" : ""
          }`}
        >
          <Heading as="h1">Categories</Heading>
          <div className="flex flex-row md:flex-col justify-start items-start w-full gap-8 md:gap-5">
            <div className="flex flex-col items-center justify-start w-[16%] md:w-full gap-4">
              <div className="flex flex-col items-start justify-start w-full gap-[29px]">
                <div className="flex flex-col gap-5 justify-between items-center w-full">
                  {/* ADD PRODUCT BUTTON */}
                  <Text as="p" className="!text-gray-800 text-lg">
                    <button
                      data-modal-target="authentication-modal"
                      data-modal-toggle="authentication-modal"
                      className="block text-white-A700 bg-gray-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-7 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      type="button"
                      onClick={(e) => {
                        handleModalToggle();
                      }}
                    >
                      Add Product
                    </button>
                  </Text>

                  {/* DELETE PRODUCT BUTTON */}
                  <Text as="p" className="!text-gray-800 text-lg">
                    <button
                      data-modal-target="delete-modal"
                      data-modal-toggle="delete-modal"
                      className="block text-white-A700 bg-gray-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      type="button"
                      onClick={(e) => {
                        handleDeleteToggle();
                      }}
                    >
                      Delete Product
                    </button>
                  </Text>

                  {/* UPDATE PRODUCT BUTTON */}
                  <Text as="p" className="!text-gray-800 text-lg">
                    <button
                      data-modal-target="update-modal"
                      data-modal-toggle="update-modal"
                      className="block text-white-A700 bg-gray-700 mb-5 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      type="button"
                      onClick={(e) => {
                        handleUpdateToggle();
                      }}
                    >
                      Update Product
                    </button>
                  </Text>
                </div>
              </div>
              <div className="h-px w-full bg-blue_gray-100 " />
              <div className="flex flex-col items-start justify-start w-full gap-[29px]">
                {/*   displaying cart */}

                <div className="ml-16">
                  <h2 className="ml-3 font-extrabold text-xl">Cart Items</h2>
                  <ul className="mt-3">
                    {cart.map((item) => (
                      <li
                        key={item.id}
                        className="w-auto pl-5 pr-5 text-lg mb-2 bg-gray-200 "
                      >
                        {item.productname}
                      </li>
                    ))}
                  </ul>
                  {cart.length > 0 && (
                    <Text as="p" className="!text-gray-800 text-sm">
                      <button
                        className="mt-7 ml-3  block text-white-A700 bg-gray-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        type="button"
                        onClick={checkOut}
                      >
                        Checkout
                      </button>
                    </Text>
                  )}

                  {/* cart checkout  */}
                  <CartCheckout
                    isCartOpen={isCartOpen}
                    closeCheckout={closeCheckout}
                    cart={cart}
                    handleDecrease={handleDecrease}
                    handleIncrease={handleIncrease}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-row justify-start w-[84%] md:w-full">
              <div className="flex flex-col items-center justify-start w-full gap-8">
                <div className="justify-center w-full gap-8 grid-cols-2 md:grid-cols-1 md:gap-5 grid">
                  {categories.map((category, index) => (
                    <button
                      onClick={() => productsPage(category.id)}
                      key={category.id}
                    >
                      <div className="flex flex-row sm:flex-col justify-center items-center w-full gap-4 p-[43px] md:p-5 sm:gap-4 bg-gray-50">
                        <div className="h-[130px] w-[130px] ml-[109px] md:ml-5" />
                        <div className="flex flex-col items-start justify-start w-[32%] sm:w-full mr-[109px] md:mr-5">
                          <Heading as="h2">{category.category_name}</Heading>

                          <Text size="lg" as="p">
                            Collection
                          </Text>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer className="flex justify-center items-center w-full mt-[85px] p-[30px] sm:p-5 bg-gray-800" />
      </div>
    </>
  );
}
