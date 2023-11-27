import React, { useState } from 'react'

import axios from 'axios';
import Swal from 'sweetalert2'
import Loading from '../components/Loading'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useSelector } from 'react-redux';
import StarRating from '../components/StarRating';

const SellerProfile = () => {

    const user = useSelector(state => state.userReducer);

    const [productName, setProductName] = useState("")

    const [price, setPrice] = useState("")
    const [brand, setBrand] = useState("")
    const [description, setDescription] = useState("")

    const [myAllProudcts, setMyAllProducts] = useState([])

    const [show, setShow] = useState(false);
    const [editProfile, setEditProfile] = useState(false);

    const [showEditProduct, setShowEditProduct] = useState(false);



    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleCloseEditProfile = () => setEditProfile(false);
    const handleShowEditProfile = () => setEditProfile(true)

    const handleCloseEditProduct = () => setShowEditProduct(false)
    const handleShowEditProduct = () => setShowEditProduct(true)


    const [image, setImage] = useState({ preview: '', data: '' })
    const [loading, setLoading] = useState(false);
  

    const CONFIG_OBJ = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    }

    const handleFileSelect = (event) => {
        const img = {
            preview: URL.createObjectURL(event.target.files[0]),
            data: event.target.files[0]
        }
        setImage(img);
    }

    const handleImgUpload = async () => {
        let formData = new FormData();
        formData.append('file', image.data);

        const response = axios.post(`/api/uploadFile`, formData)
        return response;
    }

    const editYourProfile = () => {

    }


    const addProduct = async () => {

        if (image.preview === '') {
            Swal.fire({
                icon: 'error',
                title: 'Post image is mandatory!'
            })
        } else if (productName === '') {
            Swal.fire({
                icon: 'error',
                title: 'Product Name is mandatory!'
            })
        } else if (price === '') {
            Swal.fire({
                icon: 'error',
                title: 'Price is mandatory!'
            })
        }
        else if (brand === '') {
            Swal.fire({
                icon: 'error',
                title: 'Brand is mandatory!'
            })
        }
        else if (description === '') {
            Swal.fire({
                icon: 'error',
                title: 'Description is mandatory!'
            })
        }
        else {
            setLoading(true)
            const imgRes = await handleImgUpload();
            const request = { image: `/api/files/${imgRes.data.fileName}`, productName: productName, price: price, brand: brand, description: description }

            const productResponse = await axios.post(`/api/createproduct`, request, CONFIG_OBJ)
            setLoading(false);
            if (productResponse.status === 201) {
                setLoading(false)
                handleClose()
                setProductName("")
                setPrice("")
                setBrand("")
                setDescription("")
                setImage({preview: '', data: ''})
                Swal.fire({
                    icon: 'success',
                    title: 'Product added successfully!'
                })
                getMyProducts()
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Some error occurred while creating post'
                })
            }
        }
    }

    const getMyProducts = async () => {
        const response = await axios.get(`/api/myallproducts`, CONFIG_OBJ);

        if (response.status === 200) {
            setMyAllProducts(response.data.products);
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Some error occurred while getting all your products'
            })
        }
    }
    

    const editProduct = async () => {
        const productId = JSON.parse(localStorage.getItem("productId"))
   
        const imgRes = await handleImgUpload();
        const request = { image: `/api/files/${imgRes.data.fileName}`, productName: productName, price: price, brand: brand, description: description, id: productId }

        const productResponse = await axios.post('/api/editproduct', request, CONFIG_OBJ)
        setLoading(false);
        if (productResponse.status === 201) {
            setLoading(false)
            setProductName("")
            setPrice("")
            setBrand("")
            setDescription("")
            handleCloseEditProduct()
            setImage({preview: '', data: ''})
            Swal.fire({
                icon: 'success',
                title: 'Product edited successfully!'
            })
            getMyProducts()
            
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Some error occurred while editing post'
            })
        }

    }

    useEffect(() => {
        getMyProducts();

    }, []);

    return (
        <div className='container p-3'>
            <div className='row'>
                <div className='col-12 col-md-6'>
                    <img src={user.user.profileImg}
                        height={200 + "px"} width={200 + "px"} alt='...' />
                    <h1 className='mt-3'>Welcome, {user.user.fullName} </h1>

                </div>

                <div className='col-12 col-md-6 d-flex justify-content-center align-items-end'>
                    <button type="button" className="btn btn-primary me-3" onClick={handleShowEditProfile} >
                        Edit profile
                    </button>


                    <button type="button" onClick={handleShow} className="btn btn-primary">
                        Add Product
                    </button>


                </div>
            </div>

            <div className='row mt-5'>
                <h1 className='mb-5'>Your Proucts</h1>
                {myAllProudcts.map((product) => {

                    return (
                        <div className='col-sm-12 col-md-4 mb-3' key={product._id}>

                            <div>
                                <div className="card" style={{ width: 18 + "rem" }}>
                                    <img src={product.image} className="card-img-top" alt={product.productName} />
                                    <div className="card-body">
                                        <a href="#" className="card-link">{product.productName}</a>

                                        <p className="card-text" style={{ color: 'yellow' }}><StarRating rating={5} /> {product.reviews.length} Reviews</p>


                                        <p className="card-text">{product.price}</p>


                                        <a href="#" className="card-link">{product.brand}</a><br />

                                        <button className='btn btn-warning mt-2' onClick={() => { handleShowEditProduct(); localStorage.setItem("productId", JSON.stringify(product._id)) }}>Edit Product</button>
                                    </div>

                                </div>

                            </div>

                        </div>

                    )
                })}


            </div>



            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <h1 className=" fs-5">Add Product</h1>
                        <Loading loading={loading} />
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='upload-box'>
                        <div className="dropZoneContainer">
                            <input name="file" type="file" id="drop_zone" className="FileUpload" accept=".jpg,.png,.gif" onChange={handleFileSelect} />
                            <div className="dropZoneOverlay">
                                {image.preview && <img src={image.preview} className='w-100 mt-3' />}
                            </div>
                        </div>
                    </div>
                    <p>Product Name:</p>
                    <input className='form-control mb-3' type='text' value={productName} onChange={(e) => setProductName(e.target.value)} />
                    <p>Price:</p>
                    <input className='form-control mb-3' type='text' value={price} onChange={(e) => setPrice(e.target.value)} />
                    <p>Brand:</p>
                    <input className='form-control mb-3' type='text' value={brand} onChange={(e) => setBrand(e.target.value)} />
                    <p>Description:</p>
                    <input className='form-control mb-3' type='text' value={description} onChange={(e) => setDescription(e.target.value)} />
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-primary" onClick={handleClose}>
                        Close
                    </button>
                    <button type="button" className="btn btn-primary" onClick={(e) => addProduct(e)}>Submit</button>
                </Modal.Footer>
            </Modal>


            <Modal show={showEditProduct} onHide={handleCloseEditProduct}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <h1 className=" fs-5">Edit Product</h1>
                        <Loading loading={loading} />
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='upload-box'>
                        <div className="dropZoneContainer">
                            <input name="file" type="file" id="drop_zone" className="FileUpload" accept=".jpg,.png,.gif" onChange={handleFileSelect} />
                            <div className="dropZoneOverlay">
                                {image.preview && <img src={image.preview} className='w-100 mt-3' />}
                            </div>
                        </div>
                    </div>
                    <p>Product Name:</p>
                    <input className='form-control mb-3' type='text' value={productName} onChange={(e) => setProductName(e.target.value)} />
                    <p>Price:</p>
                    <input className='form-control mb-3' type='text' value={price} onChange={(e) => setPrice(e.target.value)} />
                    <p>Brand:</p>
                    <input className='form-control mb-3' type='text' value={brand} onChange={(e) => setBrand(e.target.value)} />
                    <p>Description:</p>
                    <input className='form-control mb-3' type='text' value={description} onChange={(e) => setDescription(e.target.value)} />
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-primary" onClick={handleCloseEditProduct}>
                        Close
                    </button>
                    <button type="button" className="btn btn-primary" onClick={() => editProduct()}>Submit</button>
                </Modal.Footer>
            </Modal>


            <Modal show={editProfile} onHide={handleCloseEditProfile}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <h1 className=" fs-5">Edit Profile</h1>
                        <Loading loading={loading} />
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <p>Full Name:</p>
                    <input className='form-control mb-3' type='text' value={productName} onChange={(e) => setProductName(e.target.value)} />
                    <p>Emai:</p>
                    <input className='form-control mb-3' type='text' value={price} onChange={(e) => setPrice(e.target.value)} />
                    <p>DOB:</p>
                    <input className='form-control mb-3' type='text' value={brand} onChange={(e) => setBrand(e.target.value)} /></Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-primary" onClick={handleCloseEditProfile}>
                        Close
                    </button>
                    <button type="button" className="btn btn-primary" onClick={(e) => editYourProfile(e)}>Submit</button>
                </Modal.Footer>
            </Modal>


        </div>
    )
}

export default SellerProfile