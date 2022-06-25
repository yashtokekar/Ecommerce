import React from 'react';
import { Card } from 'antd';
import { EyeOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import image from '../../images/default-image.png';
import { Link } from 'react-router-dom';

const { Meta } = Card;

export const ProductCard = ({ product }) => {
  const { title, description, images, slug } = product;
  return (
    <Card
      style={{ width: 330 }}
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
        <>
          <ShoppingCartOutlined className='text-danger' />
          <br /> Add to Cart
        </>,
      ]}
    >
      <Meta
        title={title}
        description={`${description && description.substring(0, 40)}...`}
      ></Meta>
    </Card>
  );
};
