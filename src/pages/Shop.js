import React, { useEffect, useState } from 'react';
import { getProductsByCount, getProductsByFilter } from '../functions/product';
import { getCategories } from '../functions/category';
import { getSubs } from '../functions/sub';
import { useSelector, useDispatch } from 'react-redux';
import { ProductCard } from '../components/cards/ProductCard';
import { Checkbox, Menu, Radio, Slider } from 'antd';
import {
  BgColorsOutlined,
  DollarCircleOutlined,
  DownSquareOutlined,
  ShopOutlined,
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
  const [subs, setSubs] = useState([]);
  const [sub, setSub] = useState('');
  const [brands, setBrands] = useState([
    'Samsung',
    'Apple',
    'Xiaomi',
    'Oppo',
    'Vivo',
    'Asus',
    'Acer',
    'HP',
    'Dell',
    'Sony',
    'LG',
  ]);
  const [brand, setBrand] = useState('');
  const [colors, setColors] = useState([
    'Black',
    'Brown',
    'Silver',
    'White',
    'Blue',
  ]);
  const [color, setColor] = useState('');

  let dispatch = useDispatch();
  let { search } = useSelector((state) => ({ ...state }));
  const { text } = search;

  useEffect(() => {
    loadAllProducts();

    //fetch categories
    getCategories().then((res) => setCategories(res.data));

    //fetch sub categories
    getSubs().then((res) => setSubs(res.data));
  }, []);

  const fetchProducts = (arg) => {
    setLoading(true);
    getProductsByFilter(arg).then((res) => {
      setProducts(res.data);
      setLoading(false);
    });
  };

  // 1. load products by default on page load
  const loadAllProducts = () => {
    setLoading(true);
    getProductsByCount(12).then((p) => {
      setProducts(p.data);
      setLoading(false);
    });
  };

  //2. load products on user search input
  useEffect(() => {
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar(0);
    setSub('');
    setBrand('');
    setColor('');
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
    setSub('');
    setBrand('');
    setColor('');
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
    setSub('');
    setBrand('');
    setColor('');
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

  const handleStarClick = (num) => {
    // console.log(num);
    // dispatch({
    //   type: 'SEARCH_QUERY',
    //   payload: { text: '' },
    // });
    setCategoryIds([]);
    setPrice([0, 0]);
    setSub('');
    setBrand('');
    setColor('');
    setStar(num);
    fetchProducts({ stars: num });
  };

  // 6. load products by sub category
  const showSubs = () =>
    subs.map((s) => (
      <div
        key={s._id}
        onClick={() => handleSub(s)}
        className='p-1 m-1 badge badge-primary'
        style={{ cursor: 'pointer' }}
      >
        {s.name}
      </div>
    ));

  const handleSub = (sub) => {
    // dispatch({
    //   type: 'SEARCH_QUERY',
    //   payload: { text: '' },
    // });
    setCategoryIds([]);
    setPrice([0, 0]);
    setStar(0);
    setBrand('');
    setColor('');
    setSub(sub);
    fetchProducts({ sub });
  };

  // 7. load product by brand
  const showBrands = () =>
    brands.map((b) => (
      <Radio
        value={b}
        name={b}
        checked={b === brand}
        onChange={handleBrand}
        className='pb-1 pl-4 pr-4 mr-5'
      >
        {b}
      </Radio>
    ));

  const handleBrand = (e) => {
    // dispatch({
    //   type: 'SEARCH_QUERY',
    //   payload: { text: '' },
    // });
    setCategoryIds([]);
    setPrice([0, 0]);
    setStar(0);
    setSub('');
    setColor('');
    setBrand(e.target.value);
    fetchProducts({ brand: e.target.value });
  };

  // 8. load product by color
  const showColors = () =>
    colors.map((c) => (
      <Radio
        value={c}
        name={c}
        checked={c === color}
        onChange={handleColor}
        className='pb-1 pl-4 pr-4 mr-5'
      >
        {c}
      </Radio>
    ));

  const handleColor = (e) => {
    // dispatch({
    //   type: 'SEARCH_QUERY',
    //   payload: { text: '' },
    // });
    setCategoryIds([]);
    setPrice([0, 0]);
    setStar(0);
    setSub('');
    setBrand('');
    setColor(e.target.value);
    fetchProducts({ color: e.target.value });
  };

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-3 pt-2'>
          <h4 className='text-center'>Search/Filter</h4>
          <hr />

          <Menu mode='inline' defaultOpenKeys={[]}>
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

            {/*brands*/}
            <SubMenu
              key='4'
              title={
                <span className='h6'>
                  <ShopOutlined /> Brand
                </span>
              }
            >
              <div style={{ marginTop: '10px' }} className='pl-4 pr-4 mr-5'>
                {showBrands()}
              </div>
            </SubMenu>

            {/*sub category*/}
            <SubMenu
              key='5'
              title={
                <span className='h6'>
                  <DownSquareOutlined /> Sub-categories
                </span>
              }
            >
              <div style={{ marginTop: '10px' }} className='pl-4 pr-4'>
                {showSubs()}
              </div>
            </SubMenu>

            {/*color*/}
            <SubMenu
              key='6'
              title={
                <span className='h6'>
                  <BgColorsOutlined /> Color
                </span>
              }
            >
              <div style={{ marginTop: '10px' }} className='pl-4 pr-4 mr-5'>
                {showColors()}
              </div>
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
