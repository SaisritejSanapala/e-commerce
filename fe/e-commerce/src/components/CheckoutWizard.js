import React from 'react';
import './CheckoutWizard.css';

const CheckoutWizard = ({ currentStep }) => {
  const stepWidth = (currentStep - 1) * 25; 

  return (
    <div className="checkout-wizard">
      <div className="checkout-line" style={{ width: `${stepWidth}%` }}></div>
      <div className="checkout-step">shipping</div>
      <div className="checkout-step">payment</div>
      <div className="checkout-step">confirmation</div>
    </div>
  );
};

export default CheckoutWizard;
