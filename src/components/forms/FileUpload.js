import React from 'react';
import Resizer from 'react-image-file-resizer';
import axios from  'axios';
import { useSelector } from 'react-redux';
import { Avatar, Badge } from 'antd';

export const FileUpload = ({values, setValues, setLoading}) => {
    const {user} = useSelector((state) => ({...state }));

    const fileUploadaAndResize = (e) => {
        // resize
        let files = e.target.files;
        let allUploadedFiles = values.images;
        if(files) {
            setLoading(true);
            for(let i = 0; i < files.length; i++) {
                Resizer.imageFileResizer(files[i], 720, 720, "JPEG", 100, 0, (uri) => {
                    // console.log(uri);
                    axios.post(`${process.env.REACT_APP_API}/uploadimages`, {image: uri}, {
                        headers: {
                            authtoken: user ? user.token : "",
                        }
                    }).then(res => {
                        console.log("Image upload res data", res);
                        setLoading(false);
                        allUploadedFiles.push(res.data);

                        setValues({...values, images: allUploadedFiles });
                    }).catch(err => {
                        setLoading(false);
                        console.log(`Cloudinary Upload error`,err);
                    })
                }, "base64");
            }
        }
        // send back to server to uploa to cloudinary
        // set url to images[] in the parent component state - ProductCreate
    }

    const handleImageRemove = (public_id) => {
        setLoading(true);
        // console.log('remove image' ,id);
        axios.post(`${process.env.REACT_APP_API}/removeimage`, {public_id}, {
            headers: {
                authtoken: user ? user.token : "",
            },
        })
        .then((res) => {
            setLoading(false);
            const {images} = values;
            let filteredImages = images.filter((item) => {
                return item.public_id !== public_id;
            });
            setValues({...values, images: filteredImages});
        })
        .catch((err) => {
            console.log(err);
            setLoading(false);
        })
    }
   
   return (
    <>
        <div className="container-fluid" style={{width: "auto"}} >
            {values.images && values.images.map((image) => (
                <span className="avatar-item col-md-6" key={image.public_id}>
                    <Badge count="X" style={{ cursor: "pointer" }} onClick={ () => handleImageRemove(image.public_id) }>
                        <Avatar src={image.url} shape="square" size={100} className='ml-3 mb-3'/>
                    </Badge>
                </span>
            ))} 
        </div>
        <br />
        <div className="row">
            <label className='btn btn-primary btn-raised'>Choose File
                <input type="file" multiple hidden accept='images/*' onChange={fileUploadaAndResize}/>
            </label>
        </div>

    </>
    
   )
    
}