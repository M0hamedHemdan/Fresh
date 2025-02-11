import  { useContext, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';
import { useEffect } from 'react';
import Slider from "react-slick"
import toast from 'react-hot-toast';
import { CartContext } from '../../Context/CartContext';


export default function ProductDetails() {
  const [product , setproduct] = useState([]);
  const [relatedProducts , setrelatedProducts] = useState([])
  const [loding, setloding]= useState(false)
  const {addProductToCard} = useContext(CartContext)

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay:true,
    autoplaySpeed:1000,
    fade: true,
    

  };
  async function addToCart(id) {
    const response = await addProductToCard(id);
    if (response.data.status == "success") {
      // console.log(response.data.status );
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  }

  
  const {id , category} = useParams()
  function getProduct(id) {
    axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    .then((res)=> {
      console.log(res.data.data.category.name);
      
      setproduct(res.data.data)
      setloding(true)
      
    })
    .catch((res)=>{
      console.log(res.data.data);
      setloding(true)
      
    })
  }
  function getAllProduct() {
    axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
    .then((res)=>{
    const related=res.data.data.filter((product) => product.category.name === category)
    console.log(related);
    setrelatedProducts(related)
    
  })
  }
  useEffect(()=>{
    getProduct(id)
    getAllProduct()
  }, [id , category]);
  
  return (
    <>
      <div className="row items-center">
        {loding?<>
        <div className='md:w-1/4 w-full '>
          <Slider {...settings}>
            {product.images.map((src) => <img src={src} className='w-full' alt={product?.title} />)}
          </Slider> 
         
        </div>
        <div className='md:w-3/4 p-4'>
          <h3 className='font-semibold capitalize text-2xl'>{product?.title}</h3>
          <h4 className='text-gray-700 my-4'>{product?.description}</h4>
          <h4>{product?.category?.name}</h4>
          <div className='flex justify-between p-3 my-5'>
                <span>{product?.price} EGP</span>
                <span> <i className='fas fa-star text-yellow-400'></i>{product?.ratingsAverage}</span>
          </div>
          <button onClick={() => addToCart(product.id)} className='btn bg-emerald-700 w-full'>Add To Cart</button>
         
          
        </div></>:<span className="loader  mx-auto mt-[15%]"></span>}
      </div>
      <div className="row">
      {relatedProducts.length > 0 ? relatedProducts.map( (product)=> (
        <div key={product.id} className='sm:w-1/2 md:w-1/3 lg:w-1/6'>
          
            <div className="product my-2 p-2">
            <Link to={`/productdetails/${product.id}/${product.category.name}`} >
              <img src={product.imageCover} className='w-full' alt="" />
              <h3 className=' text-emerald-600'>{product.category.name}</h3>
              <h3 className='font-semibold mb-1'>{product.title.split(" ").slice(0,2).join(" ")}</h3>

              <div className='flex justify-between p-3'>
                <span>{product.price} EGP</span>
                <span> <i className='fas fa-star text-yellow-400'></i>{product.ratingsAverage}</span>
              </div>
              </Link>
              <button className='btn'>Add To Cart</button>
            </div>
          
        </div>
        
        
        ) ):null
      }
      </div>
    </>
  )
}
