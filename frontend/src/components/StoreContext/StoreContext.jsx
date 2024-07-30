import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { menu_list } from "../../assets/assets";
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [token,setToken]=useState("");
  const [food_list,setFoodList]=useState([]);
  const url="http://localhost:4000";
  const addToCart = async(itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if(token){
      await axios.post(url+"/api/cart/add",{itemId},{headers:{token}});
    }
    else{
      alert("Login to Add to Cart");
    }
  };
  const removeFromCart =async(itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if(token){
      await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}});
    }
  };
  
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      try {
        if (cartItems[item] > 0) {
          let itemInfo = food_list.find((product) => product._id === item);
          totalAmount += itemInfo.price * cartItems[item];
        }
        
      } catch (error) {
        
      }
     
    }
    return totalAmount;
  };
  const fetchFoodList=async()=>{
    const response=await axios.get(url+"/api/food/list");
    setFoodList(response.data.data)
  }
  const loadCartData = async(token)=>{
    const response=await axios.post(url+"/api/cart/get",{},{headers:token});
    setCartItems(response.data.cartData);
  }

  useEffect(()=>{
    async function loadData(){
      await fetchFoodList();
      if(localStorage.getItem("token")){
        setToken(localStorage.getItem("token"));
        await loadCartData({token:localStorage.getItem("token")});
      }
    }
    loadData()
  },[]);

  const contextValue = {
    food_list,
    menu_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
    loadCartData,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};
export default StoreContextProvider;