import React from "react";
import "./index.css";

const CategoryCard = ({ categoryName, clickedElement }) => {
  return (
    <>
      <div
        onClick={() => clickedElement(categoryName)}
        className="cateory-card-div"
      >
        <h1 className="card-main-heading">{categoryName}</h1>
        <p className="card-para">Unlimited Jokes On {categoryName}</p>
      </div>
    </>
  );
};

export default CategoryCard;
