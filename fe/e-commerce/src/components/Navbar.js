import React from 'react'
import './Navbar.css';
import { NavLink, useNavigate } from 'react-router-dom';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';

const Navbar = () => {
    const user = useSelector(state => state.userReducer);

    const token = localStorage.getItem("token")
   
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        dispatch({ type: "LOGIN_ERROR" });
        navigate("/");

    }

    return (
        <nav className="navbar navbar-dark bg-dark p-3">
            <div className="container-fluid ">
                <div className='mb-2' >
                    <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <a className="navbar-brand fw-bold ms-3" onClick={() => navigate('/')}  style={{cursor: 'pointer'}}>Amazona</a>

                </div>

                <div className="input-group mb-2" style={{ width: 250 + "px" }}>
                    <input type="text" className="form-control" />
                    <button className="btn btn-warning" type="button" id="button-addon2"  ><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
                </div>


                <div className='d-flex mb-2'>
                    {user.user.type === "customer" || token === null ? <div className='me-3'>
                        <a className="links" onClick={() => navigate("/cart")} style={{cursor: "pointer"}}>Cart</a>
                    </div> : ""}



                    {user.user.type === "seller" || token === null ? <div className="dropdown me-3">
                        <a className="dropdown dropdown-toggle links" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            {token === null ? "Seller" : user.user.fullName}
                        </a>
                        <ul className="dropdown-menu">
                            {token === null ? <li><NavLink className="dropdown-item" to="/sellerlogin">Login</NavLink></li> : ""}
                            {token !== null && user.user.type === "seller" ? <><li><NavLink className="dropdown-item" to="/sellerprofile">My Profile</NavLink></li>
                                <li><a className="dropdown-item" style={{ cursor: 'pointer' }} onClick={logout}>Logout</a></li></>
                                : ""}

                        </ul>
                    </div> : ""}

                    {user.user.type === "customer" || token === null ? <div className="dropdown me-3">
                        <a className="dropdown dropdown-toggle links" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            {token === null ? "Customer" : user.user.fullName}
                        </a>
                        <ul className="dropdown-menu">
                            {token === null ? <li><NavLink className="dropdown-item" to="/customerlogin">Login</NavLink></li> : ""}
                            {token !== null && user.user.type === "customer" ? <><li><NavLink className="dropdown-item" to="customerprofile">My Profile</NavLink></li>
                                <li><a className="dropdown-item" onClick={() => navigate('/customerorderhistory')} style={{ cursor: 'pointer' }}> Order History</a></li>
                                <li><a className="dropdown-item " style={{ cursor: 'pointer' }} onClick={logout}>Logout</a></li></>
                                : ""}

                        </ul>
                    </div> : ""}

                    {user.user.type === "admin" || token === null ? <div className="dropdown me-5">
                        <a className="dropdown dropdown-toggle links" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            {token === null ? "Admin" : user.user.fullName}
                        </a>
                        <ul className="dropdown-menu">
                            {token === null ? <li><NavLink className="dropdown-item" to="/adminlogin">Login</NavLink></li> : ""}
                            {token !== null ? <><li><a className="dropdown-item"  style={{ cursor: 'pointer' }} onClick={logout}>Logout</a></li></>
                                : ""}

                        </ul>
                    </div> : ""}

                </div>




                <div className="offcanvas offcanvas-start text-bg-dark" tabindex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
                    <div className="offcanvas-header">
                        <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">Categories</h5>
                        <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body">
                        <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" onClick={() => navigate('/')} style={{cursor: 'pointer'}}>Pants</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" onClick={() => navigate('/')} style={{cursor: 'pointer'}}>Shirts</a>
                            </li>

                        </ul>

                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar