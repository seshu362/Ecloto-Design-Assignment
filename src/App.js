import { useState, useEffect } from "react";
import "./App.css";

const PRODUCTS = [
  { id: 1, name: "Laptop", price: 500 },
  { id: 2, name: "Smartphone", price: 300 },
  { id: 3, name: "Headphones", price: 100 },
  { id: 4, name: "Smartwatch", price: 150 },
];

const FREE_GIFT = { id: 99, name: "Wireless Mouse", price: 0 };
const THRESHOLD = 1000;

function App() {
  const [cart, setCart] = useState([]);

  // Calculate subtotal
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Check if free gift should be added/removed
  useEffect(() => {
    const hasFreeGift = cart.some((item) => item.id === FREE_GIFT.id);

    if (subtotal >= THRESHOLD && !hasFreeGift) {
      setCart([...cart, { ...FREE_GIFT, quantity: 1 }]);
    } else if (subtotal < THRESHOLD && hasFreeGift) {
      setCart(cart.filter((item) => item.id !== FREE_GIFT.id));
    }
  }, [subtotal, cart]);

  // Add product to cart
  const addToCart = (productId) => {
    const product = PRODUCTS.find((p) => p.id === productId);
    const quantity = 1;

    setCart((prev) => {
      const existingItem = prev.find((item) => item.id === productId);
      if (existingItem) {
        return prev.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prev, { ...product, quantity }];
      }
    });
  };

  // Update cart item quantity
  const updateCartItem = (productId, change) => {
    setCart((prev) => {
      const updatedCart = prev
        .map((item) => {
          if (item.id === productId) {
            const newQuantity = item.quantity + change;
            if (newQuantity <= 0) return null;
            return { ...item, quantity: newQuantity };
          }
          return item;
        })
        .filter(Boolean);
      return updatedCart;
    });
  };

  // Remove item from cart
  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  // Calculate remaining amount for free gift
  const remainingForGift = Math.max(0, THRESHOLD - subtotal);
  const progressPercentage = Math.min(100, (subtotal / THRESHOLD) * 100);

  // Sort cart to always show free gift last
  const sortedCart = [...cart].sort((a, b) => {
    if (a.id === FREE_GIFT.id) return 1;
    if (b.id === FREE_GIFT.id) return -1;
    return 0;
  });

  return (
    <div className="app">
      <div className="app-header">
        <h1>Shopping Cart</h1>
      </div>

      <div className="products-section">
        <h2>Products</h2>
        <div className="products-grid">
          {PRODUCTS.map((product) => (
            <div key={product.id} className="product-card">
              <h3>{product.name}</h3>
              <p className="price">₹{product.price}</p>
              <button
                className="add-to-cart"
                onClick={() => addToCart(product.id)}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="cart-section">
        <h2>Cart Summary</h2>
        <div className="cart-summary">
          <div className="subtotal">
            <span>Subtotal: </span>
            <span className="subtotal-amount">₹{subtotal}</span>
          </div>

          <div className="progress-container">
            <div
              className="progress-bar"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <div className="progress-labels">
            <span>₹0</span>
            <span>₹{THRESHOLD}</span>
          </div>

          {remainingForGift > 0 ? (
            <p className="gift-promo">
              Add ₹{remainingForGift} more to get a FREE {FREE_GIFT.name}!
            </p>
          ) : (
            cart.some((item) => item.id === FREE_GIFT.id) && (
              <p className="gift-message">You got a free {FREE_GIFT.name}!</p>
            )
          )}
        </div>

        <h3>Cart Items</h3>
        <div>
          {cart.length === 0 ? (
            <div className="cart-items empty-cart">
              <p>Your cart is empty</p>
              <p>Add some products to see them here!</p>
            </div>
          ) : (
            <div className="cart-items-grid">
              {sortedCart.map((item) => (
                <div key={`${item.id}-${item.quantity}`} className="cart-item-card">
                  <div className="item-info">
                    <div className="item-name-row">
                      <span className="item-name">{item.name}</span>
                      {item.id === FREE_GIFT.id && (
                        <span className="free-badge">FREE GIFT</span>
                      )}
                    </div>
                    <div className="item-calculation">
                      ₹{item.price} × {item.quantity} = ₹{item.price * item.quantity}
                    </div>
                  </div>
                  {item.id !== FREE_GIFT.id && (
                    <div className="cart-quantity-controls">
                      <button
                        className="quantity-minus"
                        onClick={() => updateCartItem(item.id, -1)}
                      >
                        -
                      </button>
                      <span className="quantity-number">{item.quantity}</span>
                      <button
                        className="quantity-plus"
                        onClick={() => updateCartItem(item.id, 1)}
                      >
                        +
                      </button>
                      <button
                        className="remove-btn"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;