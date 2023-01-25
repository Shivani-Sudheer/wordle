import { FC } from "react";

import KeyboardButton from "../keyboard-button/KeyboardButton";
import "./styles.css";

interface KeyboardProps{
  handleOnClick: (value: string) => void;
}

const Keyboard: FC<KeyboardProps> = ({handleOnClick}) => {
  return (
    <>
      <div className="row1">
        <KeyboardButton text="Q" handleOnClick={handleOnClick} />
        <KeyboardButton text="W" handleOnClick={handleOnClick}/>
        <KeyboardButton text="E" handleOnClick={handleOnClick}/>
        <KeyboardButton text="R" handleOnClick={handleOnClick}/>
        <KeyboardButton text="T" handleOnClick={handleOnClick}/>
        <KeyboardButton text="Y" handleOnClick={handleOnClick}/>
        <KeyboardButton text="U" handleOnClick={handleOnClick}/>
        <KeyboardButton text="I" handleOnClick={handleOnClick}/>
        <KeyboardButton text="O" handleOnClick={handleOnClick}/>
        <KeyboardButton text="P" handleOnClick={handleOnClick}/>
      </div>
      <div className="row2">
        <KeyboardButton text="A" handleOnClick={handleOnClick}/>
        <KeyboardButton text="S" handleOnClick={handleOnClick}/>
        <KeyboardButton text="D" handleOnClick={handleOnClick}/>
        <KeyboardButton text="F" handleOnClick={handleOnClick}/>
        <KeyboardButton text="G" handleOnClick={handleOnClick}/>
        <KeyboardButton text="H" handleOnClick={handleOnClick}/>
        <KeyboardButton text="J" handleOnClick={handleOnClick}/>
        <KeyboardButton text="K" handleOnClick={handleOnClick}/>
        <KeyboardButton text="L" handleOnClick={handleOnClick}/>
      </div>
      <div className="row3">
        <KeyboardButton text="ENTER" handleOnClick={handleOnClick}/>
        <KeyboardButton text="Z" handleOnClick={handleOnClick}/>
        <KeyboardButton text="X" handleOnClick={handleOnClick}/>
        <KeyboardButton text="C" handleOnClick={handleOnClick}/>
        <KeyboardButton text="V" handleOnClick={handleOnClick}/>
        <KeyboardButton text="B" handleOnClick={handleOnClick}/>
        <KeyboardButton text="N" handleOnClick={handleOnClick}/>
        <KeyboardButton text="M" handleOnClick={handleOnClick}/>
        <KeyboardButton text="DELETE" handleOnClick={handleOnClick}/>
      </div>
    </>
  );
};
export default Keyboard;
