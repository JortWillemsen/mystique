import React from "react";

export interface ButtonProps {
  text: string;
}

import "./button.css";

const Button = ({ text }: ButtonProps) => {
  return <button id="button" className="background"><p className="text">Dit is Kanji:</p><ruby className="ruby">
    漢 <rp>(</rp><rt>kan</rt><rp>)</rp>
    字 <rp>(</rp><rt>ji</rt><rp>)</rp>
  </ruby></button>;
};

export default Button;
