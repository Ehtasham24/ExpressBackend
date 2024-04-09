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
  const navigate = useNavigate();

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
        <div className="flex flex-col items-center justify-start w-full mt-8 gap-14 md:px-5 max-w-[1636px]">
          <Heading as="h1">Categories</Heading>
          <div className="flex flex-row md:flex-col justify-start items-start w-full gap-8 md:gap-5">
            <div className="flex flex-col items-center justify-start w-[16%] md:w-full gap-8">
              <div className="flex flex-col items-start justify-start w-full gap-[29px]">
                <div className="flex flex-row justify-between items-center w-full">
                  <Text as="p" className="!text-gray-800">
                    Filter by Price
                  </Text>
                  <Img
                    src="images/img_arrow_down.svg"
                    alt="arrowdown_one"
                    className="h-[24px] w-[24px]"
                  />
                </div>
                <div className="flex flex-col items-start justify-start w-[68%] md:w-full gap-6">
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
                </div>
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
