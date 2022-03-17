import React, { memo, FC } from "react";
import s from "./Preloader.module.scss";

const Preloader: FC = memo(() => {
  return (
    <div className={s.wrapper}>
      <div className={s.ldsDualRing} />
    </div>
  );
});

export default Preloader;
