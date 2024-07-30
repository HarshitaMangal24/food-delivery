import React, { useContext } from "react";
import "./FoodList.css";
import FoodItem from "../FoodItem/FoodItem";
import { StoreContext } from "../StoreContext/StoreContext";

const FoodList = ({ category }) => {
  const { food_list } = useContext(StoreContext);
  

  return (
    <div className="food-display" id="food-display">
      <h2>Top dishes near you</h2>
      <div className="food-display-list">
        {food_list.map((item) => {
          if (category === "All" || category === item.category) {
            return (
              <FoodItem
                key={item._id}
                id={item._id}
                name={item.name}
                price={item.price}
                description={item.description}
                image={item.image}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

export default FoodList;
