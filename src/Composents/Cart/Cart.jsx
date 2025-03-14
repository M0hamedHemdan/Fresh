import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function Cart() {
  const navigate = useNavigate();
  const [CartDetails, setCartDetails] = useState(null);
  const {
    DeleteAllCart,
    getLoggedUserCart,
    updateCartProductQuantity,
    deleteCartItem,
    setnumberItems,
    numberItems,
  } = useContext(CartContext);

  async function DeleteAll() {
    const response = await DeleteAllCart();
    if (response?.data.message) {
      navigate("/");
      toast.success("");
    } else {
      toast.error("");
    }
  }

  async function getCartItems() {
    const response = await getLoggedUserCart();

    if (response.data.status === "success") {
      setCartDetails(response.data.data);
    }
  }

  async function updateProduct(id, count) {
    const response = await updateCartProductQuantity(id, count);

    if (response.data.status === "success") {
      setCartDetails(response.data.data);
      toast.success("");
    } else toast.error("");
  }

  async function deleteItem(productId) {
    const response = await deleteCartItem(productId);
    if (response?.data.status === "success") {
      setnumberItems(numberItems - 1);
      setCartDetails(response.data.data);
      toast.success(" ");
    } else {
      toast.error("");
    }
  }

  useEffect(() => {
    getCartItems();
  }, []);
  return (
    <>
      {CartDetails?.products.length > 0 ? (
        <>
          {/* {CartDetails.products.map((product)=>)} */}

          <h2 className="text-center text-2xl text-emerald-600 font-bold capitalize m-4">
            total price:{CartDetails?.totalCartPrice}
          </h2>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs hidden md:table-header-group text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-16 py-3">
                    <span className="sr-only">Image</span>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Product
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Qty
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {CartDetails?.products.map((product) => (
                  <tr
                    key={product.product.id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="p-4 block   text-center md:table-cell md:w-1/5">
                      <img
                        src={product?.product?.imageCover}
                        className="w-3/4 mx-auto md:w-32 max-w-full max-h-full"
                        alt="Apple Watch"
                      />
                    </td>
                    <td className="block   text-center md:table-cell  px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {product?.product.title}
                    </td>
                    <td className="px-6 py-4 block  md:table-cell  text-center">
                      <div className="flex justify-center items-center">
                        <button
                          onClick={() =>
                            updateProduct(product.product.id, product.count - 1)
                          }
                          className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                          type="button"
                        >
                          <span className="sr-only">Quantity button</span>
                          <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 18 2"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M1 1h16"
                            />
                          </svg>
                        </button>
                        <div>
                          <span>{product?.count}</span>
                        </div>
                        <button
                          onClick={() =>
                            updateProduct(product.product.id, product.count + 1)
                          }
                          className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                          type="button"
                        >
                          <span className="sr-only">Quantity button</span>
                          <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 18 18"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 1v16M1 9h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                    <td className="block   text-center md:table-cell px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {product?.price * product?.count}
                    </td>
                    <td className="block   text-center md:table-cell px-6 py-4">
                      <span
                        onClick={() => deleteItem(product.product.id)}
                        className="cursor-pointer font-medium text-red-600 dark:text-red-500 hover:underline"
                      >
                        Remove
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between align-middle w-2/5 mx-auto">
            <Link to={"/checkout"}>
              <button className="btn my-3 bg-emerald-600">Checkout</button>
            </Link>
            <button onClick={() => DeleteAll()} className="btn my-3 bg-red-600">
              Remove
            </button>
          </div>
        </>
      ) : (
        <h1 className="text-3xl text-red-800 font-bold text-center my-8 capitalize">
          there is not items show
        </h1>
      )}
    </>
  );
}
