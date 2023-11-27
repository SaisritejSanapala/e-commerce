import axios from 'axios';

import React, { useEffect, useState } from 'react'

const CustomerOrderHistory = () => {

    const [orderHistory, setOrderHistory] = useState([]);

    useEffect(() => {

        axios.get('/api/orderdetails')
            .then((response) => {
                setOrderHistory(response.data.items);
           
            })
            .catch((error) => {
                console.error('Error fetching order history:', error);
            });
    }, []);

    return (
        <div className='container'>
            <h2>Order History</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Date</th>
                        <th>Total Amount</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {orderHistory.map((order) => (
                        <tr key={order._id}>
                            <td>{order._id}</td>
                            <td>{order.createdAt}</td>
                            <td>${order.product.price * order.quantity}</td>
                            <td>Paid</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
  


export default CustomerOrderHistory



