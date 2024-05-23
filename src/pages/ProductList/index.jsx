import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useSelector, useDispatch } from "react-redux";
import { addCart } from "../../cartRedux/cartSlice";
import Footer from "../../components/Footer/index";
import { Text, Heading } from "../../components";
import Header from "../../components/Header";
import { useParams } from "react-router-dom";
import { ImSearch } from "react-icons/im";
import { Link } from "react-router-dom";

export default function ProductListPage() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [sellingPrice, setSellingPrice] = useState("");

  const { prodNum } = useParams();
  const dispatch = useDispatch();
  const cart = useSelector((store) => store.cart.carts);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:4000/categories");
        if (!response.ok) {
          throw new Error("Failed to fetch categories: " + response.status);
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/categories/${prodNum}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch products: " + response.status);
        }
        const data = await response.json();
        const filteredProducts = data.filter((product) =>
          product.productname.toLowerCase().includes(searchValue.toLowerCase())
        );
        setProducts(filteredProducts);
      } catch (error) {
        console.error("Error fetching Products:", error);
      }
    };

    fetchCategories();
    fetchProducts();
  }, [prodNum, searchValue]);

  const handleSearchInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleAddToCartClick = (product) => {
    setSelectedProduct(product);
    setShowPopup(true);
  };

  const handlePopupSubmit = () => {
    if (sellingPrice) {
      const productWithPrice = {
        ...selectedProduct,
        sellingPrice: parseInt(sellingPrice, 10),
      };
      console.log("Submitted product:", productWithPrice);
      dispatch(addCart(productWithPrice));
      setShowPopup(false);
      setSellingPrice("");
    }
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
            <Text as="p">
              <Link to="/">Home</Link>
            </Text>
            <Text as="p" className="!text-blue_gray-100">
              &gt;
            </Text>
            <Text as="p" className="!text-gray-800">
              Product List
            </Text>
          </div>
          <Heading as="h1">Product List</Heading>

          <div className="relative">
            <input
              type="text"
              value={searchValue}
              onChange={handleSearchInputChange}
              placeholder="Search products..."
              style={{ border: "1px solid black" }}
              className="h-10 w-96 pr-10"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 ">
              <ImSearch className="text-xl" />
            </div>
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
                    {products
                      .filter((product) => product.quantity >= 1)
                      .map((product, index) => (
                        <tr
                          key={product.id}
                          className="border border-black bg-slate-300"
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
                              onClick={() => handleAddToCartClick(product)}
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
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white-A700 opacity-100 p-12 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Enter Selling Price</h2>
            <input
              type="number"
              value={sellingPrice}
              onChange={(e) => setSellingPrice(e.target.value)}
              style={{ border: "1px solid black" }}
              className="border border-black p-3 w-full mb-4 h-[2.5rem]"
            />
            <div className="flex justify-end">
              <button
                onClick={() => setShowPopup(false)}
                className="mr-4 px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handlePopupSubmit}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
