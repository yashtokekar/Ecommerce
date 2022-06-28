import React, { useEffect, useState } from 'react';
import { getSub } from '../../functions/sub';
import { LoadingOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { ProductCard } from '../../components/cards/ProductCard';

export const SubHome = ({ match }) => {
  const [sub, setSub] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const { slug } = match.params;

  useEffect(() => {
    setLoading(true);
    getSub(slug).then((res) => {
      //   console.log(JSON.stringify(res.data, null, 4));
      setSub(res.data.sub);
      setProducts(res.data.products);
      setLoading(false);
    });
  }, []);

  return (
    <div className='container'>
      <div className='row'>
        <div className='col'>
          {loading ? (
            <h4
              className='jumbotron text-center p-3 mt-5 mb-5 display-6'
              style={{ fontSize: '34px' }}
            >
              <LoadingOutlined />
            </h4>
          ) : (
            <h4
              className='jumbotron text-center p-3 mt-5 mb-5 display-6'
              style={{ fontSize: '34px' }}
            >
              {products.length} {products.length !== 1 ? 'products' : 'product'}{' '}
              in "{sub.name}"
            </h4>
          )}
        </div>
      </div>
      <div className='row ml-5'>
        {products.map((product) => (
          <div key={product._id} className='col-md-3 ml-5 mr-2 mb-5'>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};
