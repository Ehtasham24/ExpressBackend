import React, { useState } from "react";
import { useDispatch } from "react-redux";

const AddProductModal = ({ handleModalHide }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    buying_price: "",
    quantity: "",
    category_id: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
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

  return (
    <div
      id="authentication-modal"
      tabIndex="-1"
      aria-hidden="true"
      className={`hidden opacity-100 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-white`}
    >
      {" "}
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
  );
};

export default AddProductModal;
