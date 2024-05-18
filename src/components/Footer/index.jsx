import React from "react";
import { Text, Input, Img, Heading } from "./..";

export default function Footer({ ...props }) {
  return (
    <footer {...props}>
      <div className="flex flex-col items-center justify-center w-[88%] mt-[31px] gap-[97px] mx-[113px] md:mx-5">
        <div className="flex flex-row md:flex-col justify-between items-center w-full md:gap-10">
          <div className="flex flex-col items-start justify-start w-[26%] md:w-full gap-[31px]">
            <div className="flex flex-row justify-start items-start gap-2">
              <Img
                src="images/img_group_19_white_a700.svg"
                alt="image_three"
                className="h-[24px] mt-1"
              />
              <Heading size="xs" as="h4" className="!text-white-A700">
                POS system
              </Heading>
            </div>
            <div className="flex flex-row justify-start">
              <Text as="p" className="!font-normal leading-8">
                This is developed by LogicHash Solutions
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
                <Text as="p" className="mt-0.5 !text-white-A700 !font-normal">
                  logichashsolutions@gmail.com
                </Text>
              </div>
            </div>
          </div>
          <div className="flex flex-row md:flex-col justify-start items-start w-[58%] md:w-full gap-8 md:gap-5">
            <div className="flex flex-col items-start justify-start w-[27%] md:w-full gap-[33px]"></div>
            <div className="flex flex-col items-start justify-start w-[41%] md:w-full gap-[30px]">
              <Heading size="xs" as="h4" className="!text-white-A700">
                Join our Newsletter
              </Heading>
              <Text as="p" className="!font-normal">
                Drop your email below to get update, promotions, coupons, and
                more!
              </Text>
              <Input
                color="gray_800"
                variant="fill"
                shape="square"
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
          Logic Hash Solutions
        </Text>
      </div>
    </footer>
  );
}
