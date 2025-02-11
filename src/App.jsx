
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Layout from './Composents/Layout/Layout'
import Home from './Composents/Home/Home'
import Products from './Composents/Products/Products'
import Cart from './Composents/Cart/Cart'
import Brands from './Composents/Brands/Brands'
import Categories from './Composents/Categories/Categories'
import Login from './Composents/Login/Login'
import Register from './Composents/Register/Register'
import Notfound from './Composents/Notfound/Notfound'
import CounterContextProvider from './Context/CounterContext'
import UserContextProvider from './Context/UserContext'
import ProtectedRoute from './Composents/ProtectedRoute/ProtectedRoute'
import ProductDetails from './Composents/ProductDetails/ProductDetails'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import CartContextProvider from './Context/CartContext'
import  toast, { Toaster } from 'react-hot-toast';
import Checkout from './Composents/Checkout/Checkout'
import Allorders from './Composents/Allorders/Allorders'
import WishList from './Composents/WishList/WishList'
import Orderdetails from './Composents/Orderdetails/Orderdetails'
import { useEffect, useState } from 'react'


const query = new QueryClient()




const x = createBrowserRouter([
  {
    path: "",
    element: <Layout/>,
    children:[
      {index : true , element : <ProtectedRoute><Home/></ProtectedRoute>},
      {path : "products" , element :<ProtectedRoute><Products/></ProtectedRoute> },
      {path : "cart" , element : <ProtectedRoute><Cart/></ProtectedRoute>},
      {path : "brands" , element : <ProtectedRoute><Brands/></ProtectedRoute>},
      {path : "productdetails/:id/:category" , element : <ProtectedRoute><ProductDetails/></ProtectedRoute>},
      {path : "categories" , element : <ProtectedRoute><Categories/></ProtectedRoute>},
      {path : "wishList" , element : <ProtectedRoute><WishList/></ProtectedRoute>},
      {path : "checkout" , element : <ProtectedRoute><Checkout/></ProtectedRoute>},
      {path : "allorders" , element : <ProtectedRoute><Allorders/></ProtectedRoute>},
      {path : "orderDetails/:id" , element : <ProtectedRoute><Orderdetails/></ProtectedRoute>},
      {path : "login" , element : <Login/>},
      {path : "register" , element : <Register/>},
      {path : "*" , element : <Notfound/>},
    ]
  }
])
function App() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      toast.success('تم استعادة الاتصال بالإنترنت ✅');
    };
    const handleOffline = () => {
      setIsOnline(false);
      toast.error('أنت غير متصل بالإنترنت ❌');
    };
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    
    <>
    {!isOnline ? (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100%', 
          backgroundColor: 'red', color: 'white', textAlign: 'center', 
          padding: '10px', fontSize: '18px', fontWeight: 'bold'
        }}>
            There is no internet connection.<i className="fa-solid fa-globe"></i>
        </div>
      ):
    <UserContextProvider>
      <CounterContextProvider>
        <QueryClientProvider client={query}>
          <CartContextProvider>
            <RouterProvider router={x}></RouterProvider>
            <Toaster/>
          </CartContextProvider>
          <ReactQueryDevtools/>
        </QueryClientProvider>
      </CounterContextProvider>
    </UserContextProvider>
    
    }
    </>
  )
}

export default App
