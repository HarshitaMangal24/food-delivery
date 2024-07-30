import React, { useContext } from "react";
import "./Cart.css";
import { Link } from "react-router-dom";
import { StoreContext } from "../../components/StoreContext/StoreContext";
const cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount,url } =
    useContext(StoreContext);
  return (
    <div className="cart">
      {!getTotalCartAmount() ? (
        <div className="cart-total empty-cart">
          <h2>Good Food is Always Cooking</h2>
          <p>Your cart is empty. Add something from the menu...</p>
          <Link to="/">
            <button>Browse Menu</button>
          </Link>
        </div>
      ) : (
        <div>
          <div className="cart-items">
            <div className="cart-items-title">
              <p>Items</p>
              <p>Title</p>
              <p>Price</p>
              <p>Quantity</p>
              <p>Total</p>
              <p>Remove</p>
            </div>
            <br />
            <hr />
            {food_list.map((item, index) => {
              if (cartItems[item._id] > 0) {
                return (
                  <div>
                    <div className="cart-items-title cart-items-item">
                      <img src={url+"/images/"+item.image} alt="" />
                      <p>{item.name}</p>
                      <p>${item.price}</p>
                      <p>{cartItems[item._id]}</p>
                      <p>${item.price * cartItems[item._id]}</p>
                      <p
                        onClick={() => removeFromCart(item._id)}
                        className="cross"
                      >
                        x
                      </p>
                    </div>
                    <hr />
                  </div>
                );
              }
            })}
          </div>
          <div className="cart-bottom">
            <div className="cart-total">
              <h2>Cart Totals</h2>
              <div>
                <div className="cart-total-details">
                  <p>Subtotal</p>
                  <p>${getTotalCartAmount()}</p>
                </div>
                <hr />
                <div className="cart-total-details">
                  <p>Delivery Fee</p>
                  {getTotalCartAmount() ? <p>${2}</p> : <p>${0}</p>}
                </div>
                <hr />
                <div className="cart-total-details">
                  <b>Total</b>
                  {getTotalCartAmount() ? (
                    <b>${getTotalCartAmount() + 2}</b>
                  ) : (
                    <b>${0}</b>
                  )}
                </div>
              </div>
              <Link to="/order">
                <button>PROCEED TO CHECKOUT</button>
              </Link>
            </div>
            <div className="cart-promocode">
              <div>
                <p>If you have a promo code, Enter it Here</p>
                <div className="cart-promocode-input">
                  <input type="text" placeholder="promo code" />
                  <button>Submit</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default cart;
