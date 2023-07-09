import React, { useEffect, useState } from "react";
import "./index.css";
import CategoryCard from "../categoryCard";
import { MoonLoader } from "react-spinners";
import { CSpinner } from "@coreui/react";

const Category = () => {
  const [categoryData, setCategoryData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [fetchedJoke, setFetchedJoke] = useState("");
  const [modelToggle, setModelToggle] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchingDataFromApi = async () => {
      try {
        const response = await fetch(
          "https://api.chucknorris.io/jokes/categories"
        );
        const data = await response.json();
        console.log(data);
        setCategoryData(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchingDataFromApi();
  }, []);

  const clickedElement = (clickedCategory) => {
    setIsLoading(false);
    setSelectedCategory(clickedCategory);
    const fetchingJokeDataFromApi = async (clickedCategory) => {
      setModelToggle(true);
      try {
        const response = await fetch(
          `https://api.chucknorris.io/jokes/random?category=${clickedCategory}`
        );
        const data = await response.json();
        setFetchedJoke(data.value);
        setIsLoading(true);
      } catch (error) {
        console.log(error);
      }
    };
    fetchingJokeDataFromApi(clickedCategory);
  };

  return (
    <div className="main-category-container">
      <h1 className="chuck-norries-head">Chuck Norries</h1>
      <div className="main-categoty-middile-div">
        {categoryData.map((eachCard) => (
          <CategoryCard
            categoryName={eachCard}
            clickedElement={clickedElement}
          />
        ))}
      </div>
      {modelToggle === true && (
        <div className="moder-card-main-div">
          <div className="moder-head-and-cross-icon-div">
            <h1 className="model-text-header">{selectedCategory}</h1>
            <svg onClick={() => setModelToggle(false)}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="cross-icon"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </div>
          <div className="model-tect-content-div">
            {isLoading === true ? (
              <p className="model-tect-content-para">{fetchedJoke}</p>
            ) : (
              <MoonLoader color="#fff" />
            )}
            <button
              onClick={() => clickedElement(selectedCategory)}
              className="model-next-joke-button"
            >
              Next joke
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Category;
