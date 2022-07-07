import React, { useEffect, useState } from 'react';
import { getProductsByCount, getProductsByFilter } from '../functions/product';
import { getCategories } from '../functions/category';
import { useSelector, useDispatch } from 'react-redux';
import { ProductCard } from '../components/cards/ProductCard';
import { Checkbox, Menu, Slider } from 'antd';
import {
  DollarCircleOutlined,
  DownSquareOutlined,
  StarOutlined,
} from '@ant-design/icons';
import { Star } from '../components/forms/Star';

const { SubMenu, Item } = Menu;

export const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState([0, 0]);
  const [ok, setOk] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoryIds, setCategoryIds] = useState([]);
  const [star, setStar] = useState(0);

  let dispatch = useDispatch();
  let { search } = useSelector((state) => ({ ...state }));
  const { text } = search;

  useEffect(() => {
    loadAllProducts();

    //fetch categories
    getCategories().then((res) => setCategories(res.data));
  }, []);

  const fetchProducts = (arg) => {
    // setLoading(true);
    getProductsByFilter(arg).then((res) => {
      setProducts(res.data);
      // setLoading(false);
    });
  };

  // 1. load products by default on page load
  const loadAllProducts = () => {
    // setLoading(true);
    getProductsByCount(12).then((p) => {
      setProducts(p.data);
      // setLoading(false);
    });
  };

  //2. load products on user search input
  useEffect(() => {
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar(0);
    const delayed = setTimeout(() => {
      fetchProducts({ query: text });
      if (!text) {
        loadAllProducts();
      }
    }, 300);
    return () => clearTimeout(delayed);
  }, [text]);

  //3. load products based on price range
  useEffect(() => {
    console.log('ok to request');
    fetchProducts({ price });
  }, [ok]);

  const handleSlider = (value) => {
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: '' },
    });
    setCategoryIds([]);
    setPrice(value);
    setStar(0);
    setTimeout(() => {
      setOk(!ok);
    }, 500);
  };

  //4. load products based on categories
  const showCategories = () =>
    categories.map((c) => (
      <div key={c._id}>
        <Checkbox
          onChange={handleCheck}
          className='pb-2 pl-4 pr-4'
          value={c._id}
          name='category'
          checked={categoryIds.includes(c._id)}
        >
          {c.name}
        </Checkbox>
        <br />
      </div>
    ));

  const handleCheck = (e) => {
    // dispatch({
    //   type: 'SEARCH_QUERY',
    //   payload: { text: '' },
    // });
    setPrice([0, 0]);
    setStar(0);
    let inTheState = [...categoryIds];
    let justChecked = e.target.value;
    let foundInTheState = inTheState.indexOf(justChecked); //returns index if found else -1

    if (foundInTheState === -1) {
      inTheState.push(justChecked);
    } else {
      inTheState.splice(foundInTheState, 1);
    }

    setCategoryIds(inTheState);
    fetchProducts({ category: inTheState });
  };

  // 5. load products based on star ratings
  const showStars = () => (
    <div className='pr-4 pl-4 pb-2'>
      <Star starClick={handleStarClick} numberOfStars={5} />
      <Star starClick={handleStarClick} numberOfStars={4} />
      <Star starClick={handleStarClick} numberOfStars={3} />
      <Star starClick={handleStarClick} numberOfStars={2} />
      <Star starClick={handleStarClick} numberOfStars={1} />
    </div>
  );

  const handleStarClick = async (num) => {
    // console.log(num);
    // dispatch({
    //   type: 'SEARCH_QUERY',
    //   payload: { text: '' },
    // });
    setCategoryIds([]);
    setPrice([0, 0]);
    setStar(num);
    fetchProducts({ stars: star });
  };

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-3 pt-2'>
          <h4>Search/filter</h4>
          <hr />

          <Menu mode='inline' defaultOpenKeys={['1', '2']}>
            {/*price*/}
            <SubMenu
              key='1'
              title={
                <span className='h6'>
                  <DollarCircleOutlined /> Price
                </span>
              }
            >
              <div>
                <Slider
                  className='ml-4 mr-4'
                  tipFormatter={(v) => `Rs.${v}`}
                  range
                  value={price}
                  onChange={handleSlider}
                  max='200000'
                />
              </div>
            </SubMenu>

            {/*category*/}
            <SubMenu
              key='2'
              title={
                <span className='h6'>
                  <DownSquareOutlined /> Categories
                </span>
              }
            >
              <div style={{ marginTop: '10px' }}>{showCategories()}</div>
            </SubMenu>

            {/*stars*/}
            <SubMenu
              key='3'
              title={
                <span className='h6'>
                  <StarOutlined /> Rating
                </span>
              }
            >
              <div style={{ marginTop: '10px' }}>{showStars()}</div>
            </SubMenu>
          </Menu>
        </div>

        <div className='col-md-9 pt-2'>
          {loading ? (
            <h4 className='text-danger'>Loading...</h4>
          ) : (
            <h4 className='text-danger'>Products</h4>
          )}

          {products.length < 1 && <p>No Products Found</p>}
          <div className='row pb-5'>
            {products.map((p) => (
              <div key={p._id} className='col-md-4 mt-5'>
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
