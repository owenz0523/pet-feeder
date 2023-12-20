import React from "react";
import { Routes, Route } from "react-router-dom";


// pages, components, context
import SignIn from "./pages/SignIn";
import Home from './pages/Home';
import Account from './pages/Account';
import Camera from './pages/Camera';
import Navbar from './components/Navbar';
import About from './pages/About';
import { AuthContextProvider } from "./context/AuthContext";
import Protected from "./components/Protected";

function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <Navbar />
        <Routes>
          <Route path="/signin" element={<SignIn/>}/>
          <Route path="/" element={<Home/>}/>
          <Route path="/about" element={<About />} />
          <Route path='/account' element={<Protected> <Account/> </Protected>}/>
          x<Route path="/camera" element={<Camera/>}/>
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
