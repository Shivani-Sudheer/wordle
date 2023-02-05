import { Snackbar } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import Confetti from "react-confetti";

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
import FinalModal from "../../components/modal/FinalModal";

const GamePage: FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [confetti, setConfetti] = useState<boolean>(false);
  const [isWordValid, setWordValid] = useState<boolean>(false);

  const [currentWord, setCurrentWord] = useRecoilState(currentWordAtom);
  const [currentColumn, setCurrentColumn] = useRecoilState(currentColumnAtom);
  const [currentRow, setCurrentRow] = useRecoilState(currentRowAtom);
  const [isClick, setClick] = useRecoilState(clickEventAtom);
  const [gameWonOrLost, setGameWonOrLost] = useRecoilState(gameWonOrLostAtom);

  const setIsLetterKeysDisabled = useSetRecoilState(isLetterKeysDisabledAtom);
  const setEnter = useSetRecoilState(isEnterAtom);
  const setCurrentLetter = useSetRecoilState(currentLetterAtom);
  const setDelete = useSetRecoilState(isDeleteAtom);

  document.onkeydown = function (event) {
    const current_key = event.key;
    if (current_key === "Control") event.stopPropagation();
    if (current_key !== "") {
      if (
        keyboard_colors.has(current_key.toUpperCase()) ||
        current_key === "Delete"
      )
        handleOnClickOrPress(current_key.toUpperCase());
      else if (current_key === "Enter" && currentWord.length === 5)
        isWordValid
          ? handleOnClickOrPress(current_key.toUpperCase())
          : handleOnInvalidWord();
    }
  };

  useEffect(() => {
    if (gameWonOrLost !== 0) {
      const confettiTmer = setTimeout(() => {
        if (gameWonOrLost === 1) setConfetti(true);
        else if (gameWonOrLost === 2) setOpen(true);
      }, 1600);
      const modalTimer = setTimeout(() => {
        if (gameWonOrLost === 1) setOpen(true);
      }, 6000);
      return () => {
        clearTimeout(confettiTmer);
        clearTimeout(modalTimer);
      };
    }
  }, [gameWonOrLost]);

  const handleClose = () => {
    setOpen(false);
    if (gameWonOrLost === 3) setGameWonOrLost(0);
  };

  const handleOnInvalidWord = () => {
    setGameWonOrLost(3);
  };

  const checkIsWordValid = (isValid: boolean) => {
    setWordValid(isValid);
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
        if (currentColumn !== 5) {
          setCurrentColumn(currentColumn + 1);
          setCurrentLetter(value);
          setEnter(false);
          setDelete(false);
        }
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
          <Keyboard
            handleOnClick={handleOnClickOrPress}
            handleOnInvalidWord={handleOnInvalidWord}
            checkIsWordValid={checkIsWordValid}
          />
        </div>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={Boolean(gameWonOrLost === 3)}
          message="Oops! Seems like that isn't a real word :("
          onClose={handleClose}
          autoHideDuration={2000}
        />
        <FinalModal open={open} />
        {confetti && <Confetti />}
      </div>
    </>
  );
};
export default GamePage;
