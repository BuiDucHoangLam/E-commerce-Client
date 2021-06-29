import React, { useEffect, useState } from 'react'
import AdminNav from '../../component/nav/AdminNav'
import { useSelector } from 'react-redux'
import { createProduct } from '../../functions/product'
import { toast } from 'react-toastify'
import {EditOutlined,DeleteOutlined} from '@ant-design/icons'
import { Link } from 'react-router-dom'

const initialState = {
  title:'Macbook PRO',
  description:'Macbook from Apple',
  price:'4000',
  categories:[],
  category:'',
  subs:[],
  shipping:'Yes',
  quantity:'40',
  images:[],
  colors:['Black','Brown','Silver','White','Blue'],
  brands:['Apple','Samsung','Microsoft','ASUS','Lenovo'],
  color:'Black',
  brand:'Apple',
}

const ProductCreate = () => {
  const [values,setValues] = useState(initialState)
  // restructure
  const {
    title,
    description,
    price,
    category,
    sub,
    shipping,
    quantity,
    images,
    colors,
    brands,
    // color,
    // brand,
  } = values

  const {user} = useSelector(state => ({...state}))

  const handleSubmit = e => {
    e.preventDefault()
    createProduct(values,user.token)
    .then(res=>{
      console.log(res);
      toast.success(`${title} has been created!`)
      window.alert(`${title} has been created!`)
      window.location.reload()
    })
    .catch(err=>{
      console.log(err);
      // if(err.response.status === 400) toast.error(err.response.data)
      toast.error(err.response.data.error)
    })
  }

  const handleChange = e => {
    setValues({...values,[e.target.name]:e.target.value })
    
  }

  return (
    <div className ="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-10">
          <h4 >Product Create</h4>
          <hr />
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Title</label>
              <input 
                type="text" 
                name='title' 
                className='form-control' 
                value= {title}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <input 
                type="text" 
                name='description' 
                className='form-control' 
                value= {description}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Price</label>
              <input 
                type="number" 
                name='price' 
                className='form-control' 
                value= {price}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Shipping</label>
              <select 
                name="shipping" 
                className='form-control' 
                onChange = {handleChange}
              >
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </select>
            </div>
            <div className="form-group">
              <label>Quantity</label>
              <input 
                type="number" 
                name='quantity' 
                className='form-control' 
                value= {quantity}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Color</label>
              <select 
                name="color" 
                className='form-control' 
                onChange = {handleChange}
              >
                <option >Please select</option>
                {colors.map(c=>
                  <option key={c} value = {c}>
                    {c}
                  </option>
                  )}
              </select>
            </div>
            <div className="form-group">
              <label>Brand</label>
              <select 
                name="brand" 
                className='form-control' 
                onChange = {handleChange}
              >
                <option>Please select</option>
                {brands.map(b=>
                  <option key={b} value = {b}>
                    {b}
                  </option>
                  )}
              </select>
            </div>
              <br />
            <button className="btn btn-outline-info">
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ProductCreate
