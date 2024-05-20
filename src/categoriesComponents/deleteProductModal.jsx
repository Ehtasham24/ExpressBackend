import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setOpen } from "../cartRedux/isOpenSlice"; // Adjust the path as necessary

const DeleteProductModal = ({ deleteModalHide }) => {
  const [deletionData, setDeletionData] = useState({
    name: "",
  });

  const isOpen = useSelector((state) => state.isOpen.isOpen);
  const dispatch = useDispatch();

  const handleDeletionProduct = async (e) => {
    e.preventDefault();
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDeletionData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <div
      id="delete-modal"
      tabIndex="-1"
      aria-hidden="true"
      className={`${
        isOpen ? "flex" : "hidden"
      } opacity-100  overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-white`}
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
              onClick={deleteModalHide}
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
                  onChange={handleChange}
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
  );
};

export default DeleteProductModal;
