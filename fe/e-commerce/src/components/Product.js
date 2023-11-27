import React from 'react';
import Review from './Review'
import './Product.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

import Swal from 'sweetalert2';


import StarRating from './StarRating';

const Product = () => {
  const user = useSelector(state => state.userReducer)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const product = JSON.parse(localStorage.getItem("product"))

  const CONFIG_OBJ = {
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + localStorage.getItem("token")
    }

  }


  const addToCart = () => {
    if (user.user._id === undefined) {
      Swal.fire(
        {
          icon: "error",
          title: 'Need to login as Customer to be able to add products to cart'
        }
      )
    }
    else {
      const request = { customerId: user.user._id, productId: product._id }

      axios.post(`/api/additem`, request, CONFIG_OBJ)
        .then((result) => {
          navigate("/cart")
        })
        .catch((err) => { console.log(err) })
    }
  }




  return (
    <>
      <div className='container p-3'>
        <div className='row'>
          <div className='col-12 col-md-3'>
            <img className='w-100' src={product.image} alt='...' />

          </div>

          <div className='col-12 col-md-4 mb-3'>

            <div className="card description" >
              <ul className="list-group list-group-flush">
                <li className="list-group-item"><h1>{product.productName}</h1></li>
                <li className="list-group-item d-flex"><StarRating rating={5} /> <h6 style={{ color: 'yellow' }} className='ms-2 fs-5'>{product.reviews.length} reviews</h6></li>
                <li className="list-group-item">Price: ${product.price} </li>
                <li className="list-group-item">Description: {product.description}</li>
              </ul>
            </div>

          </div>

          <div className='col-12 col-md-4'>

            <div className="card p-3" >
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <h5 className='fw-bold'>Seller</h5>
                  <a className='fw-bold fs-5' href=''>{product.brand}</a>

                  <StarRating rating={4} />
                  <p style={{ color: 'yellow' }}>5 Reviews</p>

                </li>
                <li className="list-group-item">
                  <div className='d-flex justify-content-between'>
                    <p>Price: </p>
                    <p>{product.price}$</p>
                  </div>
                </li>
                <li className="list-group-item">
                  <div className='d-flex justify-content-between'>
                    <p>Status: </p>
                    <p>In stock</p>
                  </div>
                </li>

                <li className="list-group-item text-center" >
                  <button className='btn btn-warning px-4' style={{ border: 1 + "px solid black" }} onClick={() => addToCart()}>Add to cart</button>
                </li>
              </ul>
            </div>


          </div>

        </div>

      </div>

      <Review product={product} />
    </>
  )
}

export default Product