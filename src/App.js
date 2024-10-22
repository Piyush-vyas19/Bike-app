import logo from './logo.svg';
import './App.css';
import LoginSignupPage from './Loginsignup';


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BookingPage from './Bookingpage';


function App() {
  return (
    <div className="App">
      <Router>
      <Routes>
        <Route path="/" element={<LoginSignupPage />} />
        <Route path="/booking" element={<BookingPage/>} />
     </Routes>
     </Router>

    </div>
  );
}

export default App;
