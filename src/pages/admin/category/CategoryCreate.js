import React, { useEffect, useState } from "react";
import { AdminNav } from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { createCategory, getCategories, removeCategory} from '../../../functions/category'
import { Link } from "react-router-dom";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

export const CategoryCreate = () => {
    const {user} = useSelector((state) => ({...state}));

    const [ name, setName ] = useState('');
    const [ loading, setLoading ] = useState(false);
    const [ categories, setCategories ] = useState([]);

    useEffect(() => {
        loadCategories();
    },[])

    const loadCategories = () => {
        getCategories().then((c) => setCategories(c.data));
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        createCategory({name}, user.token)
        .then(res => {
            setLoading(false);
            setName("");
            toast.success(`${res.data.name} is created`);
            loadCategories();
        }).catch(err => {
            setLoading(false);
            if(err.response.status === 400) toast.error(err.response.data);
        })
    }

    const handleRemove = async (slug) => {
        if(window.confirm("Delete?")) {
            setLoading(true)
            removeCategory(slug,user.token)
            .then(res => {
                setLoading(false);
                toast.error(`${res.data.name} deleted`);
                loadCategories();
            })
            .catch(err => {
                if(err.response.status === 400) {
                    setLoading(false);
                    toast.error(err.response.data);
                }
            })
        }
    }

    const categoryForm = () => (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Name</label>
                <input type="text" className="form-control" onChange={e => setName(e.target.value)} value={name} autoFocus required/>
                <br />
                <button className="btn btn-outline-primary" disabled={loading}>Save</button>
            </div>

        </form>
    )
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className="col">
                    <h4>Create category</h4>
                    {categoryForm()}
                    <hr />
                    {categories.map((c) => (
                        <div className="alert alert-primary" key={c._id}>
                            {c.name} 
                            <span 
                              onClick={() => handleRemove(c.slug)}
                              className="btn btn-sm float-right"
                            >
                                <DeleteOutlined className="text-danger" />
                            </span>
                            <Link to={`/admin/category/${c.slug}`}>
                                <span className="btn btn-sm float-right">
                                    <EditOutlined className="text-primary" /> 
                                </span>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};