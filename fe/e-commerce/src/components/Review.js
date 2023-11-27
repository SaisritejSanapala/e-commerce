import React, { useState } from 'react'
import Loading from './Loading';

import axios from 'axios';
import Swal from 'sweetalert2';
import { json, useNavigate } from 'react-router-dom';

const Review = (props) => {

    const navigate = useNavigate();

    const [rating, setRating] = useState("")
    const [review, setReview] = useState("")
      

    const [loading, setLoading] = useState(false);



    const CONFIG_OBJ = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        }

    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (localStorage.getItem("token") === null) {
            Swal.fire(
                {
                    icon: "error",
                    title: 'Need to login as Customer to be able to add review'
                }
            )
        }
        else {
            if (rating === "") {
                Swal.fire(
                    {
                        icon: "error",
                        title: 'Rating is required'
                    }
                )
            }
            else if (review === "") {
                Swal.fire(
                    {
                        icon: "error",
                        title: 'Review is required'
                    }
                )
            }

            else {
                setLoading(true)
             
                const request = { productId: props.product._id, rating: rating, reviewText: review }
                const response = await axios.post(`/api/addreviews`, request, CONFIG_OBJ)
                if (response.status === 200) {
                    console.log(response.data.product)
                    localStorage.setItem("product", JSON.stringify(response.data.product))

                    Swal.fire({
                        icon: 'success',
                        title: "Review added successfully"
                    })
                    setLoading(false)

                    navigate('/product')
                }

            }

        }
    }


    return (
        <div className='container p-2'>
            <h1>Reviews</h1>

            <div>
                {props.product.reviews.map((eachReview) => {

                    return (
                        <div className='border p-3 mb-3'>
                            <p>{eachReview.reviewedBy.fullName}</p>
                            <p>{eachReview.reviewText}</p>

                        </div>
                    )
                })}
            </div>

            <div>
                <h2>Write a customer review</h2>
                {loading ? <Loading loading={loading} /> : ''}

                <form onSubmit={handleSubmit}>
                    <select className="form-select mb-3" value={rating} aria-label="Default select example" onChange={(e) => setRating(e.target.value)}>
                        <option selected>Open this select menu</option>
                        <option value="1">1- Bad</option>
                        <option value="2">2- Poor</option>
                        <option value="3">3- Average</option>
                        <option value="4">4- Good</option>
                        <option value="5">5- Excellent</option>
                    </select>

                    <div className="form-floating mb-3">
                        <textarea className="form-control" value={review} placeholder="Leave a comment here" id='comments' style={{ height: 100 + "px" }} onChange={(e) => setReview(e.target.value)}></textarea>
                        <label for="comments">Comments</label>
                    </div>

                    <button type='submit' className='btn btn-warning' style={{ border: 1 + "px solid black" }}>Submit</button>
                </form>


            </div>
        </div>
    )
}

export default Review