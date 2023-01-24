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

  const [isLetterKeysDisabled, setIsLetterKeysDisabled] = useRecoilState(isLetterKeysDisabledAtom);
  const [currentColumn, setCurrentColumn] = useRecoilState(currentColumnAtom);  
  const [currentWord, setCurrentWord] = useRecoilState(currentWordAtom);  
  const [isDelete, setDelete] = useRecoilState(isDeleteAtom);

  const [squareValue, setSquareValue] = React.useState("");

  let color=cellColors[thisRow][column-1];
  let borderStyle="*";

  useEffect(()=>{ //delete functionality
    if (isCurrentRow && column === currentColumn && isDelete===true) {
      setCurrentColumn(currentColumn - 1);
          setSquareValue("")
          setDelete(false);
    } // eslint-disable-next-line
  },[isDelete])

  useEffect(() => {
    if (isCurrentRow && column === currentColumn && !isEnter && !isDelete) { //setting square value
          setCurrentWord(currentWord + currentLetter);
          setSquareValue(currentLetter);
    }
    if(currentColumn!==5 && squareValue!==""){ //disabling enter key
        setIsLetterKeysDisabled(false);
    } // eslint-disable-next-line
  }, [isClick]);

  useEffect(()=>{      
    if(isLetterKeysDisabled){ //enabling enter key
      setIsLetterKeysDisabled(true);
    } // eslint-disable-next-line
  },[isLetterKeysDisabled])

  useEffect(()=>{
    if (currentWord.length===5) { //disabling letter keys
      setIsLetterKeysDisabled(true);
    } // eslint-disable-next-line
  },[currentWord])

  return <input className="square" value={squareValue} style={{backgroundColor: color, borderColor: borderStyle}}></input>;

};
export default Square;