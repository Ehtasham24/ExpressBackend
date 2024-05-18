import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Helmet } from "react-helmet";
import {
  Text,
  Heading,
  Img,
  RatingBar,
  Button,
  CheckBox,
} from "../../components";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import {
  increaseQuantity,
  decreaseQuantity,
  removeCart,
} from "../../cart/cartSlice";

export default function CategorieswithSidebarPage() {
  const [categories, setCategories] = useState([]);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const [formData, setFormData] = useState({
    name: "",
    buying_price: "",
    quantity: "",
    category_id: "",
  });

  const [deletionData, setDeletionData] = useState({ name: "" });

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
    setIsOpen(true);
    const modal = document.getElementById("authentication-modal");
    modal.classList.toggle("hidden");
    modal.classList.toggle("flex");
  };

  const handleUpdateToggle = () => {
    setIsOpen(true);
    const modal = document.getElementById("update-modal");
    modal.classList.toggle("hidden");
    modal.classList.toggle("flex");
  };

  const handleDeleteToggle = () => {
    setIsOpen(true);
    const modal = document.getElementById("delete-modal");
    modal.classList.toggle("hidden");
    modal.classList.toggle("flex");
  };

  const handleModalHide = () => {
    setIsOpen(false);
    const modal = document.getElementById("authentication-modal");
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  };

  const updateModalHide = () => {
    setIsOpen(false);
    const modal = document.getElementById("update-modal");
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  };

  const DeleteModalHide = () => {
    setIsOpen(false);
    const modal = document.getElementById("delete-modal");
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  };

  const handleSubmitProduct = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      console.log(response);
      if (!response.ok) {
        if (response.status === 409)
          throw new Error("Cannot add duplicate products");
        else throw new Error("Failed to add product");
      }
      alert("Product added successfully!");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleUpdationProduct = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/updateproducts", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      console.log(response);
      if (!response.ok) {
        throw new Error("Failed to update product");
      }
      alert("Product updated successfully!");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleDeletionProduct = async () => {
    try {
      const response = await fetch("http://localhost:4000/product", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(deletionData),
      });
      console.log(response);
      if (!response.ok) {
        if (response.status === 409) {
          const productName = deletionData.name;
          throw new Error(`${productName} not found!`);
        } else throw new Error("Failed to delete product");
      }
      alert("Product deleted successfully");
    } catch (err) {
      console.error("Error deleting product:", err);
      alert(err.message);
    }
  };

  const handleChange = (e, setter) => {
    // Extract the name and value from the input field that triggered the change event
    const { name, value } = e.target;

    // Update the form state (formData) with the new value
    setter((prevFormData) => ({
      ...prevFormData, // Spread the previous state to avoid losing existing data
      [name]: value, // Update the specific field (name) with the new value (value)
    }));
  };

  // Inside your component or wherever you want to dispatch the action
  const dispatch = useDispatch();

  const checkOut = () => {
    setIsCartOpen(true);
  };

  const closeCheckout = () => {
    setIsCartOpen(false);
  };

  const handleIncrease = (id) => {
    dispatch(increaseQuantity({ id }));
    // dispatch(updatePrice({ id, price: price * 2 }));
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

      {/* ADD PRODUCT MODAL */}
      <div
        id="authentication-modal"
        tabIndex="-1"
        aria-hidden="true"
        className="hidden opacity-100  overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-white"
      >
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl  opacity-100 z-50  font-semibold text-gray-900 dark:text-white">
                Add Product
              </h3>
              <button
                type="button"
                className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="authentication-modal"
                onClick={handleModalHide}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <div className="p-4 md:p-5  opacity-100 z-50 background bg-white-A700">
              <form
                className="space-y-4"
                action="#"
                onSubmit={handleSubmitProduct}
              >
                <div>
                  <label
                    htmlFor="product_name"
                    className="block mb-2 text-[1rem] font-semibold text-gray-900 dark:text-white opacity-100 z-50"
                  >
                    Product Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="product_name"
                    onChange={(e) => handleChange(e, setFormData)}
                    className="bg-gray-50 border border-gray-300 mt-4 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Enter product"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="buying_price"
                    className="block mb-2 text-[1rem] font-semibold text-gray-900 dark:text-white"
                  >
                    Buying Price
                  </label>
                  <input
                    type="number"
                    name="buying_price"
                    id="buying_price"
                    placeholder="Enter buying price"
                    onChange={(e) => handleChange(e, setFormData)}
                    className="bg-gray-50 border border-gray-300 mt-4 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="Quantity"
                    className="block mb-2 text-[1rem] font-semibold text-gray-900 dark:text-white"
                  >
                    Quantity
                  </label>
                  <input
                    type="number"
                    name="quantity"
                    id="quantity"
                    placeholder="Enter quantity"
                    onChange={(e) => handleChange(e, setFormData)}
                    className="bg-gray-50 border border-gray-800 mt-4 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="Category_id"
                    className="block mb-2 text-[1rem] font-semibold text-gray-900 dark:text-white"
                  >
                    Category ID
                  </label>
                  <input
                    type="number"
                    name="category_id"
                    id="Category_id"
                    placeholder="Enter category id"
                    onChange={(e) => handleChange(e, setFormData)}
                    className="bg-gray-50 border border-gray-300 mt-4 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full text-white-A700 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/*  DELETE PRODUCT MODAL */}

      <div
        id="delete-modal"
        tabIndex="-1"
        aria-hidden="true"
        className="hidden opacity-100  overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-white"
      >
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center  bg-white-A700 justify-between p-4  md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl  opacity-100 z-50  font-semibold text-gray-900 dark:text-white">
                Delete Product
              </h3>
              <button
                type="button"
                className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="delete-modal"
                onClick={DeleteModalHide}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <div className="p-4 md:p-5  opacity-100 z-50 background bg-white-A700">
              <form
                className="space-y-4"
                action="#"
                onSubmit={handleDeletionProduct}
              >
                <div>
                  <label
                    htmlFor="product_name"
                    className="block mb-2 text-[1rem] font-semibold text-gray-900 dark:text-white opacity-100 z-50"
                  >
                    Product Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="product_name"
                    onChange={(e) => handleChange(e, setDeletionData)}
                    className=" border bg-white-A700  border-gray-300 mt-4 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Enter product"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full text-white-A700 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5  text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* UPDATE PRODUCT MODAL */}
      <div
        id="update-modal"
        tabIndex="-1"
        aria-hidden="true"
        className="hidden opacity-100 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-white"
      >
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl  opacity-100 z-50  font-semibold text-gray-900 dark:text-white">
                Update Product
              </h3>
              <button
                type="button"
                className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="update-modal"
                onClick={updateModalHide}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <div className="p-4 md:p-5  opacity-100 z-50 background bg-white-A700">
              <form
                className="space-y-4"
                action="#"
                onSubmit={handleUpdationProduct}
              >
                <div>
                  <label
                    htmlFor="product_name"
                    className="block mb-2 text-[1rem] font-semibold text-gray-900 dark:text-white opacity-100 z-50"
                  >
                    Product Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="product_name"
                    onChange={(e) => handleChange(e, setFormData)}
                    className="bg-gray-50 border border-gray-300 mt-4 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Enter product"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="buying_price"
                    className="block mb-2 text-[1rem] font-semibold text-gray-900 dark:text-white"
                  >
                    Buying Price
                  </label>
                  <input
                    type="number"
                    name="buying_price"
                    id="buying_price"
                    placeholder="Enter buying price"
                    onChange={(e) => handleChange(e, setFormData)}
                    className="bg-gray-50 border border-gray-300 mt-4 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="Quantity"
                    className="block mb-2 text-[1rem] font-semibold text-gray-900 dark:text-white"
                  >
                    Quantity
                  </label>
                  <input
                    type="number"
                    name="quantity"
                    id="quantity"
                    placeholder="Enter quantity"
                    onChange={(e) => handleChange(e, setFormData)}
                    className="bg-gray-50 border border-gray-800 mt-4 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="Category_id"
                    className="block mb-2 text-[1rem] font-semibold text-gray-900 dark:text-white"
                  >
                    Category ID
                  </label>
                  <input
                    type="number"
                    name="category_id"
                    id="Category_id"
                    placeholder="Enter category id"
                    onChange={(e) => handleChange(e, setFormData)}
                    className="bg-gray-50 border border-gray-300 mt-4 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full text-white-A700 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-start w-full bg-white-A700">
        <Header className="flex flex-row justify-between items-center w-full p-6 sm:p-5 bg-white-A700" />

        <div
          className={`flex flex-col items-center justify-start w-full mt-8 gap-14 md:px-5 max-w-[1636px] relative ${
            isOpen ? "opacity-50 pointer-events-none" : ""
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

                  {/* 
                  trying new feature  */}
                  {isCartOpen && (
                    <div
                      className="relative z-10"
                      aria-labelledby="slide-over-title"
                      role="dialog"
                      aria-modal="true"
                    >
                      <div className="fixed inset-0   bg-white-A700  bg-opacity-75 transition-opacity"></div>

                      <div className="fixed inset-0 overflow-hidden">
                        <div className="absolute inset-0 overflow-hidden">
                          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                            <div className="pointer-events-auto w-screen max-w-md">
                              <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6  bg-white-A700">
                                  <div className="flex items-start justify-between">
                                    <h2
                                      className="text-lg font-medium text-gray-900"
                                      id="slide-over-title"
                                    >
                                      Shopping cart
                                    </h2>
                                    <div className="ml-3 flex h-7 items-center">
                                      <button
                                        type="button"
                                        className="relative -m-2 p-2  bg-white-A700 hover:text-gray-500"
                                        onClick={closeCheckout}
                                      >
                                        <span className="absolute -inset-0.5"></span>
                                        <span className="sr-only">
                                          Close panel
                                        </span>
                                        <svg
                                          className="h-6 w-6"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          strokeWidth="1.5"
                                          stroke="currentColor"
                                          aria-hidden="true"
                                        >
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M6 18L18 6M6 6l12 12"
                                          />
                                        </svg>
                                      </button>
                                    </div>
                                  </div>

                                  <div className="mt-8">
                                    <div className="flow-root">
                                      <ul
                                        role="list"
                                        className="-my-6 divide-y divide-gray-200"
                                      >
                                        {cart.map((item) => (
                                          <li className="flex py-6">
                                            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                              <img
                                                src="https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg"
                                                alt="Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch."
                                                className="h-full w-full object-cover object-center"
                                              />
                                            </div>

                                            <div className="ml-4 flex flex-1 flex-col">
                                              <div>
                                                <div className="flex justify-between text-base font-medium text-gray-900">
                                                  <h3>
                                                    <a href="#">
                                                      {item.productname}
                                                    </a>
                                                  </h3>
                                                  {/*   <p className="ml-4">
                                                    {item.buyingprice}
                                                  </p> */}
                                                </div>
                                              </div>
                                              <div className="flex flex-1 items-end justify-between text-sm">
                                                <h2>Quantity: </h2>

                                                <button
                                                  onClick={() =>
                                                    handleDecrease(item.id)
                                                  }
                                                >
                                                  -
                                                </button>
                                                <p className="text-black">
                                                  {item.quantity}
                                                </p>
                                                <button
                                                  onClick={() =>
                                                    handleIncrease(item.id)
                                                  }
                                                >
                                                  +
                                                </button>
                                              </div>
                                              <div className="flex mt-3">
                                                <button
                                                  type="button"
                                                  className="font-medium text-indigo-600 hover:text-indigo-500 text-sm"
                                                >
                                                  Remove
                                                </button>
                                              </div>
                                            </div>
                                          </li>
                                        ))}

                                        {/* More products... */}
                                      </ul>
                                    </div>
                                  </div>
                                </div>

                                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                                  <div className="flex justify-between text-base font-medium text-gray-900">
                                    <p>Subtotal</p>
                                    <p>$262.00</p>
                                  </div>
                                  <p className="mt-0.5 text-sm text-gray-500">
                                    Shipping and taxes calculated at checkout.
                                  </p>
                                  <div className="mt-6">
                                    <a
                                      href="#"
                                      className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                                    >
                                      Checkout
                                    </a>
                                  </div>
                                  <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                    <p>
                                      or
                                      <button
                                        type="button"
                                        className="font-medium text-indigo-600 hover:text-indigo-500"
                                      >
                                        Continue Shopping
                                        <span aria-hidden="true"> &rarr;</span>
                                      </button>
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
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
