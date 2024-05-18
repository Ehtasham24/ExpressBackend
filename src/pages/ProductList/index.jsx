import React from "react";
import { Helmet } from "react-helmet";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addCart } from "../../cart/cartSlice";
import Footer from "../../components/Footer/index";
import store from "../../store/store";
import {
  Text,
  Input,
  Img,
  Heading,
  Button,
  RatingBar,
  CheckBox,
} from "../../components";
import Header from "../../components/Header";
import { useParams } from "react-router-dom";

export default function ProductListPage() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const { prodNum } = useParams();

  console.log("idddddddddddd", prodNum);

  const fetchCategories = async () => {
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

  const fetchProducts = async (id) => {
    try {
      console.log(id);
      const response = await fetch(`http://localhost:4000/categories/${id}`);

      if (!response.ok) {
        throw new Error("Failed to fetch products: " + response.status);
      }

      const data = await response.json();
      console.log("Products data:", data);

      const filteredProducts = data.filter((product) =>
        product.productname.toLowerCase().includes(searchValue.toLowerCase())
      );

      setProducts(filteredProducts);
      // setProducts(data);
    } catch (error) {
      console.error("Error fetching Products:", error);
    }
  };

  const handleSearchInputChange = (event) => {
    console.log("Event:", event); // Check the event object
    // console.log(event.target.value);
    setSearchValue(event.target.value);
  };

  useEffect(() => {
    fetchCategories();
    fetchProducts(prodNum);
  }, [searchValue]);

  const dispatch = useDispatch();
  const cart = useSelector((store) => store.cart.carts);

  const cartAddition = (product) => {
    dispatch(addCart(product));
    console.log(store.getState());
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
      <div className="flex flex-col items-center justify-start w-full bg-white-A700">
        <Header className="flex flex-row justify-between items-center w-full p-6 sm:p-5 bg-white-A700" />
        <div className="flex flex-col items-center justify-start w-full mt-[31px] gap-[51px] md:px-5 max-w-[1632px]">
          <div className="flex flex-row justify-between w-[13%] md:w-full">
            <Text as="p">Home</Text>
            <Text as="p" className="!text-blue_gray-100">
              &gt;
            </Text>
            <Text as="p" className="!text-gray-800">
              Product List
            </Text>
          </div>
          <Heading as="h1">Product List</Heading>
          <div className="flex gap-10 text-xl">
            <input
              type="text"
              value={searchValue}
              onChange={handleSearchInputChange}
              placeholder="Search products..."
              style={{ border: "1px solid black" }}
              className="h-10 w-96"
            />

            {/*      {SEARCH BAR STARTS} */}

            {/*      {SEARCH BAR ENDS} */}
          </div>
          <div className="flex flex-row md:flex-col justify-start items-start w-full gap-8 md:gap-5">
            <div className="flex flex-col items-start justify-start w-[16%] md:w-full gap-8">
              <div className="flex flex-col items-start justify-start w-full gap-[31px]">
                <div className="flex flex-col items-start justify-start w-full gap-[29px]">
                  <Text as="p" className="!text-gray-800">
                    Categories
                  </Text>
                  <div className="h-px w-full bg-blue_gray-100" />
                </div>
                <div className="flex flex-col items-start justify-start w-[60%] md:w-full gap-[23px]">
                  {categories.map((category, index) => (
                    <div
                      className="flex flex-row justify-start items-center gap-4"
                      key={index}
                    >
                      <Text as="p" className="!font-normal">
                        {category.category_name}
                      </Text>
                    </div>
                  ))}
                </div>
              </div>
              <div className="h-px w-full bg-blue_gray-100" />
            </div>
            <div className="flex flex-col items-center justify-start w-[84%] md:w-full gap-[29px]">
              <div className="h-[900px] overflow-y-auto">
                <table className="w-full border border-black">
                  <thead>
                    <tr className="flex gap-52 justify-between py-3">
                      <th className=" pl-5">No</th>
                      <th className="whitespace-nowrap">Product Name</th>
                      <th>Quantity</th>
                      <th className="whitespace-nowrap">Buying Price</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product, index) => (
                      <tr
                        key={product.id}
                        className=" border border-black bg-slate-300"
                      >
                        <td className="text-lg uppercase font-bold pl-5 py-3">
                          {index + 1}.
                        </td>
                        <td className="text-lg uppercase font-bold">
                          {product.productname}
                        </td>
                        <td className="text-black-600 pl-12 text-xl">
                          {product.quantity}
                        </td>
                        <td className="text-black-600 pl-16 text-xl">
                          {product.buyingprice}
                        </td>
                        <td className="flex justify-end">
                          <button
                            onClick={() => cartAddition(product)}
                            className="mr-4 px-4 py-2 mt-2 bg-gray-800 text-white-A700 text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                          >
                            Add to cart
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <Footer className="flex justify-center items-center w-full mt-[85px] p-[30px] sm:p-5 bg-gray-800" />
      </div>
    </>
  );
}
