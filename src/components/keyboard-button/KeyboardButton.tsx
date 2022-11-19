import { Button } from "@mui/material";
import { FC, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import {
  clickEventAtom,
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
  keyColorATom,
  newLettersAtom,
} from "../../states/atoms";
import { fetchWordSelector } from "../../states/selectors";
import { keyboard_colors } from "./constants";
import "./styles.css";

interface KeyboardButtonProps {
  text: string;
  disableEnter?: boolean;
}

const KeyboardButton: FC<KeyboardButtonProps> = ({
  text,
  disableEnter,
}) => {
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
  const [isClick, setClick] = useRecoilState(clickEventAtom);
  const [keyColor, setKeyColor] = useRecoilState(keyColorATom);

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
                new_letters[currentRow - 1][uIndex] = "#6aaa64"; //green
                actual_letters[i] = "*";
                keyboard_colors.set(uItem as unknown as string,"#6aaa64")
              } else {
                if (new_letters[currentRow - 1][uIndex] !== "#6aaa64") {
                  if (user_letters[i] === item) {
                    if (new_letters[currentRow - 1][uIndex] !== "#6aaa64") {
                      if (new_letters[currentRow - 1][uIndex] !== "#c9b458") {
                        new_letters[currentRow - 1][uIndex] = "grey";
                        if (actual_letters.includes(uItem)) {
                        } else {
                          keyboard_colors.set(uItem as unknown as string,"grey")
                          setKeyColor(keyboard_colors);
                        }
                      }
                    }
                  } else {
                    if (uItem !== actual_letters[uIndex]) {
                      if (new_letters[currentRow - 1][uIndex] !== "#c9b458") {
                        new_letters[currentRow - 1][uIndex] = "#c9b458";
                        if (keyboard_colors.get(uItem)!=="#6aaa64") {
                          keyboard_colors.set(uItem as unknown as string,"#c9b458")
                          setKeyColor(keyboard_colors);
                        }
                        actual_letters[i] = "*";
                      }
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
                if (keyboard_colors.get(uItem)!=="#6aaa64") {
                  keyboard_colors.set(uItem as unknown as string,"grey")
                  setKeyColor(keyboard_colors);
                }
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
    setClick(isClick + 1);
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
        } else {
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
  if(open===true){
    disabled=true;
  }
 
   let keycolor="";
   if(text==="ENTER"||text==="DELETE")
   {
    keycolor="#d3d6da";
   }
   else{
    keycolor=keyColor.get(text) as unknown as string;
   }

  return (
    <>
      <Button
        type="button"
        className="keyboard-button"
        onClick={handleOnClick}
        disabled={disabled}
        sx={{backgroundColor:keycolor}}
      >
        {text}
      </Button>
    </>
  );
};
export default KeyboardButton;
