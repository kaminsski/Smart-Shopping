import React, { useContext, useEffect, useState } from 'react'
import ProductItem from './ProductItem.jsx'
import { CartContext } from '../Providers/CartProvider.jsx'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./Products.css";



export default function Products() {
  const[loader, setLoader]= useState(null)
  const{products, setProducts} = useContext(CartContext)
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoader(true)
        const token = localStorage.getItem('jwt');

        const response = await axios.get("http://localhost:5001/api/product", {
          headers: {
            Authorization: token,
          },
        });

        setProducts(response.data);
      } catch (error) {
        navigate("/login")
        console.log( error);
      }finally{
        setLoader(false)
      }
    };

    fetchData();
  }, [setProducts]);


  

  return (
    <div className=''>
      <h2 className=' text-4xl font-bold text-center my-5'>Products</h2>
      {loader && (<div className="flex justify-center h-80 lds-circle items-center"><div></div></div>)}
      <div className="productsContainer flex flex-wrap m-auto justify-center gap-10">
        {products.map((product)=>
            <ProductItem key={product._id} product={product}></ProductItem> 
        )}
      </div>
    </div>
  )
}
