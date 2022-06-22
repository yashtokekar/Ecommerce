import React, { useEffect, useState } from "react";
import { AdminNav } from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getProduct } from '../../../functions/product';
import { getCategories, getCategorySubs } from "../../../functions/category";
import { FileUpload } from "../../../components/forms/FileUpload";
import { LoadingOutlined } from '@ant-design/icons';
import { ProductUpdateForm } from "../../../components/forms/ProductUpdateForm";

const initialState = {
    title: '',
    description: '',
    price: '',
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


export const ProductUpdate = ({match}) => {
    // state
    const [values, setValues] = useState(initialState);
    const [subOptions, setSubOptions] = useState([]);
    const [categories, setCategories] = useState([]);
    const [ arrayOfSubIds, setArrayOfSubIds ] = useState([]);
    const [ selectedCategory, setSelectedCategory ] = useState("");
    const [loading, setLoading] = useState(false);

    // user
    const {user} = useSelector((state) => ({ ...state }));
    
    const {slug} = match.params;

    useEffect(() => {
        loadProduct();
        loadCategories();
    }, [])

    const loadProduct = () =>{
        getProduct(slug)
        .then((p) =>{
            setValues({ ...values, ...p.data }); // load single product

            getCategorySubs(p.data.category._id) // load single product category subs 
            .then(res => {
                setSubOptions(res.data)
            });
            let arr = []; // prepare array of sub ids to show as default sub
            p.data.subs.map((s) => {
                arr.push(s._id);
            });
            setArrayOfSubIds((prev) => arr); //required for ant design Select component to work
        });
    };

    const loadCategories = () => {
        getCategories().then((c) => setCategories(c.data));
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        //
    };

    const handleCategoryChange = (e) => {
        e.preventDefault();
        console.log("Clicked Category", e.target.value);
        setValues({...values, subs: [] });

        setSelectedCategory(e.target.value);

        getCategorySubs(e.target.value)
        .then((res) => {
            setSubOptions(res.data);
        });
        if(values.category._id === e.target.value){
            loadProduct();
        }
        setArrayOfSubIds([]);
    }

    const handleChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value })
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>

                <div className="col-md-10">
                {loading ? <LoadingOutlined className="text-danger h1"/> : <h4>Update Product</h4>}
                    <div className="p-3">
                        <FileUpload values={values} setValues={setValues} setLoading={setLoading} />
                    </div>

                    <ProductUpdateForm
                      values={values}
                      setValues={setValues}
                      categories={categories}
                      subOptions={subOptions} 
                      handleSubmit={handleSubmit} 
                      handleChange={handleChange}
                      handleCategoryChange={handleCategoryChange}
                      arrayOfSubIds={arrayOfSubIds}
                      setArrayOfSubIds={setArrayOfSubIds}
                      selectedCategory={selectedCategory}   
                    />

                    <hr />
                </div>
            </div>
        </div>
    )
}