import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

import Swal from 'sweetalert2'

import Loading from './Loading'



const Signup = (props) => {

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const signup = (event) => {
        event.preventDefault();
        if (!fullName || !email || !password || !confirmPassword) {
            Swal.fire({
                icon: 'error',
                title: 'One or more mandatory fields are missing!'
            })

        }
        else if (password !== confirmPassword) {
            Swal.fire({
                icon: 'error',
                title: 'Both passwords should be same!'
            })

        }
        else {
            setLoading(true);
            const requestData = { fullName: fullName, email, password }
            axios.post(`/api/${props.path}`, requestData)
                .then((result) => {
                    if (result.status === 201) {
                        setLoading(false);
                        Swal.fire({
                            icon: 'success',
                            title: 'User successfully registered'
                        })
                    }
                    navigate(`${props.signin}`)
                    setFullName('');
                    setEmail('');
                    setPassword('');
                })
                .catch((error) => {
                    console.log(error);
                    setLoading(false);
                    Swal.fire({
                        icon: 'error',
                        title: error.response.data
                    })
                })
        }

    }
    return (
        <div>
            <div className='container d-flex flex-column justify-content-center align-items-center p-3'>

                <form onSubmit={(e) => signup(e)}>

                    {loading ? <Loading loading={loading}/> : ''}

                    <h1 className='mb-3'>Sign Up</h1>

                    <div className="mb-3">
                        <label for="fullname" className="form-label">Full Name</label>
                        <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} className="form-control" id="fullname" />

                    </div>

                    <div className="mb-3">
                        <label for="email" className="form-label">Email address</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="email" />

                    </div>

                    <div className="mb-3">
                        <label for="password" className="form-label">Password</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" id="password" />
                    </div>

                    <div className="mb-3">
                        <label for="password2" className="form-label">Confirm Password</label>
                        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="form-control" id="password2" />
                    </div>

                    <button type="submit" className="btn btn-warning mb-3" style={{ border: 1 + "px solid black" }}>Sign Up</button>

                    <p>Already have an account? <span><Link to={`${props.signin}`} >Sign In</Link></span></p>
                </form>
                <p className=' mt-4'>All Rights Reserved</p>
            </div>
        </div>
    )
}

export default Signup