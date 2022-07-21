import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  emptyUserCart,
  getUserCart,
  saveUserAddress,
  applyCoupon,
} from '../functions/user';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { toast } from 'react-toastify';

export const Checkout = ({ history }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));

  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState('');
  const [addressSaved, setAddressSaved] = useState(false);
  const [coupon, setCoupon] = useState('');
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  const [discountError, setDiscountError] = useState('');

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
      setTotalAfterDiscount(0);
      setCoupon('');
    });
  };

  const showAddress = () => {
    return (
      <>
        <ReactQuill theme='snow' value={address} onChange={setAddress} />
        <br />
        <button className='btn btn-primary mt-2' onClick={saveAddressToDb}>
          Save
        </button>
      </>
    );
  };
  const showProductSummary = () => {
    return products.map((p, i) => (
      <div key={i}>
        <p>
          {p.product.title} ({p.color}) x {p.count} ={' '}
          {p.product.price * p.count}
        </p>
      </div>
    ));
  };

  const applyDiscountCoupon = () => {
    applyCoupon(user.token, coupon).then((res) => {
      console.log('Discount Applied', res.data);
      if (res.data) {
        setTotalAfterDiscount(res.data);
        dispatch({
          type: 'COUPON_APPLIED',
          payload: true,
        });
      }
      if (res.data.err) {
        setDiscountError(res.data.err);
        dispatch({
          type: 'COUPON_APPLIED',
          payload: false,
        });
      }
    });
  };

  const showApplyCoupon = () => {
    return (
      <>
        <input
          onChange={(e) => {
            setCoupon(e.target.value);
            setDiscountError('');
          }}
          type='text'
          className='form-control'
          value={coupon}
        />
        <button onClick={applyDiscountCoupon} className='btn btn-primary mt-2'>
          Apply
        </button>
      </>
    );
  };

  return (
    <div className='row'>
      <div className='col-md-6'>
        <h4>Delivery Address</h4>
        <br />
        {showAddress()}
        <hr />
        <h4>Apply Coupon</h4>
        <br />
        {showApplyCoupon()}
        {discountError && <p className='bg-danger p-2'>{discountError}</p>}
      </div>

      <div className='col-md-6'>
        <h4>Order Summary</h4>
        <hr />
        <p>Products: {products.length}</p>
        <hr />
        {showProductSummary()}
        <p>List of Products</p>
        <hr />
        <p>cart total: {total}</p>

        {totalAfterDiscount > 0 && (
          <p className='bg-success p-2'>
            Discount Applied: Total Payable: &#8377;{totalAfterDiscount}
          </p>
        )}

        <div className='row'>
          <div className='col-md-6'>
            <div>
              <button
                className=' btn btn-primary'
                disabled={!addressSaved}
                onClick={() => {
                  history.push('/payment');
                }}
              >
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
