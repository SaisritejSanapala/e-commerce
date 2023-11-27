import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faCircleMinus, faTrash } from '@fortawesome/free-solid-svg-icons';
import './Cart.css'
import { useDispatch } from 'react-redux';
import axios from 'axios';

import Swal from 'sweetalert2'

import { useNavigate } from 'react-router-dom';



const Cart = () => {

  const [cartItems, setCartItems] = useState([])

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const CONFIG_OBJ = {
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + localStorage.getItem("token")
    }

  }


  const getCartItems = () => {
    axios.get(`/api/getcartitems`, CONFIG_OBJ)
      .then((cartItems) => {
        setCartItems(cartItems.data.cartItems)
      })
      .catch((err) => {
        Swal.fire({
          icon: 'error',
          title: "error"
        })
      })
  }

  const handleIncreaseDecrease = async (cartItemId, type) => {

    const request = { "cartItemId": cartItemId };
    const response = await axios.put(`/api/${type}`, request, CONFIG_OBJ)
    if (response.status === 200) {
      getCartItems()
    }

  }

  const deleteItem = async (id) => {
    await axios.delete(`/api/deletecartitem/${id}`, CONFIG_OBJ)
    getCartItems()
  }


  const handleCheckout = async () => {
    await axios.post(`/api/checkout`,{}, CONFIG_OBJ)
    .then((response) => {
      navigate('/shipping')
      localStorage.setItem("total", JSON.stringify(total))
      
    })
    .catch((err) => {console.log(err)})
  
  }

  
  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      Swal.fire({
        icon: 'error',
        title: "Need to login as customer to be able to see cart items"
      })
      navigate('/')
    }
    else { getCartItems() }

  }, [])

  let total = 0;
  let eachItemPrice = 0

  return (
    <div className='container p-3'>

      <h1>Shopping Cart</h1>

      <div className='d-flex justify-content-between'>

        <div className='d-flex flex-column w-75'>
          {cartItems.map((item) => {
            eachItemPrice = Number(item.product.price) * item.quantity

            total += eachItemPrice


            return (

              <div class="border p-2 mb-3 ">

                <div className='d-flex justify-content-between'>

                  <div className=''>
                    <img src={item.product.image} style={{ height: 50 + "px", width: 50 + "px" }} className='me-3' />
                    <a>{item.product.productName}</a>

                  </div>

                  <div className='d-flex align-items-center'>
                    <FontAwesomeIcon style={{ cursor: 'pointer' }} icon={faCircleMinus} onClick={() => handleIncreaseDecrease(item._id, "decrease")} />
                    <p className='m-2'>{item.quantity}</p>
                    <FontAwesomeIcon style={{ cursor: 'pointer' }} icon={faCirclePlus} onClick={() => handleIncreaseDecrease(item._id, "increase")} />

                  </div>

                  <div className='mt-3' >
                    <p >{item.product.price} $</p>
                  </div>

                  <div className='d-flex  align-items-center ' >
                    <FontAwesomeIcon icon={faTrash} className='me-5' onClick={() => deleteItem(item._id)} style={{ cursor: "pointer" }} />

                  </div>

                </div>

              </div>

            )

          })
          }
        </div>

        <div className="w-25 ms-4">
          <div className="border p-3" >

            <h5>Subtotal {`(${cartItems.length} items)`} : ${total}</h5>
            <hr />
            <div className='text-center'>
              <button className='btn btn-warning px-4' onClick={() => handleCheckout()} style={{ border: 1 + "px solid black" }}>Proceed to Checkout</button>
            </div>
          </div>


        </div>

      </div>

      <p className='text-center position-absolute top-100 start-50 translate-middle mt-4'>All Rights Reserved</p>
    </div>

  )
}

export default Cart