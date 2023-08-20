import React from "react";
import "./button.css";

const Button = () => {
  const [count, setCount] = React.useState<number>(0);
  const [text, setText] = React.useState<string>('Click me')
  React.useEffect(() => {
    setText(`You clicked me ${count} times`);
  }, [count]);

  const onButtonClick = () => {
    setCount(count + 1);
    console.log(count);
  };

  return (
    <button className="react_button" onClick={onButtonClick}>
      {text}
    </button>
  );
};

export default Button;
