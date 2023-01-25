import { Snackbar } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import { keyboard_colors } from "../../components/keyboard-button/constants";
import Keyboard from "../../components/keyboard/Keyboard";
import NavBar from "../../components/navbar/navbar";
import Row from "../../components/row/Row";
import {
  clickEventAtom,
  currentColumnAtom,
  currentLetterAtom,
  currentRowAtom,
  currentWordAtom,
  gameWonOrLostAtom,
  isDeleteAtom,
  isEnterAtom,
  isLetterKeysDisabledAtom,
} from "../../states/atoms";
import "./styles.css";

const GamePage: FC = () => {
  const [open, setOpen] = useState<boolean>(false);

  const [currentWord, setCurrentWord] = useRecoilState(currentWordAtom);
  const [currentColumn, setCurrentColumn] = useRecoilState(currentColumnAtom);
  const [currentRow, setCurrentRow] = useRecoilState(currentRowAtom);
  const [isClick, setClick] = useRecoilState(clickEventAtom);

  const gameWonOrLost = useRecoilValue(gameWonOrLostAtom);

  const setIsLetterKeysDisabled = useSetRecoilState(
    isLetterKeysDisabledAtom
  );
  const setEnter = useSetRecoilState(isEnterAtom);
  const setCurrentLetter = useSetRecoilState(currentLetterAtom);
  const setDelete = useSetRecoilState(isDeleteAtom);

  useEffect(() => {
    if (gameWonOrLost === 1 || gameWonOrLost === 2) setOpen(true);
  }, [gameWonOrLost]);

  const handleClose = () => {
    setOpen(false);
  };

  document.onkeydown = function (event) {
    if (event.key !== "") {
      let current_key=event.key.toUpperCase();
      if (
        keyboard_colors.has(current_key) ||
        event.key.toUpperCase() === "DELETE"
      )
        handleOnClickOrPress(current_key);
      else if (current_key === "ENTER" && currentWord.length === 5)
        handleOnClickOrPress(current_key);
    }
  };

  const handleOnClickOrPress = (value: string) => {
    if (gameWonOrLost === 0) {
      setClick(isClick + 1);
      if (value === "ENTER") {
        setIsLetterKeysDisabled(false);
        setCurrentLetter("*");
        setCurrentColumn(0);
        setCurrentRow(currentRow + 1);
        setEnter(true);
      } else if (value === "DELETE") {
        setIsLetterKeysDisabled(false);
        setCurrentLetter("");
        setDelete(true);
        setCurrentWord(currentWord.slice(0, currentColumn - 1));
      } else {
        setCurrentColumn(currentColumn + 1);
        setCurrentLetter(value);
        setEnter(false);
        setDelete(false);
      }
    }
  };

  return (
    <>
      <NavBar />
      <div className="game-space">
        <div className="input-space">
          <div className="row-1">
            <Row thisRow={0} />
          </div>
          <div className="row-2">
            <Row thisRow={1} />
          </div>
          <div className="row-3">
            <Row thisRow={2} />
          </div>
          <div className="row-4">
            <Row thisRow={3} />
          </div>
          <div className="row-5">
            <Row thisRow={4} />
          </div>
          <div className="row-6">
            <Row thisRow={5} />
          </div>
        </div>
        <div className="keyboard">
          <Keyboard handleOnClick={handleOnClickOrPress} />
        </div>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={open}
          message={
            gameWonOrLost === 1 ? "Yayyyy! You Won" : "Better luck next time :("
          }
          onClose={handleClose}
        />
      </div>
    </>
  );
};
export default GamePage;
