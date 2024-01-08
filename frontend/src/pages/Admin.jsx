import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "../Providers/CartProvider";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Admin() {
  const [modal, setModal] = useState(false);
  const [editingProductId, setEditingProductId] = useState(false);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  const [nameModal, setNameModal] = useState("");
  const [priceModal, setPriceModal] = useState("");
  const [imageModal, setImageModal] = useState("");
  const [products, setProducts] = useState(null);
  const [loader, setLoader] = useState(null);
  const [update, setUpdate] = useState(null);

  const [side, setSide] = useState(false)
  const navigate = useNavigate();

  const { user } = useContext(CartContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoader(true);
        const token = localStorage.getItem("jwt");

        const response = await axios.get("http://localhost:5001/api/product", {
          headers: {
            Authorization: token,
          },
        });

        setProducts(response.data);
        setUpdate(!update);
      } catch (error) {
        navigate("/login");
        console.log(error);
      } finally {
        setLoader(false);
      }
    };

    fetchData();
  }, [update]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("jwt");

    try {
      const response = await axios.post(
        "http://localhost:5001/api/product",
        {
          name,
          price,
          image,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }

    setName("");
    setPrice("");
    setImage("");
    setUpdate(!update);
  };

  const handleDeleteProduct = async (id) => {
    try {
      const token = localStorage.getItem("jwt");

      const response = await axios.delete(
        `http://localhost:5001/api/product/${id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
  const handleEditProduct = async(id) => {
    const token = localStorage.getItem("jwt");
    const response = await axios.get(`http://localhost:5001/api/product/${id}`,{headers: {Authorization:token}})
    const productToEdit = response.data

    // Set state to populate the modal with product data
    setEditingProductId(id);
    setNameModal(productToEdit.name);
    setPriceModal(productToEdit.price);
    setImageModal(productToEdit.image);

    // Open the modal
    setModal(true);
  };
  
  const handleUpdate =async () =>{
    const token = localStorage.getItem("jwt");
    const updated = {name:nameModal, price:priceModal, image:imageModal}
    const response = await axios.put(`http://localhost:5001/api/product/${editingProductId}`,{updated},{headers: {Authorization:token}})
    setModal(false);
  }
const handleSide = () =>{
  setSide(!side)
  console.log("clikc")
}

  return (
    <div>

{modal &&
    <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">

<div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

<div className="fixed inset-0 z-10 w-screen overflow-y-auto">
  <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
   
    <div className="relative transform overflow-hidden rounded-lg bg-gray-200 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
      <div className="bg-gray-300 px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
        <div className="sm:flex sm:items-start">
          
          <div className="w-full mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
            <h3 className="text-base font-semibold leading-6 text-gray-900" id="modal-title">Update product</h3>
            <div className="mt-2 w-full">
            <div className="bg-white p-4 rounded shadow w-full">
            <form onSubmit={handleSubmit} className="flex flex-col w-full" action="">
              <label htmlFor="name">Product name</label>
              <input
                onChange={(e) => setNameModal(e.target.value)}
                value={nameModal}
                type="text"
                className="border p-2 mb-2"
                id="name"
                name="name"
                required
              />
              <label htmlFor="price">Product price</label>
              <input
                onChange={(e) => setPriceModal(e.target.value)}
                value={priceModal}
                type="text"
                className="border p-2 mb-2"
                id="price"
                name="price"
                required
              />
              <label htmlFor="image">Product image</label>
              <input
                onChange={(e) => setImageModal(e.target.value)}
                value={imageModal}
                type="text"
                className="border p-2 mb-2"
                id="image"
                name="image"
                required
              />
             
            </form>
          </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-300 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
        <button onClick={handleUpdate} type="button" className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto">Update</button>
        <button onClick={()=>setModal(!modal)} type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Cancel</button>
      </div>
    </div>
  </div>
</div>
</div>

}






      <div className="flex bg-gray-200">
        <div className={`sm:w-1/2 ${!side ? "w-1/3": "w-1/7"} bg-gray-800`}>
          {/* Sol menü */}
          <div onClick={handleSide} className="row">{side ? <i className="text-white bg-gray-500 p-2 fa-solid fa-arrow-right"></i>
        :<i className="fa-solid fa-arrow-left text-white bg-gray-500 p-2"></i>  
        }</div>
          <div className={`text-white p-4 font-bold text-2xl sm:block ${side ? "hidden": ""} `}>Admin Panel</div>
          <ul className={`p-2 space-y-2 sm:block ${side ? "hidden": ""}`} >
            <li className="hover:bg-gray-700 text-white font-semibold p-2">
              Product
            </li>
            <li className="hover:bg-gray-700 text-white font-semibold p-2">
              User
            </li>
          </ul>
        </div>
        <div className={`mx-4 sm:w-1/2 ${side ? "w-full": "w-2/4"}`}>
          {/* İçerik */}
          <h2 className="text-2xl font-bold">Add Product</h2>
          <div className="bg-white p-4 rounded shadow">
            <form onSubmit={handleSubmit} className="flex flex-col" action="">
              <label htmlFor="name">Product name</label>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                className="border p-2 mb-2"
                id="name"
                name="name"
                required
              />
              <label htmlFor="price">Product price</label>
              <input
                onChange={(e) => setPrice(e.target.value)}
                value={price}
                type="text"
                className="border p-2 mb-2"
                id="price"
                name="price"
                required
              />
              <label htmlFor="image">Product image</label>
              <input
                onChange={(e) => setImage(e.target.value)}
                value={image}
                type="text"
                className="border p-2 mb-2"
                id="image"
                name="image"
                required
              />
              <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded"
              >
                Add Product
              </button>
            </form>
          </div>
          <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
          <div className="productList flex flex-wrap m-4 mb-3">
            {products &&
              products.map((pro, id) => (
                <div key={id} className="w-full sm:w-1/2 lg:w-1/3 p-1 sm:p-4">
                  <div className="bg-white p-4 rounded shadow relative">
                    <h1 className="text-lg font-bold my-2">{pro.name}</h1>
                    <p className="text-gray-700 mb-2">${pro.price}</p>

                    <button
                      onClick={() => handleDeleteProduct(pro._id)}
                      className="absolute top-2 right-2 text-red-500"
                    >
                      <i className="fas fa-trash-alt"></i>
                    </button>
                    <button
                      onClick={()=>handleEditProduct(pro._id)}
                      className="text-blue-400 absolute top-2 right-6"
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                  </div>
                </div>
              ))}
          </div>
          
        </div>
      </div>
    </div>
  );
}
