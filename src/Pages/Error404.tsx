import React from "react";
import Error404Style from "../Style/Error404.module.css";
import { Arrow, Failed } from "../Assets";
import { useNavigate } from "react-router-dom";

// Error404 component
const Error404: React.FC = () => {
  // Initialize hooks
  const navigate = useNavigate();

  // Function to go back to the previous page or to the login page
  const handleClick = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/login");
    }
  };

  return (
    <div>
      <div className={Error404Style.row1}>
        <img className={Error404Style.arrow} src={Arrow} alt="" />
      </div>

      <main className={Error404Style.row2}>
        <div className={Error404Style.box1}>
          <p className={Error404Style.p1}>Error 404</p>
          <img className={Error404Style.img} src={Failed} alt="" />
          <p className={Error404Style.p2}>
            It seems the page your trying to reach does not exist.
          </p>
        </div>
        <button className={Error404Style.box2} onClick={handleClick}>
          Back to safety
        </button>
      </main>

      <div className={Error404Style.row3}></div>
    </div>
  );
};

export default Error404;
