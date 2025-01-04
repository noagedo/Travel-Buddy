// src/App.tsx
import React from 'react';
import Navbar from './components/NavBar';
import Hero from './components/Hero';
import ScrollIndicator from './components/ScrollIndicator';
import Footer from './components/Footer';
import Categories from './components/Categories';

const App: React.FC = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <ScrollIndicator />
      <Categories/>
      <Footer/>
    </div>
  );
};

export default App;
