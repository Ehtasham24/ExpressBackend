import React from "react";
import { Helmet } from "react-helmet";
import { useState, useEffect } from "react";
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
              <div className="flex flex-col items-start justify-start w-[68%] md:w-full gap-[29px]">
                <Text as="p" className="!text-gray-800">
                  Filter by Price
                </Text>
                <div className="flex flex-col items-start justify-start w-full gap-6">
                  <CheckBox
                    shape="square"
                    name="allprice"
                    label="All Price"
                    id="allprice"
                    className="gap-4 text-left"
                  />
                  <CheckBox
                    color="gray_800"
                    variant="fill"
                    shape="square"
                    name="vector_eight"
                    label="$100 - $250"
                    id="vectoreight"
                    className="gap-4 text-left"
                  />
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
                </div>
              </div>
              <div className="h-px w-full bg-blue_gray-100" />
              <div className="flex flex-col items-start justify-start w-[79%] md:w-full gap-[29px]">
                <Text as="p" className="!text-gray-800">
                  Filter by Rating
                </Text>
                <div className="flex flex-col items-start justify-start w-full gap-4">
                  <div className="flex flex-row justify-start w-[34%] md:w-full gap-4">
                    <div className="h-[24px] w-[24px] border-blue_gray-100 border-[3px] border-solid" />
                    <div className="flex flex-col items-center justify-start h-[24px] w-[24px]">
                      <Img
                        src="images/img_star_1_1.svg"
                        alt="image_one"
                        className="h-[24px] w-[24px]"
                      />
                    </div>
                  </div>
                  <div className="flex flex-row justify-start w-[50%] md:w-full gap-4">
                    <div className="h-[24px] w-[24px] border-blue_gray-100 border-[3px] border-solid" />
                    <div className="flex flex-row justify-start w-[59%] gap-2">
                      <Img
                        src="images/img_star_1_2.svg"
                        alt="image_two"
                        className="h-[24px] w-[24px]"
                      />
                      <Img
                        src="images/img_star_2_24x24.svg"
                        alt="image_three"
                        className="h-[24px] w-[24px]"
                      />
                    </div>
                  </div>
                  <RatingBar
                    value={1}
                    isEditable={true}
                    color="#fae952"
                    activeColor="#fae952"
                    size={24}
                    starCount={2}
                    className="flex justify-between"
                  />
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
                          <button className="mr-4 px-4 py-2 mt-2 bg-gray-800 text-white-A700 text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700">
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
        <footer className="flex justify-center items-center w-full mt-[100px]">
          <div className="flex flex-col items-center justify-center w-full gap-[97px] p-[30px] sm:p-5 bg-gray-800">
            <div className="flex flex-row md:flex-col justify-between items-start w-full mt-[31px] md:gap-10 md:px-5 max-w-[1632px]">
              <div className="flex flex-col items-start justify-start w-[26%] md:w-full gap-[31px]">
                <div className="flex flex-row justify-start items-start gap-2">
                  <Img
                    src="images/img_group_19_white_a700.svg"
                    alt="image_four"
                    className="h-[24px] mt-1"
                  />
                  <Heading size="xs" as="h4" className="!text-white-A700">
                    Elliye{" "}
                  </Heading>
                </div>
                <div className="flex flex-row justify-start">
                  <Text as="p" className="!font-normal leading-8">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor .
                  </Text>
                </div>
                <div className="flex flex-col items-center justify-start w-full gap-4">
                  <div className="flex flex-row justify-start items-center w-full gap-2 py-0.5">
                    <Img
                      src="images/img_call.svg"
                      alt="call_one"
                      className="h-[24px] w-[24px]"
                    />
                    <Text as="p" className="!text-white-A700 !font-normal">
                      +1234567890
                    </Text>
                  </div>
                  <div className="flex flex-row justify-start items-center w-full gap-2">
                    <Img
                      src="images/img_email_white_a700.svg"
                      alt="email_three"
                      className="h-[24px] w-[24px]"
                    />
                    <Text
                      as="p"
                      className="mt-0.5 !text-white-A700 !font-normal"
                    >
                      elliye@support.com
                    </Text>
                  </div>
                </div>
              </div>
              <div className="flex flex-row md:flex-col justify-start items-start w-[58%] md:w-full gap-8 md:gap-5">
                <div className="flex flex-col items-start justify-start w-[27%] md:w-full gap-[33px]">
                  <Heading size="xs" as="h4" className="!text-white-A700">
                    Product Links
                  </Heading>
                  <div className="flex flex-col items-start justify-center gap-[15px]">
                    <Text as="p" className="mt-px !font-normal">
                      Categories
                    </Text>
                    <Text as="p" className="!font-normal">
                      New Arrival
                    </Text>
                    <Text as="p" className="!font-normal">
                      Features
                    </Text>
                    <Text as="p" className="!font-normal">
                      Collections
                    </Text>
                  </div>
                </div>
                <div className="flex flex-col items-start justify-center w-[27%] md:w-full gap-[29px]">
                  <Heading
                    size="xs"
                    as="h4"
                    className="mt-0.5 !text-white-A700"
                  >
                    Company
                  </Heading>
                  <div className="flex flex-col items-start justify-start">
                    <Text as="p" className="!font-normal">
                      About
                    </Text>
                    <Text as="p" className="mt-3 !font-normal">
                      Blog
                    </Text>
                    <a href="#" className="mt-[7px]">
                      <Text as="p" className="!font-normal">
                        Careers
                      </Text>
                    </a>
                    <Text as="p" className="mt-[9px] !font-normal">
                      Services
                    </Text>
                    <a href="#" className="mt-3">
                      <Text as="p" className="!font-normal">
                        Privacy Policy
                      </Text>
                    </a>
                    <a href="#" className="mt-[7px]">
                      <Text as="p" className="!font-normal">
                        Terms of service
                      </Text>
                    </a>
                  </div>
                </div>
                <div className="flex flex-col items-start justify-start w-[41%] md:w-full gap-[30px]">
                  <Heading size="xs" as="h4" className="!text-white-A700">
                    Join our Newsletter
                  </Heading>
                  <Text as="p" className="!font-normal">
                    Drop your email below to get update, promotions, coupons,
                    and more!
                  </Text>
                  <Input
                    color="gray_800"
                    variant="fill"
                    shape="square"
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    suffix={
                      <div className="flex justify-center items-center w-[60px] h-[60px] bg-white-A700">
                        <Img src="images/img_arrow_gray_800.svg" alt="Arrow" />
                      </div>
                    }
                    className="w-full sm:w-full tracking-[0.36px] border-white-A700 border"
                  />
                </div>
              </div>
            </div>
            <Text size="xs" as="p" className="!text-blue_gray-100">
              Copyright © 2021 Elliye. All Right Reseved
            </Text>
          </div>
        </footer>
      </div>
    </>
  );
}
