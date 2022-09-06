import React, { useEffect, useState } from 'react';
import { getProduct, productStar, getRelated } from '../functions/product';
import { SingleProduct } from '../components/cards/SingleProduct';
import { useSelector } from 'react-redux';
import { ProductCard } from '../components/cards/ProductCard';

export const Product = ({ match }) => {
  const [product, setProduct] = useState({});
  const [star, setStar] = useState(0);
  const [related, setRelated] = useState([]);

  const { user } = useSelector((state) => ({ ...state }));

  const { slug } = match.params;

  useEffect(() => {
    loadSingleProduct();
  }, [slug]);

  useEffect(() => {
    if (product.ratings && user) {
      let existingRatingObject = product.ratings.find(
        (ele) => ele.postedBy.toString() === user._id.toString()
      );
      existingRatingObject && setStar(existingRatingObject.star);
    }
  });

  const loadSingleProduct = () => {
    getProduct(slug).then((res) => {
      setProduct(res.data);
      //load related products
      getRelated(res.data._id).then((res) => setRelated(res.data));
    });
  };

  const onStarClick = (newRating, name) => {
    setStar(newRating);
    console.log(newRating, name);
    productStar(name, newRating, user.token).then((res) => {
      console.log(res.data);
      loadSingleProduct();
    });
  };

  return (
    <div className='container-fluid'>
      <div className='row pt-4'>
        <SingleProduct
          product={product}
          onStarClick={onStarClick}
          star={star}
        />
      </div>
      <br />

      <div className='row'>
        <div className='col text-center pt-5 pb-1'>
          <hr />
          <h4>Related Products</h4>
          <hr />
        </div>
      </div>
      <div className='container'>
        <div className='row'>
          {related.length > 0 ? (
            related.map((r) => (
              <div key={r._id} className='col-md-4 '>
                <ProductCard product={r} />
              </div>
            ))
          ) : (
            <div className='text-center'>No Products found</div>
          )}
        </div>
        <br />
      </div>
    </div>
  );
};
