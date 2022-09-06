/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from 'react';
import { Card, Tooltip } from 'antd';
import { EyeOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import image from '../../images/default-image.png';
import { Link } from 'react-router-dom';
import { showAverage } from '../../functions/rating';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';

const { Meta } = Card;

export const ProductCard = ({ product }) => {
  const { title, description, images, slug, price } = product;
  const [tooltip, setTooltip] = useState('Click to add');

  //redux
  const { user, cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    // create cart array
    let cart = [];
    if (typeof window !== 'undefined') {
      // if cart is in localStorage GET it
      if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'));
      }
      // push new product to cart
      cart.push({
        ...product,
        count: 1,
      });
      // remove duplicates
      let unique = _.uniqWith(cart, _.isEqual);
      // save to locaStorage
      localStorage.setItem('cart', JSON.stringify(unique));
      setTooltip('Added');

      // add to redux state
      dispatch({
        type: 'ADD_TO_CART',
        payload: unique,
      });

      // show items in side drawer
      dispatch({
        type: 'SET_VISIBLE',
        payload: true,
      });
    }
  };
  return (
    <>
      {product && product.ratings && product.ratings.length > 0 ? (
        showAverage(product)
      ) : (
        <>
          <br />
          <div className='text-center pt-1 pb-3'>No Rating yet</div>
        </>
      )}
      <Card
        cover={
          <img
            src={images && images.length ? images[0].url : image}
            style={{ height: '150px', objectFit: 'cover' }}
            className='p-1'
          />
        }
        actions={[
          <Link to={`/product/${slug}`}>
            <EyeOutlined className='text-warning' />
            <br /> View Product
          </Link>,
          <Tooltip title={tooltip}>
            <a onClick={handleAddToCart}>
              <ShoppingCartOutlined className='text-danger' />
              <br /> Add to Cart
            </a>
            ,
          </Tooltip>,
        ]}
      >
        <Meta
          title={`${title} - INR ${price}`}
          description={`${description && description.substring(0, 40)}...`}
        ></Meta>
      </Card>
    </>
  );
};
