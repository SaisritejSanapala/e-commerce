import React, { useEffect, useState } from 'react'
import CheckoutWizard from '../components/CheckoutWizard'
import axios from 'axios';

const Confirmation = () => {

    const [details, setDetails] = useState([])

    const address = JSON.parse(localStorage.getItem("address"))

    useEffect(() => {
        axios.get('/api/orderdetails')
            .then((items) => {
              
                setDetails(items.data.items)
            })
            .catch((err) => { console.log(err) })

    }, [])

    let total = localStorage.getItem("total")

    return (
        <div className='container'>
            <CheckoutWizard currentStep={5} />

            <h1>Order Confirmed</h1>


            <div className='d-flex justify-content-center flex-wrap'>

                <div className='d-flex flex-column w-75 me-2'>

                    <div className='border p-3 mb-3'>
                        <h4 >Shipping </h4>
                        <p>Name: {address.fullName}</p>
                        <p>Address: {address.address} </p>
                        <a href=''>Edit</a>

                    </div>


                    <div className='border p-3 mb-3'>
                        <h4 >Payment</h4>
                        <p>Method: PayPal</p>

                        <a href=''>Edit</a>

                    </div>


                    <div className="border p-2 mb-3 d-flex flex-column justify-content-around">
                        <h3>Items</h3>

                        {details.map((each) => (

                            
                            <div className='d-flex justify-content-between border p-3 mb-2' key={each.id}>
                            
                                <div>
                                    <img src={each.product.image} style={{ height: '50px', width: '50px' }} className='me-3' alt={each.product.productName} />
                                    <a href=''>{each.product.productName}</a>
                                </div>
                                <div className='mt-3'>
                                    <p>${each.product.price}</p>

                                </div>
                                <div>
                                    
                                    <p className='mt-3'>{each.quantity}</p>

                                </div>
                            </div>
                        ))}


                    </div>

                </div>

                <div className='border p-3 h-50'>
                    <h2>Order Summary</h2>
                    <div className='d-flex justify-content-between mb-0'>
                        <p>Items</p>
                        <p>{total}$</p>
                    </div><hr />

                    <div className='d-flex justify-content-between'>
                        <p>Shipping</p>
                        <p>0$</p>
                    </div><hr />
                    <div className='d-flex justify-content-between'>
                        <p>Tax</p>
                        <p>0$</p>
                    </div><hr />

                    <div className='d-flex justify-content-between fw-bold'>
                        <p>Order Total</p>
                        <p>{total}$</p>
                    </div><hr />
                </div>

            </div>


        </div>


    )
}

export default Confirmation