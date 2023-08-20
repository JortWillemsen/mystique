import React from "react";
import "./heading.css";

interface HeadingProps {
  type: Number;
  children: string
}

const Heading = ({ type, children }: HeadingProps) => {

  switch(type) {
    case 1: return(<h1>{children}</h1>); break;
    case 2: return(<h2>{children}</h2>); break;
    case 3: return(<h3>{children}</h3>); break;
  }
};

export default Heading;
