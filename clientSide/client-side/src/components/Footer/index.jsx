import React from "react";
import { Text, Heading } from "./..";
import { FiPhone } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";

export default function Footer({ ...props }) {
  return (
    <footer {...props}>
      <div className="flex flex-col items-center justify-center w-[88%] mt-[31px] gap-[97px] mx-[113px] md:mx-5">
        <div className="flex flex-row md:flex-col justify-between items-center w-full md:gap-10">
          <div className="flex flex-col items-start justify-start w-[26%] md:w-full gap-[31px]">
            <div className="flex flex-row justify-start items-start gap-2">
              <Heading size="xs" as="h4" className="!text-white-A700">
                POS system
              </Heading>
            </div>
            <div className="flex flex-row justify-start">
              <Text as="p" className="!font-normal leading-8">
                This solution is brought to you by ScriptSavvy Tech.
              </Text>
            </div>
            <div className="flex flex-col items-center justify-start w-full gap-4">
              <div className="flex flex-row justify-start items-center w-full gap-2 py-0.5">
                <FiPhone
                  className="text-[1.35rem]"
                  style={{ color: "white" }}
                />
                <Text as="p" className="!text-white-A700 !font-normal">
                  +(92)3453084337
                </Text>
              </div>
              <div className="flex flex-row ju  stify-start items-center w-full gap-2">
                <MdOutlineEmail
                  className="text-[1.35rem]"
                  style={{ color: "white" }}
                />
                <Text as="p" className="mt-0.5 !text-white-A700 !font-normal">
                  ScriptSavvytech@gmail.com
                </Text>
              </div>
            </div>
          </div>
          <div className="flex flex-row md:flex-col justify-start items-start w-[58%] md:w-full gap-8 md:gap-5">
            <div className="flex flex-col items-start justify-start w-[27%] md:w-full gap-[33px]"></div>
            <div className="flex flex-col items-start justify-start w-[41%] md:w-full gap-[30px]">
              <Heading size="xs" as="h4" className="!text-white-A700">
                ScriptSavvy Tech
              </Heading>
              <Text as="p" className="!font-normal">
                If you are seeking tailored software solutions, custom web
                pages, mobile applications, or any other digital services, we
                invite you to reach out to us. Our team is committed to
                delivering personalized, high-quality services designed to meet
                your unique needs.
              </Text>
            </div>
          </div>
        </div>
        <Text size="xs" as="p" className="!text-blue_gray-100">
          ScriptSavvy Tech ©
        </Text>
      </div>
    </footer>
  );
}
