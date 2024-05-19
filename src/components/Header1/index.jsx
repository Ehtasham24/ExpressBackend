import React from "react";
import { Button, Img, Heading } from "./..";

export default function Header1({ ...props }) {
  return (
    <header {...props}>
      <div className="flex flex-row sm:flex-col justify-end items-center w-full gap-[541px] p-6 md:gap-10 sm:p-5 bg-white-A700">
        <div className="flex flex-row justify-start items-start w-[6%] sm:w-full gap-2">
          <Img
            src="images/img_group_19.svg"
            alt="image"
            className="h-[24px] mt-1"
          />
          <Heading size="xs" as="h4">
            Logic Hash Solutions
          </Heading>
        </div>
        <div className="flex flex-row justify-between items-center w-[12%] sm:w-full mr-[120px] md:mr-5">
          <div className="flex flex-row justify-between w-auto gap-8">
            <Img
              src="images/img_cart.svg"
              alt="cart_one"
              className="h-[24px] w-[24px]"
            />
            <Img
              src="images/img_email_gray_800.svg"
              alt="email_one"
              className="h-[24px] w-[24px]"
            />
          </div>
          <Button shape="square" className="sm:px-5 font-medium min-w-[107px]">
            Login
          </Button>
        </div>
      </div>
      <div className="h-px w-full mx-auto bg-gray-50 max-w-[1632px]" />
    </header>
  );
}
