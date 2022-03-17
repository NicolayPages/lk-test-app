import React, { useState, FC, memo } from "react";
import s from "./Paginator.module.scss";

type PropsType = {
  totalCount: number;
  pageSize: number;
  currentPage: number;
  onPageChanged: (p: number) => void;
};

const Paginator: FC<PropsType> = memo((props) => {
  const pagesCount = Math.ceil(props.totalCount / props.pageSize);
  const pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  const portionSize = props.pageSize;
  const portionCount = Math.ceil(props.totalCount / portionSize);

  const [portionNumber, setPortionNumber] = useState(1);
  const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
  const rightPortionPageNumber = portionNumber * portionSize;

  const pagination = pages
    .filter((p) => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
    .map((p) => {
      return (
        <li
          key={p}
          onClick={(e) => {
            props.onPageChanged(p);
          }}
          className={props.currentPage === p ? s.selected : s.g}
        >
          {p}
        </li>
      );
    });

  return (
    <div className={s.paginator}>
      {portionNumber > 1 && (
        <button
          className={s.pagBtn}
          onClick={() => setPortionNumber(portionNumber - 1)}
        >
          prev
        </button>
      )}
      <ul className={s.list}>{pagination}</ul>
      {portionCount > portionNumber * props.pageSize && (
        <button
          className={s.pagBtn}
          onClick={() => setPortionNumber(portionNumber + 1)}
        >
          next
        </button>
      )}
    </div>
  );
});

export default Paginator;
