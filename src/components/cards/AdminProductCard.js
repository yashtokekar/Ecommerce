import React from 'react';
import { Card } from 'antd'

const { Meta } = Card;

export const AdminProductCard = ({ product }) => {
    const { title, description, images } = product;

    return <Card cover={
        <img 
          src={images && images.length ? images[0].url : ""}  
          style={{ height: "150px", objectFit: "cover" }} />
    }>
        <Meta title={title} description={description}></Meta>
    </Card>
}