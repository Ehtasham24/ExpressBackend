import React, { useEffect, useState } from "react";
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
/* import { LiaPrescriptionBottleSolid } from "react-icons/lia";
  import { TbToolsKitchen } from "react-icons/tb";
  import { IoHomeOutline } from "react-icons/io5";
  import { MdOutlineKitchen } from "react-icons/md"; */

export default function CategorieswithSidebarPage() {
  const [categories, setCategories] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    buying_price: "",
    quantity: "",
    category_id: "",
  });

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

  const handleModalHide = () => {
    setIsOpen(false);
    const modal = document.getElementById("authentication-modal");
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
        throw new Error("Failed to submit form");
      }
      alert("Form submitted successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit form. Please try again later.");
    }
  };

  const handleChange = (e) => {
    // Extract the name and value from the input field that triggered the change event
    const { name, value } = e.target;

    // Update the form state (formData) with the new value
    setFormData((prevFormData) => ({
      ...prevFormData, // Spread the previous state to avoid losing existing data
      [name]: value, // Update the specific field (name) with the new value (value)
    }));
  };

  return (
    <>
      <Helmet>
        <title>POS system</title>
        <meta
          name="description"
          content="Web site created using create-react-app"
        />
      </Helmet>

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
                    onChange={handleChange}
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
                    onChange={handleChange}
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
                    onChange={handleChange}
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
                    onChange={handleChange}
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
            <div className="flex flex-col items-center justify-start w-[16%] md:w-full gap-8">
              <div className="flex flex-col items-start justify-start w-full gap-[29px]">
                <div className="flex flex-row justify-between items-center w-full">
                  <Text as="p" className="!text-gray-800 text-lg">
                    <button
                      data-modal-target="authentication-modal"
                      data-modal-toggle="authentication-modal"
                      className="block text-white-A700 bg-gray-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      type="button"
                      onClick={(e) => {
                        handleModalToggle();
                      }}
                    >
                      Add Product
                    </button>
                  </Text>
                </div>
                {/*    <div className="flex flex-col items-start justify-start w-[68%] md:w-full gap-6">
                    <CheckBox
                      shape="square"
                      name="allprice"
                      label="All Price"
                      id="allprice"
                      className="gap-4 text-left"
                    />
                    <div className="flex flex-row justify-start items-center gap-4">
                      <Button size="xs" shape="square" className="w-[24px]">
                        <Img src="images/img_checkedbox.svg" />
                      </Button>
                      <Text as="p" className="!text-gray-800 !font-normal">
                        $100 - $250
                      </Text>
                    </div>
                    <CheckBox
                      shape="square"
                      name="square"
                      label="$250 - $500"
                      id="square"
                      className="gap-4 text-left"
                    />
                    <CheckBox
                      shape="square"
                      name="square_one"
                      label="$750 - $1.000"
                      id="squareone"
                      className="gap-4 text-left"
                    />
                    <CheckBox
                      shape="square"
                      name="square_two"
                      label="$1000 - $1.500"
                      id="squaretwo"
                      className="gap-4 text-left"
                    />
                  </div> */}
              </div>
              <div className="h-px w-full bg-blue_gray-100" />
              <div className="flex flex-col items-start justify-start w-full gap-[29px]">
                <div className="flex flex-row justify-between items-center w-full">
                  <Text as="p" className="mt-px !text-gray-800">
                    Filter by Rating
                  </Text>
                  <Img
                    src="images/img_arrow_down.svg"
                    alt="arrowdown_three"
                    className="h-[24px] w-[24px]"
                  />
                </div>
                <div className="flex flex-col items-start justify-start w-[79%] md:w-full gap-4">
                  <div className="flex flex-row justify-start w-[34%] md:w-full gap-4">
                    <div className="h-[24px] w-[24px] border-blue_gray-100 border-[3px] border-solid" />
                    <div className="flex flex-col items-center justify-start h-[24px] w-[24px]">
                      <Img
                        src="images/img_star_1.svg"
                        alt="image_one"
                        className="h-[24px] w-[24px]"
                      />
                    </div>
                  </div>
                  <div className="flex flex-row justify-start w-[50%] md:w-full gap-4">
                    <div className="h-[24px] w-[24px] border-blue_gray-100 border-[3px] border-solid" />
                    <div className="flex flex-row justify-start w-[59%] gap-2">
                      <Img
                        src="images/img_star_1_24x24.svg"
                        alt="image_two"
                        className="h-[24px] w-[24px]"
                      />
                      <Img
                        src="images/img_star_2.svg"
                        alt="image_three"
                        className="h-[24px] w-[24px]"
                      />
                    </div>
                  </div>
                  <div className="flex flex-row justify-start w-[67%] md:w-full gap-4">
                    <div className="h-[24px] w-[24px] border-blue_gray-100 border-[3px] border-solid" />
                    <RatingBar
                      value={3}
                      isEditable={true}
                      color="#fae952"
                      activeColor="#fae952"
                      size={24}
                      starCount={3}
                      className="flex justify-between"
                    />
                  </div>
                  <div className="flex flex-row justify-start gap-4">
                    <Button size="xs" shape="square" className="w-[24px]">
                      <Img src="images/img_checkedbox.svg" />
                    </Button>
                    <RatingBar
                      value={4}
                      isEditable={true}
                      color="#fae952"
                      activeColor="#fae952"
                      size={24}
                      starCount={4}
                      className="flex justify-between"
                    />
                  </div>
                  <div className="flex flex-row justify-start w-full gap-4">
                    <div className="h-[24px] w-[24px] border-blue_gray-100 border-[3px] border-solid" />
                    <RatingBar
                      value={5}
                      isEditable={true}
                      color="#fae952"
                      activeColor="#fae952"
                      size={24}
                      className="flex justify-between"
                    />
                  </div>
                </div>
              </div>
              <div className="h-px w-full bg-blue_gray-100" />
              <div className="flex flex-row justify-between items-center w-full">
                <Text as="p" className="mt-px !text-gray-800">
                  Filter by Brand
                </Text>
                <Img
                  src="images/img_arrow_down.svg"
                  alt="arrowdown_five"
                  className="h-[24px] w-[24px]"
                />
              </div>
              <div className="flex flex-row justify-between items-center w-full">
                <Text as="p" className="mt-px !text-gray-800">
                  Filter by Size
                </Text>
                <Img
                  src="images/img_arrow_down.svg"
                  alt="arrowdown_seven"
                  className="h-[24px] w-[24px]"
                />
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
