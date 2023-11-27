import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import axios from 'axios'

import Loading from './Loading';

import Swal from 'sweetalert2';



const Login = (props) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const login = (event) => {
        event.preventDefault();
        setLoading(true);
        const requestData = { email, password }
        axios.post(`/api/${props.path}`, requestData)
            .then((result) => {
                
                if (result.status === 200) {
                    localStorage.setItem("token", result.data.result.token);
                    localStorage.setItem('user', JSON.stringify(result.data.result.user));
                    dispatch({ type: 'LOGIN_SUCCESS', payload: result.data.result.user });
                    setLoading(false);
                    setEmail("")
                    setPassword("")
                    navigate(`${props.home}`);
                }
            })
            .catch((error) => {
                console.log(error)

                setLoading(false)

                Swal.fire({
                    icon: 'error',
                    title: error
                })


            })

    }


    return (
        <>

            <div className='container d-flex flex-column justify-content-center align-items-center p-3'>

                <form onSubmit={(e) => login(e)}>
                    <Loading loading={loading} />

                    <h1 className='mb-3'>Sign In</h1>
                    <div className="mb-3">
                        <label for="email" className="form-label">Email address</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="email" />

                    </div>
                    <div className="mb-3">
                        <label for="password" className="form-label">Password</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" id="password" />
                    </div>

                    <button type="submit" className="btn btn-warning mb-3" style={{ border: 1 + "px solid black" }}>Sign In</button>

                    <p>New customer? <span><Link to={`${props.signup}`}>Create your account</Link></span></p>
                </form>
                <p className=' mt-4'>All Rights Reserved</p>
            </div>
        </>
    )
}

export default Login