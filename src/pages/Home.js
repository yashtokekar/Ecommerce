import React, { useEffect, useState } from 'react';
import { Jumbotron } from '../components/cards/Jumbotron';
import { CategoryList } from '../components/category/CategoryList';
import { BestSellers } from '../components/home/BestSellers';
import { NewArrivals } from '../components/home/NewArrivals';
import { SubList } from '../components/sub/SubList';

export const Home = () => {
  return (
    <>
      <div className='jumbotron text-info h1 font-weight-bold text-center bg-dark'>
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

      <h4
        className='jumbotron text-center p-3 mt-5 mb-5 display-6'
        style={{ fontSize: '34px' }}
      >
        Categories
      </h4>
      <CategoryList />

      <h4
        className='jumbotron text-center p-3 mt-5 mb-5 display-6'
        style={{ fontSize: '34px' }}
      >
        Sub-categories
      </h4>
      <SubList />

      <br />
      <br />
    </>
  );
};
