import React from "react";
import LoadingStyle from "../Style/Loading.module.css";

const Loading = () => {
  return (
    <div className={LoadingStyle.container} data-testid="loading-spinner">
      <div
        className={LoadingStyle.spinner}
        role="status"
        aria-label="Loading"
      />
    </div>
  );
};

export default Loading;
