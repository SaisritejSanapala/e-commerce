import React, { useEffect, useState } from 'react'
import Banner from '../components/Banner'
import { useDispatch, useSelector } from 'react-redux'

import axios from 'axios';
import Swal from 'sweetalert2';

import { useNavigate } from 'react-router-dom';
import StarRating from '../components/StarRating';
const Home = () => {

  const user = useSelector(state => state.userReducer)

  const [allProucts, setAllProducts] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getProducts = async () => {
    const response = await axios.get(`/api/allproducts`);

    if (response.status === 200) {
      setAllProducts(response.data.products);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Some error occurred while getting all products'
      })
    }
  }

  const productClicked = async (productId) => {

    const request = { "productId": productId };
    await axios.post(`/api/productdetails`, request)
      .then((result) => {
        localStorage.setItem('product', JSON.stringify(result.data.product[0]));
        navigate('/product')
      })
      .catch((err) => {
        console.log(err.data)
      })

  }

  useEffect(() => {
    getProducts()
  }, [])

  return (
    <div className='container'>
      <Banner />

      <div className='mt-3'>
        <h1 className='text-center text-md-start'>Featured Products</h1>

        <div className='row'>
          {allProucts.map((product) => {
            return (
              <div className='col-12 col-md-4 col-lg-3 d-flex justify-content-center flex-wrap' onClick={(e) => productClicked(product._id)} style={{ cursor: 'pointer' }}>
                <div className="card m-3" style={{ width: 18 + "rem" }} key={product._id}>
                  <img src={product.image} className="card-img-top" alt={product.productName} />
                  <div className="card-body">
                    <a href="#" className="card-link">{product.productName} </a>

                    <p className="card-text" style={{ color: 'yellow' }}><StarRating rating={5} />{product.reviews.length} reviews</p>

                    <p className="card-text">{product.price}</p>


                    <a href="#" className="card-link">{product.brand}</a>
                  </div>



                </div>
              </div>

            )
          })}



        </div>
      </div>
    </div>
  )
}

export default Home