import { FC } from "react";

import KeyboardButton from "../keyboard-button/KeyboardButton";
import "./styles.css";

interface KeyboardProps {
  handleOnClick: (value: string) => void;
  handleOnInvalidWord: () => void;
  checkIsWordValid: (isValid: boolean) => void;
}

const Keyboard: FC<KeyboardProps> = ({
  handleOnClick,
  handleOnInvalidWord,
  checkIsWordValid,
}) => {
  return (
    <>
      <div className="row1">
        <KeyboardButton
          text="Q"
          handleOnClick={handleOnClick}
          handleOnInvalidWord={handleOnInvalidWord} checkIsWordValid = {checkIsWordValid}
        />
        <KeyboardButton
          text="W"
          handleOnClick={handleOnClick}
          handleOnInvalidWord={handleOnInvalidWord} checkIsWordValid = {checkIsWordValid}
        />
        <KeyboardButton
          text="E"
          handleOnClick={handleOnClick}
          handleOnInvalidWord={handleOnInvalidWord} checkIsWordValid = {checkIsWordValid}
        />
        <KeyboardButton
          text="R"
          handleOnClick={handleOnClick}
          handleOnInvalidWord={handleOnInvalidWord} checkIsWordValid = {checkIsWordValid}
        />
        <KeyboardButton
          text="T"
          handleOnClick={handleOnClick}
          handleOnInvalidWord={handleOnInvalidWord} checkIsWordValid = {checkIsWordValid}
        />
        <KeyboardButton
          text="Y"
          handleOnClick={handleOnClick}
          handleOnInvalidWord={handleOnInvalidWord} checkIsWordValid = {checkIsWordValid}
        />
        <KeyboardButton
          text="U"
          handleOnClick={handleOnClick}
          handleOnInvalidWord={handleOnInvalidWord} checkIsWordValid = {checkIsWordValid}
        />
        <KeyboardButton
          text="I"
          handleOnClick={handleOnClick}
          handleOnInvalidWord={handleOnInvalidWord} checkIsWordValid = {checkIsWordValid}
        />
        <KeyboardButton
          text="O"
          handleOnClick={handleOnClick}
          handleOnInvalidWord={handleOnInvalidWord} checkIsWordValid = {checkIsWordValid}
        />
        <KeyboardButton
          text="P"
          handleOnClick={handleOnClick}
          handleOnInvalidWord={handleOnInvalidWord} checkIsWordValid = {checkIsWordValid}
        />
      </div>
      <div className="row2">
        <KeyboardButton
          text="A"
          handleOnClick={handleOnClick}
          handleOnInvalidWord={handleOnInvalidWord} checkIsWordValid = {checkIsWordValid}
        />
        <KeyboardButton
          text="S"
          handleOnClick={handleOnClick}
          handleOnInvalidWord={handleOnInvalidWord} checkIsWordValid = {checkIsWordValid}
        />
        <KeyboardButton
          text="D"
          handleOnClick={handleOnClick}
          handleOnInvalidWord={handleOnInvalidWord} checkIsWordValid = {checkIsWordValid}
        />
        <KeyboardButton
          text="F"
          handleOnClick={handleOnClick}
          handleOnInvalidWord={handleOnInvalidWord} checkIsWordValid = {checkIsWordValid}
        />
        <KeyboardButton
          text="G"
          handleOnClick={handleOnClick}
          handleOnInvalidWord={handleOnInvalidWord} checkIsWordValid = {checkIsWordValid}
        />
        <KeyboardButton
          text="H"
          handleOnClick={handleOnClick}
          handleOnInvalidWord={handleOnInvalidWord} checkIsWordValid = {checkIsWordValid}
        />
        <KeyboardButton
          text="J"
          handleOnClick={handleOnClick}
          handleOnInvalidWord={handleOnInvalidWord} checkIsWordValid = {checkIsWordValid}
        />
        <KeyboardButton
          text="K"
          handleOnClick={handleOnClick}
          handleOnInvalidWord={handleOnInvalidWord} checkIsWordValid = {checkIsWordValid}
        />
        <KeyboardButton
          text="L"
          handleOnClick={handleOnClick}
          handleOnInvalidWord={handleOnInvalidWord} checkIsWordValid = {checkIsWordValid}
        />
      </div>
      <div className="row3">
        <KeyboardButton
          text="ENTER"
          handleOnClick={handleOnClick}
          handleOnInvalidWord={handleOnInvalidWord} checkIsWordValid = {checkIsWordValid}
        />
        <KeyboardButton
          text="Z"
          handleOnClick={handleOnClick}
          handleOnInvalidWord={handleOnInvalidWord} checkIsWordValid = {checkIsWordValid}
        />
        <KeyboardButton
          text="X"
          handleOnClick={handleOnClick}
          handleOnInvalidWord={handleOnInvalidWord} checkIsWordValid = {checkIsWordValid}
        />
        <KeyboardButton
          text="C"
          handleOnClick={handleOnClick}
          handleOnInvalidWord={handleOnInvalidWord} checkIsWordValid = {checkIsWordValid}
        />
        <KeyboardButton
          text="V"
          handleOnClick={handleOnClick}
          handleOnInvalidWord={handleOnInvalidWord} checkIsWordValid = {checkIsWordValid}
        />
        <KeyboardButton
          text="B"
          handleOnClick={handleOnClick}
          handleOnInvalidWord={handleOnInvalidWord} checkIsWordValid = {checkIsWordValid}
        />
        <KeyboardButton
          text="N"
          handleOnClick={handleOnClick}
          handleOnInvalidWord={handleOnInvalidWord} checkIsWordValid = {checkIsWordValid}
        />
        <KeyboardButton
          text="M"
          handleOnClick={handleOnClick}
          handleOnInvalidWord={handleOnInvalidWord} checkIsWordValid = {checkIsWordValid}
        />
        <KeyboardButton
          text="DELETE"
          handleOnClick={handleOnClick}
          handleOnInvalidWord={handleOnInvalidWord} checkIsWordValid = {checkIsWordValid}
        />
      </div>
    </>
  );
};
export default Keyboard;
