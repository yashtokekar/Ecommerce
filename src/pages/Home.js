import React, { useEffect, useState } from 'react';
import { Jumbotron } from '../components/cards/Jumbotron';
import { BestSellers } from '../components/home/BestSellers';
import { NewArrivals } from '../components/home/NewArrivals';

export const Home = () => {
  return (
    <>
      <div className='jumbotron text-danger h1 font-weight-bold text-center'>
        <Jumbotron text={['Latest Products', 'Best Sellers', 'New Arrivals']} />
      </div>

      <h4
        className='text-center p-3 mt-5 mb-5 display-6 jumbotron'
        style={{ fontSize: '34px' }}
      >
        New Arrivals
      </h4>
      <NewArrivals />

      <h4
        className='jumbotron text-center p-3 mt-5 mb-5 display-6'
        style={{ fontSize: '34px' }}
      >
        Best Sellers
      </h4>
      <BestSellers />

      <br />
      <br />
    </>
  );
};
