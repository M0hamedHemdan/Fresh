import { useQueries, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export default function CartContextProvider(props) {
  const [datas, setData] = useState([]);
  const headers = {
    token: localStorage.getItem("userToken"),
  };
  const [cartId, setcartId] = useState(0);
  const [numberItems, setnumberItems] = useState(0);
  function addProductToCard(productId) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        {
          productId: productId,
        },
        {
          headers,
        }
      )
      .then((res) => res)
      .catch((err) => err);
  }
  function getLoggedUserCart() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/cart`, { headers })
      .then((res) => {
        // console.log(res.data.numOfCartItems);
        setnumberItems(res.data.numOfCartItems);
        setcartId(res.data.data._id);

        return res;
      })
      .catch((err) => err);
  }

  function DeleteAllCart() {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart`, { headers })
      .then((res) => res)
      .catch((err) => err);
  }
  function updateCartProductQuantity(productId, newCount) {
    return axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { count: newCount },
        { headers }
      )
      .then((res) => res)
      .catch((err) => err);
  }
  function deleteCartItem(productId) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
        headers,
      })
      .then((res) => res)
      .catch((err) => err);
  }
  function posteWishlist(productId) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        { productId: productId },
        { headers }
      )
      .then((res) => res)
      .catch((err) => err);
  }
  function getWishList() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/wishlist`, { headers })
      .then((res) => res)
      .catch((res) => res);
  }
  function DeleteWishList(id) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, {
        headers,
      })
      .then((res) => res)
      .catch((err) => err);
  }

  function getCategories() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then((res) => res)
      .catch((res) => res);
  }

  function getSubCategories(id) {
    return axios.get(
      `https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`
    );
  }

  useEffect(() => {
    getLoggedUserCart();
  }, []);
  function checkout(cartId, url, formData) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,
        {
          shippingAddress: formData,
        },
        { headers }
      )
      .then((res) => res)
      .catch((err) => err);
  }
  // function getId() {
  //   axios.get(
  //     `https://ecommerce.routemisr.com/api/v1/auth/verifyToken`,
  //     {
  //       headers,
  //     }
  //   );
  // }
  // let {data} = useQuery({
  //   queryKey : ["getAllOrser"],
  //   queryFn : getId(),
  //   retry : 2
    
  // })


 
  let { data } = useQuery({
    queryKey: ["getAllOrder"],
    queryFn: () => axios.get("https://ecommerce.routemisr.com/api/v1/auth/verifyToken", { headers }),
    retry: 2,
  });
  
  let userId = data?.data?.decoded?.id;

  async function getUserOrders(Id) {
    await axios
      .get(`https://ecommerce.routemisr.com/api/v1/orders/user/${Id}`)
      .then((res) => setData(res.data))
      .catch((err) => err);
  }

  useEffect(() => {
    if (userId) {
      getUserOrders(userId);
    }
  }, [userId]);

  
  
  

  return (
    <CartContext.Provider
      value={{
        setData,
        datas,
        data,
        getSubCategories,
        getCategories,
        DeleteWishList,
        getWishList,
        posteWishlist,
        checkout,
        addProductToCard,
        getLoggedUserCart,
        DeleteAllCart,
        updateCartProductQuantity,
        deleteCartItem,
        cartId,
        setnumberItems,
        numberItems,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}
