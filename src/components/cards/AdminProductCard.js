import React from 'react';
import { Card } from 'antd';
import image from '../../images/default-image.png';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const { Meta } = Card;

export const AdminProductCard = ({ product }) => {
    const { title, description, images } = product;

    return <Card  cover={
        <img 
          src={images && images.length ? images[0].url : image}  
          style={{ height: "150px", objectFit: "cover" }}
          className="p-1" />
    }
    actions={[<EditOutlined className='text-warning' />, <DeleteOutlined className='text-danger' /> ]}
    >
        <Meta title={title} description={`${description && description.substring(0,40)}...`}></Meta>
    </Card>
}