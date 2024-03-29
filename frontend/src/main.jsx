import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import MainLayout from './Layouts/MainLayout.jsx'
import  { BrowserRouter } from "react-router-dom"
import CartProvider from './Providers/CartProvider.jsx'
import { Layout } from './Layouts/Layout'
ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <CartProvider>
    <Layout>
    <App />
    </Layout>
    </CartProvider>
    </BrowserRouter>
  ,
)
