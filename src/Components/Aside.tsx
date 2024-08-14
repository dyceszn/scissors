import React from "react";
import AsideStyle from "../Style/Aside.module.css";

const Aside = () => {
  return (
    <div className={AsideStyle.div} data-testid="main-div">
      <div className={AsideStyle.div2}>
        <h1 className={AsideStyle.h1}>Make your link as short as possible</h1>
        <hr className={AsideStyle.hr} />
      </div>
    </div>
  );
};

export default Aside;
