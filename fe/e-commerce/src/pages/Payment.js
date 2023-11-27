import React from 'react'
import CheckoutWizard from '../components/CheckoutWizard'
import { useNavigate } from 'react-router-dom'

const Payment = () => {
    const navigate = useNavigate()

    return (
        <div className='container d-flex flex-column justify-content-center align-items-center p-3'>
            <CheckoutWizard currentStep={4} />


            <h1 className='mt-3'>Payment Method</h1>

            <div>
                <div class="form-check mb-2">
                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" checked />
                    <label class="form-check-label" for="flexRadioDefault1">
                        Paypal
                    </label>
                </div>
                <div class="form-check mb-2">
                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
                    <label class="form-check-label" for="flexRadioDefault2">
                        Razor
                    </label>
                </div>
                <button className='btn btn-warning' onClick={() => navigate('/confirmation')}>Continue</button>
            </div>

            <p className=' mt-4'>All Rights Reserved</p>
        </div>


    )
}

export default Payment