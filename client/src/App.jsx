import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Home } from './pages/home';
import { Webmine } from './pages/webmine';
import { Profile } from './pages/profile';
import { Register } from './pages/register';
import { Login } from './pages/login';
import { BootstrapNavbar } from './components/NavbarBs';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useCookies } from 'react-cookie';
import Cookies from 'js-cookie';

function App() {

  return (
    <div className="App">
      <Router>
        <BootstrapNavbar />
        <Routes>
          <Route path="/" element={Cookies.get('jwtToken1') ? <Home /> : <Navigate to="/login" replace />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={ <Login />} />
          <Route
            path="/webmine"
            element={Cookies.get('jwtToken1') ? <Webmine /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/profile"
            element={Cookies.get('jwtToken1') ? <Profile /> : <Navigate to="/login" replace />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
