// import React, { useEffect, useState } from 'react'
// import style from './RecentProducts.module.css'
// import axios from 'axios'
import { Link } from "react-router-dom";
import useProducts from "../../Hooks/useProducts";
import { useContext, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";

export default function RecentProducts() {
  const { data, error, isError, isLoading } = useProducts();
  const [loading, setloading] = useState(false);
  const [currentId, setcurrentId] = useState(0);
  const [wishlist, setWishlist] = useState(
    JSON.parse(localStorage.getItem("wishlist")) || []
  );
  const {
    DeleteWishList,
    posteWishlist,
    addProductToCard,
    setnumberItems,
    numberItems,
  } = useContext(CartContext);

  async function addToCart(id) {
    setcurrentId(id);
    setloading(true);
    const response = await addProductToCard(id);
    if (response.data.status == "success") {
      setnumberItems(numberItems + 1);
      // console.log(response.data.status );
      toast.success(response.data.message);
      setloading(false);
    } else {
      toast.error(response.data.message);
      setloading(false);
    }
  }
  async function addWish(id) {
    // setid(id);
    const response = await posteWishlist(id);

    if (response.data.status == "success") {
      let updatedWishlist;
      if (wishlist.includes(id)) {
        // DeleteWishList(id)
        updatedWishlist = wishlist.filter((item) => item !== id);
      } else {
        updatedWishlist = [...wishlist, id];
      }
      setWishlist(updatedWishlist);
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
      toast.success(response.data.status);

      console.log(response);
    }
  }

  if (isError) {
    return <h3>{error}</h3>;
  }
  if (isLoading) {
    return <div className="loader  mx-auto mt-[15%]"></div>;
  }

  // const [products, setproducts] = useState([]);
  // function getProducts() {
  //   axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
  //   .then((res)=>{
  //     setproducts(res.data.data)
  //   })
  //   .catch((res)=>{console.log(res);
  //   })
  // }
  // useEffect(()=>{
  //   getProducts()
  // }, [])
  return (
    <>
      <div className="row">
        {data.data.data.map((product) => (
          <div
            key={product.id}
            className="sm:w-1/2 md:w-1/3 lg:w-1/6 overflow-hidden mb-4"
          >
            <div className="product my-2 p-2">
              <Link
                to={`productdetails/${product.id}/${product.category.name}`}
              >
                <img src={product.imageCover} className="w-full" alt="" />
                <h3 className=" text-emerald-600">{product.category.name}</h3>
                <h3 className="font-semibold mb-1">
                  {product.title.split(" ").slice(0, 2).join(" ")}
                </h3>

                <div className="flex justify-between p-3">
                  <span>{product.price} EGP</span>
                  <span>
                    {" "}
                    <i className="fas fa-star text-yellow-400"></i>
                    {product.ratingsAverage}
                  </span>
                </div>
              </Link>
              <button
                onClick={() => {
                  if (wishlist.includes(product.id)) {
                    DeleteWishList(product.id);
                    setWishlist(wishlist.filter((item) => item !== product.id));
                    JSON.parse(localStorage.removeItem("wishlist")) 
                  } else {
                    addWish(product.id);
                    setWishlist([product.id, ...wishlist]);
                  }
                  // addWish(product.id);
                  localStorage.setItem("wishlist", JSON.stringify(wishlist));
                }}
              >
                <i
                  className={`fa-solid fa-heart text-3xl mb-4 ${
                    wishlist.includes(product.id) ? "text-red-600" : ""
                  }`}
                />
              </button>
              <button
                onClick={() => addToCart(product.id)}
                className="btn bg-emerald-700 w-full"
              >
                {loading && currentId === product.id ? (
                  <i className="fas fa-spinner fa-spin"></i>
                ) : (
                  "Add To Cart"
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
