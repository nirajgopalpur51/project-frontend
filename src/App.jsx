import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import PropertyListingPage from './components/PropertyListingPage';
import Recommendations from './components/Recommendations';
import Homepage from './components/Homepage';

import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Default route for login page */}
        <Route path="/" element={<LoginPage />} />
        
        {/* Route for property listing page */}
        <Route path="/property-listing" element={<PropertyListingPage />} />
        
        {/* Route for recommendations page */}
        <Route path="/recommendations" element={<Recommendations />} />

        <Route path="/homepage" element={<Homepage />} />
      </Routes>
    </Router>
  );
}

export default App;
