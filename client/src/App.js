import { useState } from 'react'

import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Aside from './components/Aside';
import Cart from './components/Cart';


function App() {
  const [CartItems, setCartItems] = useState([]);

  return (
    <div className="App">
      <Header/>
      <Aside handleAddToCart = {(newItem) => setCartItems([...CartItems, newItem])}/>
      <Cart items = {CartItems}/>
      <Footer/>
    </div>
  );
}

export default App;
