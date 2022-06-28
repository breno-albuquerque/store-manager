import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import Products from './pages/Products';
import Sales from './pages/Sales';

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/products" element={<Products />} />
      <Route exact path="/sales" element={<Sales />} />
    </Routes>
  );
}

export default App;
