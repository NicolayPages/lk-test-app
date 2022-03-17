import React, { memo, FC } from "react";
import s from "./Footer.module.scss";

const Footer: FC = memo(() => {
  return (
    <div className={s.container}>
      <p className={s.copy}>@Copyright Test Task for Takeoff Staff company</p>
    </div>
  );
});

export default Footer;
