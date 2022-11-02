import { FC, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import {
  currentColumnrAtom,
  currentRowAtom,
  isEnterOrDeleteAtom,
  newLettersAtom,
} from "../../states/atoms";
import Square from "../square/Square";

import "./styles.css";

interface RowProps {
  thisRow: number;
  color?: any;
}

const Row: FC<RowProps> = ({ thisRow, color }) => {
  const [currentRow] = useRecoilState(currentRowAtom);
  const [currentColumn, setCurrentColumn] = useRecoilState(currentColumnrAtom);
  const [newLetters, setNewLetters] = useRecoilState(newLettersAtom);
  const [isEorD, setEorD] = useRecoilState(isEnterOrDeleteAtom);
  const [bool, setBool] = useState(false);
  useEffect(() => {
    let arr = [
      ["white", "white", "white", "white", "white"],
      ["white", "white", "white", "white", "white"],
      ["white", "white", "white", "white", "white"],
      ["white", "white", "white", "white", "white"],
      ["white", "white", "white", "white", "white"],
      ["white", "white", "white", "white", "white"],
    ];
    if (newLetters.join() !== arr.join()) {
      arr=newLetters;
      setBool(true);
    }
  }, [newLetters]);

  return (
    <div className="row">
      <Square
        isValid={thisRow === currentRow ? "yes" : "no"}
        column={1}
        thisRow={thisRow}
      />
      <Square
        isValid={thisRow === currentRow ? "yes" : "no"}
        column={2}
        thisRow={thisRow}
      />
      <Square
        isValid={thisRow === currentRow ? "yes" : "no"}
        column={3}
        thisRow={thisRow}
      />
      <Square
        isValid={thisRow === currentRow ? "yes" : "no"}
        column={4}
        thisRow={thisRow}
      />
      <Square
        isValid={thisRow === currentRow ? "yes" : "no"}
        column={5}
        thisRow={thisRow}
      />
    </div>
  );
};
export default Row;
