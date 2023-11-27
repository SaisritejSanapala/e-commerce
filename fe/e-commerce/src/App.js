import React, { useEffect } from 'react';
import './App.css';
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import Navbar from './components/Navbar';
import Product from './components/Product';
import Cart from './pages/Cart';
import CustomerLogin from './pages/CustomerLogin';
import CustomerSignup from './pages/CustomerSignup';
import SellerLogin from './pages/SellerLogin';
import SellerSignUp from './pages/SellerSignUp';
import SellerProfile from './pages/SellerProfile';
import CustomerProfile from './pages/CustomerProfile';
import { useDispatch } from 'react-redux';
import Shipping from './pages/Shipping';
import Payment from './pages/Payment';
import Confirmation from './pages/Confirmation';
import CustomerOrderHistory from './pages/CustomerOrderHistory';
import AdminLogin from './pages/AdminLogin';
import AdminSignup from './pages/AdminSignup';
import AdminProfile from './pages/AdminProfile';

function App() {

  function DynamicRouting() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
      const userData = JSON.parse(localStorage.getItem("user"))
    
      if (userData) {//when user has a login active session
        dispatch({ type: "LOGIN_SUCCESS", payload: userData })
        navigate('/')
       
      } else {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        dispatch({ type: "LOGIN_ERROR" })
        navigate('/');

      }
    }, [])
    return (
      <Routes>
       <Route exact path='/' element={<Home />} />
          <Route exact path='/product' element={<Product />} />
          <Route exact path='/cart' element={<Cart />} />
          <Route exact path='/customerlogin' element={<CustomerLogin />} />
          <Route exact path='/customersignup' element={<CustomerSignup />} />
          <Route exact path='/customerprofile' element={<CustomerProfile />} />
          <Route exact path='/sellerlogin' element={<SellerLogin />} />
          <Route exact path='/sellersignup' element={<SellerSignUp />} />
          <Route exact path='/sellerprofile' element={<SellerProfile />} />
          <Route exact path='/shipping' element={<Shipping />} />
          <Route exact path='/payment' element={<Payment />} />
          <Route exact path='/confirmation' element={<Confirmation />} />
          <Route exact path='/customerorderhistory' element={<CustomerOrderHistory />} />
          <Route exact path='/adminlogin' element={<AdminLogin />} />
          <Route exact path='/adminsignup' element={<AdminSignup />} />
          <Route exact path='/adminprofile' element={<AdminProfile />} />
      </Routes>

    )
  }
  return (
    <div>
      <Router>
        <Navbar />
        <DynamicRouting />
      </Router>
    </div>
  );
}

export default App;
