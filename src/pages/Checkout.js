import React from 'react';

export const Checkout = () => {
  const saveAddressToDb = () => {
    // /
  };
  return (
    <div className='row'>
      <div className='col-md-6'>
        <h4>Delivery Address</h4>
        <br />
        <br />
        textarea{' '}
        <button className='btn btn-primary mt-2' onClick={saveAddressToDb}>
          Save
        </button>
        <hr />
        <h4>Apply Coupon</h4>
        <br />
        coupon input and appply button
      </div>

      <div className='col-md-6'>
        <h4>Order Summary</h4>
        <hr />
        <p>products</p>
        <hr />
        <p>List of Products</p>
        <hr />
        <p>cart total</p>

        <div className='row'>
          <div className='col-md-6'>
            <div>
              <button className=' btn btn-primary'>Place Order</button>
            </div>
          </div>
          <div className='col-md-6'>
            <button className='btn btn-primary'>Empty Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
};
