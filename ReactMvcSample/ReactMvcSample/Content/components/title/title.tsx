import React from "react";

export interface TitleProps {
  text: string;
}

import "./title.css";

const Title = ({ text }: TitleProps) => {
  return <h1 className="title">{text}</h1>;
};

export default Title;
