
import { Link } from "react-router-dom";
import useProducts from "../../Hooks/useProducts";
import toast from "react-hot-toast";
import { CartContext } from "../../Context/CartContext";
import { useContext, useState } from "react";

export default function Products() {
  const { data, error, isError, isLoading } = useProducts();
  const { posteWishlist ,DeleteWishList } = useContext(CartContext);
  const [text , setText] = useState("");
  const handleChange = (event) => {
    setText(event.target.value.toLowerCase())
   
    
  }

  const [wishlist, setWishlist] = useState(
    JSON.parse(localStorage.getItem("wishlist")) || []
  );

  async function addWish(id) {
    // setid(id);
    const response = await posteWishlist(id);

    if (response.data.status == "success") {
      let updatedWishlist;
      if (wishlist.includes(id)) {
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
  const filteredProducts = data.data.data.filter((product) =>
    product.title.toLowerCase().includes(text)
  );
  return (
    <>
      <input
      onChange={handleChange}
        type="text"
        value={text}
        id="search"
        className="mt-20 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Search...."
        required
      />

      <div className="row">
       
        {filteredProducts.map((product) => (
          <div key={product.id} className="sm:w-1/2 md:w-1/3 lg:w-1/6">
            <div className="product my-2 p-2">
              <Link
                to={`/productdetails/${product.id}/${product.category.name}`}
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
              <button onClick={() => {
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
                }}>
                <i
                  className={`fa-solid fa-heart text-3xl mb-4 ${
                    wishlist.includes(product.id) ? "text-red-600" : ""
                  }`}
                />
              </button>
              <button className="btn">Add To Cart</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
