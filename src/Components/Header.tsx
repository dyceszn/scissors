import React from "react";
import { Link } from "react-router-dom";
import HeaderStyle from "../Style/Header.module.css";

const Header = () => {
  return (
    <div className={HeaderStyle.div}>
      <p className={HeaderStyle.p}>
        <Link to="/home" className="link">
          Scissors
        </Link>
      </p>
    </div>
  );
};

export default Header;
