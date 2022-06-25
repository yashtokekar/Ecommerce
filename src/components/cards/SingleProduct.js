import React from "react";
import {Card} from 'antd';
import {Link} from 'react-router-dom';
import { HeartOutlined, ShoppingCartOutlined} from '@ant-design/icons';

const {Meta} = Card;

export const SingleProduct = ({ product }) => {
    const { title, image, description, slug } = product;
    return (
        <>
            <div className="col-md-7">Image Carousel</div>
            <div className="col-md-5">
                <Card
                    actions={[
                        <>
                          <ShoppingCartOutlined className="text-success" /> <br />
                          Add to Cart
                        </>,
                        <Link to="/">
                            <HeartOutlined className="text-info" /> <br />
                            Add to Wishlist
                        </Link>,
                    ]}
                >
                    <Meta title={title} description={description} />
                    <p>
                        price/category/subs/shipping/color/brand/quantity available/sold
                    </p>
                </Card>
            </div>
        </>
    )
}