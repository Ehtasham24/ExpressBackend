import React from "react";
import { Link } from "react-router-dom"; // Ensure this import is correct
import { CloseSVG } from "../../assets/images";
import { Button, Img, Input, Heading } from "./..";

export default function Header({ ...props }) {
  const [searchBarValue, setSearchBarValue] = React.useState("");

  return (
    <header {...props}>
      <div className="flex flex-row justify-between gap-16 ">
        <div className="flex flex-row justify-start items-start ml-[120px] gap-2 md:ml-5">
          {/* to="/categorieswithsidebar" */}

          <img
            src="/images/img_group_19.svg"
            alt="image"
            className="h-[24px] mt-1"
          />
          <Heading size="xs" as="h4">
            POS system
          </Heading>
        </div>
      </div>
    </header>
  );
}
