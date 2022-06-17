import React, { useEffect, useState } from "react";
import { AdminNav } from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { createProduct } from '../../../functions/product';
import { ProductCreateForm } from "../../../components/forms/ProductCreateForm";
import { getCategories, getCategorySubs } from "../../../functions/category";
import { FileUpload } from "../../../components/forms/FileUpload";
import { LoadingOutlined } from '@ant-design/icons'

const initialState = {
    title: '',
    description: '',
    price: '',
    categories: '',
    category: '',
    subs: [],
    shipping: '',
    quantity: "",
    images: [],
    colors: ["Black", "Brown", "Silver", "White", "Blue" ],
    brands: ["Samsung", "Apple", "Xiaomi", "Oppo", "Vivo","Asus", "Acer", "HP", "Dell", "Sony","LG"],
    color: "",
    brand: "",
}


export const ProductCreate = () => {
    const [values, setValues] = useState(initialState);
    const {user} = useSelector((state) => ({...state}));
    const [subOptions, setSubOptions] = useState([]);
    const [showSub, setShowSub] = useState(false);
    const [loading, setLoading] = useState(false);
    

    useEffect(() => {
        loadCategories();
    },[]);

    const loadCategories = () => {
        getCategories().then((c) => setValues({...values, categories: c.data}));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        createProduct(values, user.token)
        .then(res => {
            console.log(res);
            window.alert(`${res.data.title} is created`);
            window.location.reload();
        })
        .catch(err => {
            console.log(err);
            toast.error(err.response.data.err);
        });
    }
    const handleChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value })
    }

    const handleCategoryChange = (e) => {
        e.preventDefault();
        // console.log("Clicked Category", e.target.value);
        setValues({...values, subs: [], category: e.target.value });
        getCategorySubs(e.target.value)
        .then((res) => {
            setSubOptions(res.data);
        });
        setShowSub(true);
    }
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>

                <div className="col-md-10">
                    {loading ? <LoadingOutlined className="text-danger h1"/> : <h4>Create Product</h4>}
                    <hr />

                    {JSON.stringify(values.images)}

                    <div className="p-3">
                        <FileUpload values={values} setValues={setValues} setLoading={setLoading} />
                    </div>

                    <ProductCreateForm 
                      values={values}
                      setValues={setValues} 
                      handleSubmit={handleSubmit} 
                      handleChange={handleChange} 
                      handleCategoryChange={handleCategoryChange} 
                      subOptions={subOptions}
                      showSub={showSub}
                    />
                </div>
            </div>
        </div>
    )
}