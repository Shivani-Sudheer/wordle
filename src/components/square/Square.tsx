import React, { FC, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import {
  currentColumnrAtom,
  currentLetterAtom,
  currentRowAtom,
  currentWordAtom,
  isDeleteAtom,
  isDisableAtom,
  isDisableEnterAtom,
  isEnterAtom,
  isEnterOrDeleteAtom,
  newLettersAtom,
} from "../../states/atoms";
import "./styles.css";

interface SquareProps {
  isValid?: string;
  column: number;
  thisRow: number;
}

const Square: FC<SquareProps> = ({ isValid, column, thisRow }) => {
  const [currentLetter, setCurrentLetter] = useRecoilState(currentLetterAtom);
  const [currentRow, setCurrentRow] = useRecoilState(currentRowAtom);
  const [isDisable, setIsDisable] = useRecoilState(isDisableAtom);
  const [currentColumn, setCurrentColumn] = useRecoilState(currentColumnrAtom);
  const [squareValue, setSquareValue] = React.useState("");
  const [currentWord, setCurrentWord] = useRecoilState(currentWordAtom);
  const [isEorD,setEorD]=useRecoilState(isEnterOrDeleteAtom);
  const [newLetters, setNewLetters] = useRecoilState(newLettersAtom);
  const [isEnter, setEnter] = useRecoilState(isEnterAtom);
  const [isDelete, setDelete] = useRecoilState(isDeleteAtom);
  const [isDisableEnter, setDisableEnter] = useRecoilState(isDisableEnterAtom);

  let color=newLetters[thisRow][column-1];
  let borderStyle="*";
  useEffect(() => {
    if (isValid === "yes") {
      if (column === currentColumn) {
        if (currentLetter !== "*") {
          setCurrentWord(currentWord + currentLetter);
          setSquareValue(currentLetter);
        }
      }
    }
    if (currentColumn === 5) {
      if (currentLetter !== "*") {
      setIsDisable(true);
      }
      if(squareValue!==""){
        if(currentWord.length===5)
        {
          setIsDisable(true);
        }
      }
    } 
    else 
    { 
      if(isEorD===false) 
      {
        setCurrentColumn(currentColumn + 1);
      }
      else{
        setEorD(false);
      }
    }
    if(currentColumn!==5){
      if(squareValue!==""){
        setDisableEnter(true);
      }
    }    
  }, [currentLetter]);

  useEffect(()=>{
    if(isDisable===true){
      setDisableEnter(false);
    }
  },[isDisable])

  return <input className="square" value={squareValue} style={{backgroundColor: color, borderColor: borderStyle}}></input>;

};
export default Square;