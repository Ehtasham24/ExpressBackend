import React from "react";
import { Helmet } from "react-helmet";
import { Button, Heading, Text, Input, Img } from "../../components";
import Footer from "../../components/Footer";
import Header1 from "../../components/Header1";
import { ReactTable } from "../../components/ReactTable";
import { createColumnHelper } from "@tanstack/react-table";

const tableData = [
  { product: "Gray T-shirt", quantity: "1", price: "$100.99", total: "$100.99" },
  { product: "Red Flannel", quantity: "1", price: "$100.99", total: "$100.99" },
];

export default function CartPage() {
  const tableColumns = React.useMemo(() => {
    const tableColumnHelper = createColumnHelper();
    return [
      tableColumnHelper.accessor("product", {
        cell: (info) => (
          <div className="flex flex-row sm:flex-col justify-start items-center gap-[66px] sm:gap-10">
            <div className="flex flex-col items-center justify-start h-[200px] w-[200px] p-[9px] border-blue_gray-100 border border-solid">
              <Img
                src="images/img_placeholder_2.png"
                alt="placeholder_one"
                className="w-[180px] md:h-auto object-cover"
              />
            </div>
            <Text size="md" as="p" className="!text-gray-800">
              {info?.getValue?.()}
            </Text>
          </div>
        ),
        header: (info) => (
          <Text as="p" className="pb-[35px] sm:pb-5">
            Product
          </Text>
        ),
        meta: { width: "661px" },
      }),
      tableColumnHelper.accessor("quantity", {
        cell: (info) => (
          <div className="flex flex-row justify-start">
            <div className="flex flex-col items-center justify-start w-[56%]">
              <Button
                color="blue_gray_100"
                shape="square"
                className="w-full sm:px-5 !text-gray-800 font-medium z-[1] border-blue_gray-100 border border-solid"
              >
                {info?.getValue?.()}
              </Button>
              <div className="flex flex-row justify-between w-full mt-[-48px]">
                <div className="flex flex-col items-center justify-center h-[48px] w-[48px] p-[19px] bg-gray-50">
                  <div className="h-[2px] w-[90%] my-[3px] bg-gray-500" />
                </div>
                <Button size="sm" shape="square" className="w-[48px]">
                  <Img src="images/img_increase.svg" />
                </Button>
              </div>
            </div>
          </div>
        ),
        header: (info) => (
          <Text as="p" className="pt-[5px] pb-[31px] sm:pb-5">
            Quantity
          </Text>
        ),
        meta: { width: "310px" },
      }),
      tableColumnHelper.accessor("price", {
        cell: (info) => (
          <Text size="md" as="p" className="!text-gray-800">
            {info?.getValue?.()}
          </Text>
        ),
        header: (info) => (
          <Text as="p" className="pt-[3px] pb-[33px] sm:pb-5">
            Price
          </Text>
        ),
        meta: { width: "277px" },
      }),
      tableColumnHelper.accessor("total", {
        cell: (info) => (
          <div className="flex flex-row justify-between items-center">
            <Text size="md" as="p" className="mt-28 mb-[114px] !text-gray-800">
              {info?.getValue?.()}
            </Text>
            <Img src="images/img_.svg" alt="image_one" className="h-[33px] w-[33px]" />
          </div>
        ),
        header: (info) => (
          <Text as="p" className="pt-1 pb-[33px] sm:pb-5">
            Total
          </Text>
        ),
        meta: { width: "384px" },
      }),
    ];
  }, []);

  return (
    <>
      <Helmet>
        <title>POS system</title>
        <meta name="description" content="Web site created using create-react-app" />
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
              <ReactTable
                size="xs"
                bodyProps={{ className: "md:flex-col" }}
                headerProps={{ className: "md:flex-col md:gap-5" }}
                rowDataProps={{ className: "md:flex-col md:gap-5" }}
                className="w-[1632px]"
                columns={tableColumns}
                data={tableData}
              />
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
                  <Heading as="h2">$202.00</Heading>
                </div>
              </div>
            </div>
            <div className="flex flex-row sm:flex-col justify-between w-[26%] md:w-full sm:gap-10">
              <Button variant="outline" shape="square" className="font-medium min-w-[207px]">
                Continue Shopping
              </Button>
              <Button shape="square" className="sm:px-5 font-medium min-w-[171px]">
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
