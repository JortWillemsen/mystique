import React from "react";

export interface ButtonProps {
  text: string;
}

const Button = ({ text }: ButtonProps) => {
  const styles = {
    container: {
      width: 300,
      height: 150,
      backgroundColor: "#ff0000",
      color: "#ffffff",
    }
  }
  
  return <button style={styles.container}>{text}</button>;
};

export default Button;
