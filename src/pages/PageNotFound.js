import React from "react";
import { useNavigate } from "react-router-dom";

function PageNotFound() {
  const navigate = useNavigate();

  const handleNavigateHome = () => {
    navigate("/");
  };

  return (
    <section className="page_not-found">
      <h1 className="page_not-found__number">404</h1>
      <p className="page_not-found__text">Page Not Found</p>
      <button onClick={handleNavigateHome}>Go Home</button>
    </section>
  );
}

export default PageNotFound;
