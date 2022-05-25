import * as React from "react";
import { Routes, Route} from "react-router-dom";
import "./App.css";
import Login from "./pages/Login/Login";
import News from "./pages/News/News";
import Foodie from './pages/Foodie/Foodie'
import Register from './pages/Register/Register'
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/News" element={<News />} />
        <Route path="/Foodie" element={<Foodie />} />
      </Routes>
    </div>
  );
}

export default App;
