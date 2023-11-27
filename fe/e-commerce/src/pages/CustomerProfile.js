import React from 'react'

const CustomerProfile = () => {
  return (
    <div className='container p-3'>
      <div className='row'>
        <h1>Your Account</h1>
        <div className='d-flex flex-wrap'>

          <div className="border me-3 mb-3 p-2 " >
            <img className='' alt="Your Orders" src="https://m.media-amazon.com/images/G/31/x-locale/cs/ya/images/Box._CB485927553_.png" />

            <p class="">Your Orders</p>
          </div>


          <div className="border me-3 mb-3 p-2 " >
            <img className='' alt="Your Addresses" src="https://m.media-amazon.com/images/G/31/x-locale/cs/ya/images/address-map-pin._CB485934183_.png" />

            <p class="">Your Addresses</p>

          </div>

          <div className="border me-3 mb-3 p-2" >
            <img className='' alt="Loginsecurity" src="https://m.media-amazon.com/images/G/31/x-locale/cs/ya/images/sign-in-lock._CB485931504_.png" />
            <p class="">Payment & Security</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CustomerProfile