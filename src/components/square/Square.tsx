import React, { FC, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import {
  clickEventAtom,
  currentColumnAtom,
  currentLetterAtom,
  currentWordAtom,
  isDeleteAtom,
  isLetterKeysDisabledAtom,
  isEnterAtom,
  cellColorsAtom,
  gameWonOrLostAtom,
} from "../../states/atoms";
import "./styles.css";

interface SquareProps {
  isCurrentRow?: boolean;
  column: number;
  thisRow: number;
}

const Square: FC<SquareProps> = ({ isCurrentRow, column, thisRow }) => {
  const currentLetter = useRecoilValue(currentLetterAtom);
  const isClick = useRecoilValue(clickEventAtom);
  const cellColors = useRecoilValue(cellColorsAtom);
  const isEnter = useRecoilValue(isEnterAtom);
  const gameWonOrLost = useRecoilValue(gameWonOrLostAtom);

  const [isLetterKeysDisabled, setIsLetterKeysDisabled] = useRecoilState(
    isLetterKeysDisabledAtom
  );
  const [currentColumn, setCurrentColumn] = useRecoilState(currentColumnAtom);
  const [currentWord, setCurrentWord] = useRecoilState(currentWordAtom);
  const [isDelete, setDelete] = useRecoilState(isDeleteAtom);

  const [squareValue, setSquareValue] = React.useState("");

  let color = cellColors[thisRow][column - 1];

  useEffect(() => {
    //delete functionality
    if (isCurrentRow && column === currentColumn && isDelete === true) {
      setCurrentColumn(currentColumn - 1);
      setSquareValue("");
      setDelete(false);
    } // eslint-disable-next-line
  }, [isDelete]);

  useEffect(() => {
    if (isCurrentRow && column === currentColumn && !isEnter && !isDelete) {
      //setting square value
      setCurrentWord(currentWord + currentLetter);
      setSquareValue(currentLetter);
    }
    if (currentColumn !== 5 && squareValue !== "") {
      //disabling enter key
      setIsLetterKeysDisabled(false);
    } // eslint-disable-next-line
  }, [isClick]);

  useEffect(() => {
    if (isLetterKeysDisabled) {
      //enabling enter key
      setIsLetterKeysDisabled(true);
    } // eslint-disable-next-line
  }, [isLetterKeysDisabled]);

  useEffect(() => {
    if (currentWord.length === 5) {
      //disabling letter keys
      setIsLetterKeysDisabled(true);
    } // eslint-disable-next-line
  }, [currentWord]);

  return (
    <input
      className="square"
      defaultValue={squareValue}
      style={{
        backgroundColor: color,
        borderColor:
          squareValue && color === "white"
            ? "2px solid var(--color-tone-3)"
            : "#d3d6da",
        color: squareValue && color === "white" ? "black" : "white",
        animation: color !== "white" ? "flip 0.5s ease forwards" : gameWonOrLost===3 && squareValue ? "shake 0.5s" : squareValue?"fill 0.1s": "none",
        animationDelay: color !== "white" ? `${0.2 * column}s` : "none",
        transition:
          color !== "white"
            ? `background-color ${0 * column}s linear,color ${
                0 * column
              }s linear, border-color ${0 * column}s linear`
            : "none",
      }}
    ></input>
  );
};
export default Square;
