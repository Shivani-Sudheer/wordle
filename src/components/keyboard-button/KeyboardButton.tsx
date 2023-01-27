import { Button } from "@mui/material";
import _ from "lodash";
import { FC, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useRecoilMap } from "react-structured-state";

import {
  currentRowAtom,
  currentWordAtom,
  gameWonOrLostAtom,
  isLetterKeysDisabledAtom,
  isEnterAtom,
  keyColorAtom,
  cellColorsAtom,
} from "../../states/atoms";
import { fetchWordSelector, checkValidSelector } from "../../states/selectors";
import "./styles.css";
import {
  CORRECT_LETTER_COLOR,
  DEFAULT_COLOR,
  PARTIALLY_CORRECT_COLOR,
  WRONG_LETTER_COLOR,
} from "./constants";
import axios from "axios";
interface KeyboardButtonProps {
  text: string;
  handleOnClick: (value: string) => void;
  handleOnInvalidWord: () => void;
  checkIsWordValid: (isValid: boolean) => void;
}

const KeyboardButton: FC<KeyboardButtonProps> = ({
  text,
  handleOnClick,
  handleOnInvalidWord,
  checkIsWordValid,
}) => {
  const [isWordValid, setWordValid] = useState<boolean>(false);

  const [isLetterKeysDisabled, setIsLetterKeysDisabled] = useRecoilState(
    isLetterKeysDisabledAtom
  );
  const [isEnter, setEnter] = useRecoilState(isEnterAtom);
  const [currentWord, setCurrentWord] = useRecoilState(currentWordAtom);
  const [gameWonOrLost, setGameWonOrLost] = useRecoilState(gameWonOrLostAtom);
  const [cellColors, setCellColors] = useRecoilState(cellColorsAtom);

  const currentRow = useRecoilValue(currentRowAtom);
  const word = useRecoilValue(fetchWordSelector);

  const [keyColor, setKeyColor] = useRecoilMap(keyColorAtom);

  const actual_letters = word.word.split("");
  let user_letters = currentWord.split("");

  let cell_colors = _.cloneDeep(cellColors);

  useEffect(() => {
    if (currentWord.length === 5) {
      axios
        .post(`http://localhost:4000/validWords/isValid`, {
          word: currentWord.toLowerCase(),
        })
        .then((response) => {
          setWordValid(response.data);
          checkIsWordValid(response.data)
        });
    }
  }, [currentWord]);

  useEffect(() => {
    if (!isLetterKeysDisabled) {
      if (isEnter) {
        if (currentWord === word.word) {
          setGameWonOrLost(1);
          setIsLetterKeysDisabled(true);
          for (let i = 0; i < 5; i++)
            cell_colors[currentRow - 1][i] = CORRECT_LETTER_COLOR;
          actual_letters.forEach((letter: string) => {
            setKeyColor.set(letter, CORRECT_LETTER_COLOR);
          });
          setCellColors(cell_colors);
        } else {
          if (isWordValid) {
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
                    if (
                      cell_colors[currentRow - 1][uIndex] !==
                      CORRECT_LETTER_COLOR
                    ) {
                      if (user_letters[aIndex] === aItem) {
                        //if the right position of the user's word holds the actual letter
                        if (
                          cell_colors[currentRow - 1][uIndex] !==
                            CORRECT_LETTER_COLOR &&
                          cell_colors[currentRow - 1][uIndex] !==
                            PARTIALLY_CORRECT_COLOR
                        ) {
                          cell_colors[currentRow - 1][uIndex] =
                            WRONG_LETTER_COLOR;
                          if (!actual_letters.includes(uItem)) {
                            setKeyColor.set(uItem, WRONG_LETTER_COLOR);
                          }
                        }
                      } else {
                        if (uItem !== actual_letters[uIndex]) {
                          if (
                            cell_colors[currentRow - 1][uIndex] !==
                            PARTIALLY_CORRECT_COLOR
                          ) {
                            cell_colors[currentRow - 1][uIndex] =
                              PARTIALLY_CORRECT_COLOR;
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
                  cell_colors[currentRow - 1][uIndex] !==
                    CORRECT_LETTER_COLOR &&
                  cell_colors[currentRow - 1][uIndex] !==
                    PARTIALLY_CORRECT_COLOR
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
          }
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

  var input = document.getElementById(`keyboard-letters-${text}`); //to prevent enter key from triggering the letter keys
  if (input !== null)
    input.addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
      }
    });

  return (
    <>
      <Button
        type="button"
        className="keyboard-button"
        id={`keyboard-letters-${text}`}
        onClick={() => {
          !isWordValid && text === "ENTER"
            ? handleOnInvalidWord()
            : handleOnClick(text);
        }}
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
