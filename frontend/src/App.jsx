import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Gallery from './components/Gallery';
import AboutMe from './components/AboutMe';


function App() {
  return (
    <Router>
      <AnimatePresence exitBeforeEnter>
        <Routes location={window.location} key={window.location.pathname}>
          <Route path="/" element={<Gallery />} />
          <Route path="/about-me" element={<AboutMe />} />
        </Routes>
      </AnimatePresence>
    </Router>
  );
}

export default App;
