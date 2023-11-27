import React, { useState } from 'react'
import Loading from '../components/Loading';
import CheckoutWizard from '../components/CheckoutWizard';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';



const Shipping = () => {

    const [formData, setFormData] = useState({
        fullName: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
    });

 
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const CONFIG_OBJ = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        }

    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        const request = { address: formData.address, city: formData.city, fullName: formData.fullName, state: formData.state, zipCode: formData.zipCode }

        await axios.post('/api/addaddress', request, CONFIG_OBJ)
            .then((response) => {
                localStorage.setItem("address", JSON.stringify(response.data.address))
                navigate('/payment')
                setLoading(false)

            })
                   
            .catch((err) => { console.log(err) })
    };

    return (

        <div className='container d-flex flex-column justify-content-center align-items-center p-3'>
            <CheckoutWizard currentStep={2} />

            <form onSubmit={handleSubmit}>

                {loading ? <Loading loading={loading} /> : ''}

                <h1 className='mb-3'>Shipping Address</h1>
                <div>
                    <label htmlFor="fullName">Full Name</label>
                    <input
                        className='form-control mb-3'
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="address">Address</label>
                    <input
                        className='form-control mb-3'
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="city">City</label>
                    <input
                        className='form-control mb-3'
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="state">State</label>
                    <input
                        className='form-control mb-3'
                        type="text"
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="zipCode">ZIP Code</label>
                    <input
                        className='form-control mb-3'
                        type="text"
                        id="zipCode"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button className='btn btn-warning' type="submit">Submit</button>
            </form>


            <p className=' mt-4'>All Rights Reserved</p>
        </div>

    );
};


export default Shipping