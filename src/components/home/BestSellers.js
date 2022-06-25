import React, { useEffect, useState } from 'react';
import { getProducts, getProductsCount } from '../../functions/product';
import { ProductCard } from '../cards/ProductCard';
import { LoadingCard } from '../cards/LoadingCard';
import { Pagination } from 'antd';

export const BestSellers = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [productsCount, setProductsCount] = useState(0);

  useEffect(() => {
    loadAllProducts();
  }, [page]);

  useEffect(() => {
    getProductsCount().then((res) => setProductsCount(res.data));
  }, []);

  const loadAllProducts = () => {
    setLoading(true);
    getProducts('sold', 'desc', page).then((res) => {
      setProducts(res.data);
    });
    setLoading(false);
  };

  return (
    <>
      <div className='container'>
        {loading ? (
          <LoadingCard count={3} />
        ) : (
          <div className='row ml-5'>
            {products.map((product) => (
              <div key={product._id} className='col-md-3 ml-5 mr-2'>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
      <div className='row'>
        <nav className='col-md-4 offset-md-4 text-center pt-5 p-3'>
          <Pagination
            current={page}
            total={Math.round((productsCount / 3) * 10)}
            onChange={(value) => setPage(value)}
          />
        </nav>
      </div>
    </>
  );
};
