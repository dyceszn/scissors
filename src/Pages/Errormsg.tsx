import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ErrormsgStyle from "../Style/Errormsg.module.css";
import { Arrow, Failed } from "../Assets";

// Error message component
const Errormsg: React.FC = () => {
  // Initialize hooks
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as { message: string } | null;
  const message = state?.message || "An unknown error occurred.";

  // Handler to go back to the previous page
  const previousPage = () => {
    navigate(-1); // Go back one page in the history stack
  };

  return (
    <div>
      <div className={ErrormsgStyle.row1}>
        <img
          className={ErrormsgStyle.arrow}
          src={Arrow}
          alt=""
          onClick={previousPage}
        />
      </div>

      <main className={ErrormsgStyle.row2}>
        <div className={ErrormsgStyle.box}>
          <img className={ErrormsgStyle.img} src={Failed} alt="" />
          <p className={ErrormsgStyle.msg}>{message}</p>
        </div>
      </main>

      <div className={ErrormsgStyle.row3}></div>
    </div>
  );
};

export default Errormsg;
