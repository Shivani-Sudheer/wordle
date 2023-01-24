import { Button } from "@mui/material";
import _ from "lodash";
import { FC, useEffect } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { useRecoilMap } from "react-structured-state";

import {
  clickEventAtom,
  currentColumnAtom,
  currentLetterAtom,
  currentRowAtom,
  currentWordAtom,
  gameWonOrLostAtom,
  isDeleteAtom,
  isLetterKeysDisabledAtom,
  isEnterAtom,
  keyColorAtom,
  cellColorsAtom,
} from "../../states/atoms";
import { fetchWordSelector } from "../../states/selectors";
import "./styles.css";
import { CORRECT_LETTER_COLOR, DEFAULT_COLOR, PARTIALLY_CORRECT_COLOR, WRONG_LETTER_COLOR } from "./constants";
interface KeyboardButtonProps {
  text: string;
}

const KeyboardButton: FC<KeyboardButtonProps> = ({ text }) => {
  const [isLetterKeysDisabled, setIsLetterKeysDisabled] = useRecoilState(
    isLetterKeysDisabledAtom
  );
  const [isEnter, setEnter] = useRecoilState(isEnterAtom);
  const [currentWord, setCurrentWord] = useRecoilState(currentWordAtom);
  const [gameWonOrLost, setGameWonOrLost] = useRecoilState(gameWonOrLostAtom);
  const [cellColors, setCellColors] = useRecoilState(cellColorsAtom);
  const [currentColumn, setCurrentColumn] = useRecoilState(currentColumnAtom);
  const [currentRow, setCurrentRow] = useRecoilState(currentRowAtom);
  const [isClick, setClick] = useRecoilState(clickEventAtom);

  const word = useRecoilValue(fetchWordSelector);

  const setCurrentLetter = useSetRecoilState(currentLetterAtom);
  const setDelete = useSetRecoilState(isDeleteAtom);

  const [keyColor, setKeyColor] = useRecoilMap(keyColorAtom);

  const actual_letters = word.word.split("");
  let user_letters = currentWord.split("");

  let cell_colors = _.cloneDeep(cellColors);

  useEffect(() => {
    if (!isLetterKeysDisabled) {
      if (isEnter) {
        if (currentWord === word.word) {
          setGameWonOrLost(1);
          setIsLetterKeysDisabled(true);
          for (let i = 0; i < 5; i++)
            cell_colors[currentRow - 1][i] = CORRECT_LETTER_COLOR;
          actual_letters.forEach((letter:string)=>{
            setKeyColor.set(letter, CORRECT_LETTER_COLOR);
          })
          setCellColors(cell_colors);
        } else {
          user_letters.forEach((uItem: string, uIndex: number) => {
            let flag = 0;
            actual_letters.forEach((aItem: string, aIndex: number) => {
              if (aItem === uItem) {
                //if a letter in the user's word also belongs to the actual word
                if (uIndex === aIndex) {
                  //if the letter in the user's word is at the right position
                  cell_colors[currentRow - 1][uIndex] = CORRECT_LETTER_COLOR; //CORRECT_LETTER_COLOR
                  actual_letters[aIndex] = "*";
                  setKeyColor.set(uItem, CORRECT_LETTER_COLOR);
                } else {
                  if (cell_colors[currentRow - 1][uIndex] !== CORRECT_LETTER_COLOR) {
                    if (user_letters[aIndex] === aItem) {
                      //if the right position of the user's word holds the actual letter
                      if (
                        cell_colors[currentRow - 1][uIndex] !== CORRECT_LETTER_COLOR &&
                        cell_colors[currentRow - 1][uIndex] !== PARTIALLY_CORRECT_COLOR
                      ) {
                        cell_colors[currentRow - 1][uIndex] = WRONG_LETTER_COLOR;
                        if (!actual_letters.includes(uItem)) {
                          setKeyColor.set(uItem, WRONG_LETTER_COLOR);
                        }
                      }
                    } else {
                      if (uItem !== actual_letters[uIndex]) {
                        if (cell_colors[currentRow - 1][uIndex] !== PARTIALLY_CORRECT_COLOR) {
                          cell_colors[currentRow - 1][uIndex] = PARTIALLY_CORRECT_COLOR;
                          if (keyColor.get(uItem) !== CORRECT_LETTER_COLOR) {
                            setKeyColor.set(uItem, PARTIALLY_CORRECT_COLOR);
                          }
                          actual_letters[aIndex] = "*";
                        }
                      }
                    }
                  }
                }
                flag = 1;
              }
            });

            if (flag === 0) {
              //if a letter in the user's word does not belong to the actual word
              if (
                cell_colors[currentRow - 1][uIndex] !== CORRECT_LETTER_COLOR &&
                cell_colors[currentRow - 1][uIndex] !== PARTIALLY_CORRECT_COLOR
              ) {
                cell_colors[currentRow - 1][uIndex] = WRONG_LETTER_COLOR;
                if (
                  keyColor.get(uItem) !== CORRECT_LETTER_COLOR &&
                  keyColor.get(uItem) !== PARTIALLY_CORRECT_COLOR
                ) {
                  setKeyColor.set(uItem, WRONG_LETTER_COLOR);
                }
              }
            }
          });

          setCurrentWord("");
          setCellColors(cell_colors);

          if (currentRow === 6) {
            if (currentWord !== word.word) {
              setGameWonOrLost(2);
            }
          }
        }
      }
      setEnter(false);
    } // eslint-disable-next-line
  }, [isLetterKeysDisabled]);

  const handleOnClick = () => {
    if (gameWonOrLost === 0) {
      setClick(isClick + 1);
      if (text === "ENTER") {
        setIsLetterKeysDisabled(false);
        setCurrentLetter("*");
        setCurrentColumn(0);
        setCurrentRow(currentRow + 1);
        setEnter(true);
      } else if (text === "DELETE") {
        setIsLetterKeysDisabled(false);
        setCurrentLetter("");
        setDelete(true);
        setCurrentWord(currentWord.slice(0, currentColumn - 1));
      } else {
        setCurrentColumn(currentColumn + 1);
        setCurrentLetter(text);
        setEnter(false);
        setDelete(false);
      }
    }
  };

  return (
    <>
      <Button
        type="button"
        className="keyboard-button"
        onClick={handleOnClick}
        disabled={
          gameWonOrLost !== 0
            ? true
            : text === "ENTER"
            ? !isLetterKeysDisabled
            : text === "DELETE"
            ? false
            : isLetterKeysDisabled
        }
        sx={{
          backgroundColor:
            text === "ENTER" || text === "DELETE"
              ? DEFAULT_COLOR
              : (keyColor.get(text) as unknown as string),
        }}
      >
        {text}
      </Button>
    </>
  );
};
export default KeyboardButton;
