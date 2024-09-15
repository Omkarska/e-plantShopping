import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {

    const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
        // Calculate total amount for all products in the cart
        let total = 0;
        cart.forEach(item => {
          total += parseFloat( item.cost.replace('$', '')) * item.quantity;
        });
        return total;
  };

  // Handle continue shopping button click
  const handleContinueShopping = (e) => {
    // call the function passed from the parent component.
     // e.preventDefault()
      onContinueShopping();
  };

    const handleCheckoutShopping = (e) => {
        alert('Functionality to be added for future reference');
    };

  const handleIncrement = (item) => {
        // dispatch the updateQuantity action reducer
        dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {

      // if-else to handle the case if the number of items gets decremented to 0
      if ( item.quantity -1 === 0) {
            // dispatch the removeItem action reducer
            dispatch(removeItem(item));
      } else {
          // dispatch the updateQuantity action reducer
          dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
      }

  };

  const handleRemove = (item) => {
        // dispatch the removeItem action reducer
        dispatch(removeItem(item));
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
        return parseFloat(item.cost.replace('$', '')) * item.quantity;
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1" onClick={(e) =>handleCheckoutShopping(e)  }>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;


