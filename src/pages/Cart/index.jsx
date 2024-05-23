/* import React from "react";
import { Helmet } from "react-helmet";
import { Button, Heading, Text, Input } from "../../components";
import Footer from "../../components/Footer";
import Header1 from "../../components/Header1";

export default function CartPage() {
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
        <Header1 className="flex flex-col items-center justify-center w-full" />
        <div className="flex flex-col items-center justify-start w-full mt-[31px] md:px-5 max-w-[1632px]">
          <div className="flex flex-row justify-between w-[15%] md:w-full">
            <Text as="p">Home</Text>
            <Text as="p" className="!text-blue_gray-100">
              &gt;
            </Text>
            <Text as="p" className="!text-gray-800">
              Shopping Cart
            </Text>
          </div>
          <Heading as="h1" className="mt-[42px]">
            Shopping Cart
          </Heading>
          <div className="flex flex-row md:flex-col justify-between w-[99%] md:w-full mt-24 md:gap-10">
            <div className="flex flex-row md:flex-col justify-start items-center w-[42%] md:w-full gap-[21px] md:gap-5">
              <div className="flex flex-row justify-start items-center w-[39%] md:w-full gap-6">
                <Text
                  size="md"
                  as="p"
                  className="flex justify-center items-center h-[56px] !text-gray-800 border-gray-800 border-2 border-solid text-center rounded-[50%]"
                >
                  1
                </Text>
                <Text size="md" as="p" className="!text-gray-800">
                  Shopping Cart
                </Text>
              </div>
              <div className="h-[2px] w-[59%] bg-gray-800" />
            </div>
            <div className="flex flex-row md:flex-col justify-start w-[56%] md:w-full gap-8 md:gap-5">
              <div className="flex flex-row sm:flex-col justify-between items-center w-[72%] md:w-full sm:gap-10">
                <div className="flex flex-row justify-start items-center gap-6">
                  <Text
                    size="md"
                    as="p"
                    className="flex justify-center items-center h-[56px] !text-blue_gray-100 border-blue_gray-100 border-2 border-solid text-center rounded-[50%]"
                  >
                    2
                  </Text>
                  <Text size="md" as="p" className="!text-blue_gray-100">
                    Checkout
                  </Text>
                </div>
                <div className="h-[2px] w-[61%] bg-blue_gray-100" />
              </div>
              <div className="flex flex-row justify-start items-center w-[25%] md:w-full gap-6">
                <Text
                  size="md"
                  as="p"
                  className="flex justify-center items-center h-[56px] !text-blue_gray-100 border-blue_gray-100 border-2 border-solid text-center rounded-[50%]"
                >
                  3
                </Text>
                <Text size="md" as="p" className="!text-blue_gray-100">
                  Completed
                </Text>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end justify-start w-full mt-[79px] gap-[79px]">
            <div className="flex flex-col items-center justify-start w-full gap-[31px]">
              <div className="flex flex-row md:flex-col justify-between items-start w-full md:gap-10">
                <Input
                  shape="square"
                  name="apply_code"
                  placeholder="Enter coupon code"
                  className="w-[29%] md:w-full mt-px md:mt-0 tracking-[0.36px]"
                />
                <div className="flex flex-col items-end justify-start gap-4">
                  <Text as="p" className="mr-[3px]">
                    Total
                  </Text>
                  <Heading as="h2">PKR 202.00</Heading>
                </div>
              </div>
            </div>
            <div className="flex flex-row sm:flex-col justify-between w-[26%] md:w-full sm:gap-10">
              <Button
                variant="outline"
                shape="square"
                className="font-medium min-w-[207px]"
              >
                Continue Shopping
              </Button>
              <Button
                shape="square"
                className="sm:px-5 font-medium min-w-[171px]"
              >
                Checkout
              </Button>
            </div>
          </div>
        </div>
        <Footer className="flex justify-center items-center w-full mt-[100px] p-[30px] sm:p-5 bg-gray-800" />
      </div>
    </>
  );
}
 */
