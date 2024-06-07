import React from 'react';
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Header/Navbar";
import ScrollToTop from './components/ScrollToTop';

const App = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <ScrollToTop />
      <Navbar />
      <div className="flex-grow">
        {children}
      </div>
{/*       <Footer /> */}
    </div>
  );
};

export default App;
