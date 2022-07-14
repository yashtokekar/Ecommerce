import React from 'react';
import { Drawer, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import image from '../../images/default-image.png';

export const SideDrawer = () => {
  const dispatch = useDispatch();
  const { drawer, cart } = useSelector((state) => ({ ...state }));
  const imageStyle = {
    width: '100%',
    height: '50px',
    objectFit: 'cover',
  };
  return (
    <Drawer
      className='text-center'
      title={`Cart/ ${cart.length}`}
      visible={drawer}
      placement='right'
      closable={false}
      onClose={() => {
        dispatch({
          type: 'SET_VISIBLE',
          payload: false,
        });
      }}
    >
      {cart.map((p) => (
        <div key={p._id} className='row'>
          <div className='col'>
            {p.images[0] ? (
              <>
                <img src={p.images[0].url} style={imageStyle} />
                <p className='text-center bg-secondary text-light'>
                  {p.title} X {p.count}
                </p>
              </>
            ) : (
              <>
                <img src={image} style={imageStyle} />
                <p className='text-center bg-secondary text-light'>
                  {p.title} X {p.count}
                </p>
              </>
            )}
          </div>
        </div>
      ))}
      <Link to='/cart'>
        <button
          onClick={() =>
            dispatch({
              type: 'SET_VISIBLE',
              payload: false,
            })
          }
          className='text-center btn btn-primary btn-raised btn-block'
        >
          Go to Cart
        </button>
      </Link>
    </Drawer>
  );
};
