import { Routes, Route} from "react-router-dom";
import "./App.css";
import Login from "./pages/Login/Login";
import News2 from "./pages/News/News2";
import Foodie from './pages/Foodie/Foodie'
import Register from './pages/Register/Register'
import Navbar from "./components/Navbar";
import { useAuthContext } from "./hooks/useAuthContext";
import ToDo from "./pages/Todo/ToDo";

function App() {

  const {authIsReady, user} = useAuthContext()


  return (
    <div className="App">
      {authIsReady && (
          <>
          <Navbar />
          <Routes>
            {/* <Route path="/">
              {!user && <Navigate to='/Login'/>}
              {user && <ToDo/>}
            </Route> */}
            <Route path="/" element={user ? <ToDo /> : <Login />} />
            <Route path="/Login" element={user ? <ToDo /> : <Login />} />
            <Route path="/Register" element={!user ? <Register /> : <ToDo/>} />
            <Route path="/News" element={user ? <News2 /> : <Login />}  />
            <Route path="/Foodie" element={user ? <Foodie /> : <Login />} />
          </Routes>
          </>
      )}
    </div>
  );
}

export default App;
