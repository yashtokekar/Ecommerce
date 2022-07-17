import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { emptyUserCart, getUserCart, saveUserAddress } from '../functions/user';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { toast } from 'react-toastify';

export const Checkout = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));

  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState('');
  const [addressSaved, setAddressSaved] = useState(false);

  useEffect(() => {
    getUserCart(user.token).then((res) => {
      console.log(JSON.stringify(res.data, null, 4));
      setProducts(res.data.products);
      setTotal(res.data.cartTotal);
    });
  }, []);

  const saveAddressToDb = () => {
    saveUserAddress(user.token, address).then((res) => {
      if (res.data.ok) {
        setAddressSaved(true);
        toast.success('Address saved');
      }
    });
  };

  const emptyCart = () => {
    // from local storage
    if (typeof window !== 'undefined') {
      localStorage.removeItem('cart');
    }
    // from redux state
    dispatch({
      type: 'ADD_TO_CART',
      payload: [],
    });
    // from db
    emptyUserCart(user.token).then((res) => {
      console.log('cart is empty');
      setProducts([]);
      setTotal(0);
    });
  };

  return (
    <div className='row'>
      <div className='col-md-6'>
        <h4>Delivery Address</h4>
        <br />
        <ReactQuill theme='snow' value={address} onChange={setAddress} />
        <br />
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
        <p>Products: {products.length}</p>
        <hr />
        {products.map((p, i) => (
          <div key={i}>
            <p>
              {p.product.title} ({p.color}) x {p.count} ={' '}
              {p.product.price * p.count}
            </p>
          </div>
        ))}
        <p>List of Products</p>
        <hr />
        <p>cart total: {total}</p>

        <div className='row'>
          <div className='col-md-6'>
            <div>
              <button className=' btn btn-primary' disabled={!addressSaved}>
                Place Order
              </button>
            </div>
          </div>
          <div className='col-md-6'>
            <button
              onClick={emptyCart}
              disabled={!products.length}
              className='btn btn-primary'
            >
              Empty Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
