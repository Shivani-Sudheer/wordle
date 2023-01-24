import { FC } from "react";
import { useRecoilState } from "recoil";

import {
  currentRowAtom,
} from "../../states/atoms";
import Square from "../square/Square";
import "./styles.css";

interface RowProps {
  thisRow: number;
}

const Row: FC<RowProps> = ({ thisRow }) => {
  const [currentRow] = useRecoilState(currentRowAtom);

  return (
    <div className="row">
      <Square
        isCurrentRow={thisRow === currentRow ? true : false}
        column={1}
        thisRow={thisRow}
      />
      <Square
        isCurrentRow={thisRow === currentRow ? true : false}
        column={2}
        thisRow={thisRow}
      />
      <Square
        isCurrentRow={thisRow === currentRow ? true : false}
        column={3}
        thisRow={thisRow}
      />
      <Square
        isCurrentRow={thisRow === currentRow ? true : false}
        column={4}
        thisRow={thisRow}
      />
      <Square
        isCurrentRow={thisRow === currentRow ? true : false}
        column={5}
        thisRow={thisRow}
      />
    </div>
  );
};
export default Row;
