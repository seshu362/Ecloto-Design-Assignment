# Shopping Cart App

A simple shopping cart application built with React that allows users to add products to the cart, update quantities, and receive a free gift when the subtotal reaches a certain threshold.

## Features
- Add products to the cart
- Update product quantity in the cart
- Remove products from the cart
- Free gift added when subtotal reaches ₹1000
- Dynamic progress bar indicating amount spent towards free gift
- Sorted cart to always display the free gift last

## Technologies Used
- React.js
- JavaScript
- HTML
- CSS

## Getting Started
### Prerequisites
Make sure you have the following installed on your machine:
- Node.js (v14 or later)
- npm (Node Package Manager)

### Installation & Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/seshu362/Ecloto-Design-Assignment
   ```
2. Navigate to the project folder:
   ```sh
   cd ecloto-design-assignment
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Start the development server:
   ```sh
   npm start
   ```
5. Open your browser and go to:
   ```
   http://localhost:3000
   ```

## Deployment Live Demo
The application is deployed on Netlify. You can access it here:
[Shopping Cart App](https://seshu-ecloto-shopping.netlify.app/)

## Project Structure
```
shopping-cart-app/
│── src/
│   ├── App.js            # Main application logic
│   ├── App.css           # Styles for the app
│   ├── index.js          # React entry point
│── public/               # Static assets
│── package.json          # Project dependencies and scripts
│── README.md             # Documentation
```

## How It Works
1. The application displays a list of products that can be added to the cart.
2. Each product has an "Add to Cart" button, which increases its quantity if already in the cart.
3. The cart displays a subtotal, and when the subtotal reaches ₹1000, a free gift (Wireless Mouse) is automatically added.
4. Users can update item quantities or remove items from the cart.
5. A progress bar dynamically updates based on the subtotal.


