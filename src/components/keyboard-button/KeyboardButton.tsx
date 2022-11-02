import { Button } from "@mui/material";
import { FC, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import {
  currentColumnrAtom,
  currentLetterAtom,
  currentRowAtom,
  currentWordAtom,
  gameLostAtom,
  gameWonAtom,
  isDeleteAtom,
  isDisableAtom,
  isEnterAtom,
  isEnterOrDeleteAtom,
  newLettersAtom,
} from "../../states/atoms";
import { fetchWordSelector } from "../../states/selectors";
import "./styles.css";

interface KeyboardButtonProps {
  text: string;
  disableEnter?: boolean;
}

const KeyboardButton: FC<KeyboardButtonProps> = ({ text, disableEnter }) => {
  const [currentLetter, setCurrentLetter] = useRecoilState(currentLetterAtom);
  const [isDisable, setIsDisable] = useRecoilState(isDisableAtom);
  const [isEorD, setEorD] = useRecoilState(isEnterOrDeleteAtom);
  const [isEnter, setEnter] = useRecoilState(isEnterAtom);
  const [isDelete, setDelete] = useRecoilState(isDeleteAtom);
  const [currentWord, setCurrentWord] = useRecoilState(currentWordAtom);
  const [open, setOpen] = useRecoilState(gameWonAtom);
  const [newLetters, setNewLetters] = useRecoilState(newLettersAtom);
  const [currentColumn, setCurrentColumn] = useRecoilState(currentColumnrAtom);
  const [lost, setLost] = useRecoilState(gameLostAtom);
  const [currentRow, setCurrentRow] = useRecoilState(currentRowAtom);

  const word = useRecoilValue(fetchWordSelector);
  const actual_letters = word.word.split("");
  let user_letters = currentWord.split("");
  let new_letters = [
    ["white", "white", "white", "white", "white"],
    ["white", "white", "white", "white", "white"],
    ["white", "white", "white", "white", "white"],
    ["white", "white", "white", "white", "white"],
    ["white", "white", "white", "white", "white"],
    ["white", "white", "white", "white", "white"],
  ];

  useEffect(() => {
    console.log("current column", currentColumn);
    console.log("current word", currentWord);
    console.log("isDelete", isDelete);
    console.log("isEnter", isEnter);
  }, [currentWord]);
  useEffect(() => {
    console.log("current column", currentColumn);
    console.log("isDelete", isDelete);
    console.log("isEnter", isEnter);
  }, [currentColumn]);
  useEffect(() => {
    console.log("current row", currentRow);
    console.log("isDelete", isDelete);
    console.log("isEnter", isEnter);
  }, [currentRow]);
  useEffect(() => {
    console.log("current letter", currentLetter);
  }, [currentLetter]);
  useEffect(() => {
    console.log("letters disabled", isDisable);
    console.log("isDelete", isDelete);
    console.log("isEnter", isEnter);
  }, [isDisable]);
  useEffect(() => {
    console.log("enter/delete", isEorD);
    console.log("isDelete", isDelete);
    console.log("isEnter", isEnter);
  }, [isEorD]);
  useEffect(() => {
    console.log("isEnter", isEnter);
  }, [isEnter]);
  useEffect(() => {
    console.log("isDelete", isDelete);
  }, [isDelete]);

  useEffect(() => {
    if (isDisable === false) {
      if (isEnter === true) {
        if (currentRow > 1) {
          newLetters.map((item: any, index: number) => {
            if (index <= currentRow - 2) {
              new_letters[index] = item;
            }
          });
        }
        if (currentWord === word.word) {
          setOpen(true);
          setIsDisable(true);
        }
        user_letters.map((uItem: any, uIndex: number) => {
          let flag = 0;
          actual_letters.map((item: any, i: number) => {
            if (item === uItem) {
              if (uIndex === i) {
                new_letters[currentRow - 1][uIndex] = "#6aaa64";
                actual_letters[i] = "*";
              } else {
                if (new_letters[currentRow - 1][uIndex] !== "#6aaa64") {
                  if (user_letters[i] === item) {
                    if (new_letters[currentRow - 1][uIndex] !== "#6aaa64") {
                      if (new_letters[currentRow - 1][uIndex] !== "#c9b458") {
                        new_letters[currentRow - 1][uIndex] = "grey";
                      }
                    }
                  } else {
                    if (new_letters[currentRow - 1][uIndex] !== "#c9b458") {
                      new_letters[currentRow - 1][uIndex] = "#c9b458";
                      actual_letters[i] = "*";
                    }
                  }
                }
              }
              flag = 1;
            }
          });
          if (flag === 0) {
            if (new_letters[currentRow - 1][uIndex] !== "#6aaa64") {
              if (new_letters[currentRow - 1][uIndex] !== "#c9b458") {
                new_letters[currentRow - 1][uIndex] = "grey";
              }
            }
          }
        });
        setCurrentWord("");
        setNewLetters(new_letters);

        if (currentRow === 6) {
          if (currentWord !== word.word) {
            setLost(true);
          }
        }
      }
      setEnter(false);
    }
  }, [isDisable]);
  const handleOnClick = () => {
    if (text === "ENTER") {
      setIsDisable(false);
      setCurrentLetter("*");
      setCurrentColumn(1);
      setCurrentRow(currentRow + 1);
      setEorD(true);
      setEnter(true);
    } else if (text === "DELETE") {
      setIsDisable(false);
      setCurrentLetter("");
      if (currentColumn !== 5) {
        if (currentColumn === 1) {
          if (currentWord.length === 0) {
            
          } else {
            setCurrentColumn(currentColumn - 1);
            let arr = currentWord.slice(0, currentColumn - 2);
            setCurrentWord(arr);
          }
        }else{
        setCurrentColumn(currentColumn - 1);
        let arr = currentWord.slice(0, currentColumn - 2);
        setCurrentWord(arr);
        }
      } else {
        if (currentWord.length === 4) {
          setCurrentColumn(4);
          let arr = currentWord.slice(0, currentColumn - 2);
          setCurrentWord(arr);
        } else if (currentWord.length === 5) {
          setCurrentColumn(5);
          let arr = currentWord.slice(0, currentColumn - 1);
          setCurrentWord(arr);
        }
      }
      setEorD(true);
      setDelete(true);
    } else {
      setCurrentLetter(text);
      setEorD(false);
      setEnter(false);
      setDelete(false);
    }
  };

  let disabled = false;
  if (disableEnter === true) {
    if (text === "ENTER") {
      disabled = true;
    }
  } else {
    if (isDisable === true) {
      if (text === "ENTER") {
        disabled = false;
      } else if (text === "DELETE") {
        disabled = false;
      } else {
        disabled = true;
      }
    }
  }
  return (
    <>
      <Button
        type="button"
        className="keyboard-button"
        onClick={handleOnClick}
        disabled={disabled}
      >
        {text}
      </Button>
    </>
  );
};
export default KeyboardButton;
