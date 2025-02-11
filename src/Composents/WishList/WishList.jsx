import { useContext, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";

export default function WishList() {
  // const [call, setcall] = useState([]);
  const [loading, setloading] = useState(false);
  const [currentId, setcurrentId] = useState(0);
  const {
    addProductToCard,
    DeleteWishList,
    getWishList,
    setnumberItems,
    numberItems,
  } = useContext(CartContext);

  async function addToCart(id) {
    setcurrentId(id);
    setloading(true);
    const response = await addProductToCard(id);
    if (response.data.status == "success") {
      toast.success(response.data.message);
      
      setnumberItems(numberItems + 1);
      setloading(false);
    } else {
      toast.error(response.data.message);
      setloading(false);
    }
  }

  async function apiWish() {
    let res = await getWishList();

    if (res.data.status == "success") {
      console.log(res?.data.data);

      return res?.data.data;

      // setcall(res?.data.data);
      // console.log(res.data.data);
    }
  }
  async function deleteItem(id) {
    await DeleteWishList(id);
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    const updatedWishlist = storedWishlist.filter((item) => item !== id);

    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));

    // if(id === updatedWishlist){

    // }
    refetch();

    toast.success("Item removed from wishlist!");
    // refetch(data.filter((call) => call.id !== id));

    // localStorage.removeItem("wishlist")
  }

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["wishList"],
    queryFn: apiWish,
  });

  if (isLoading) {
    return (
      <p className="text-center text-gray-700 font-semibold text-2xl py-10">
        Loading...
      </p>
    );
  }

  // useEffect(() => {
  //   apiWish();
  // }, []);

  return (
    <>
      <div className="relative  overflow-res-auto shadow-md sm:rounded-lg">
        <h2 className="text-3xl font-semibold my-9 text-center">
          My wish List
        </h2>
        {data.length > 0 ? (
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className=" hidden md:table-header-group text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-16 py-3">
                  <span className="sr-only">Image</span>
                </th>
                <th scope="col" className="px-6 py-3">
                  Product
                </th>

                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
                <th scope="col" className="px-6 py-3">
                  add
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((data) => (
                <>
                  {
                    <tr
                      key={data.id}
                      className=" bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <td className="p-4 block   text-center md:table-cell md:w-1/5">
                        <img
                          src={data.imageCover}
                          className="w-3/4 mx-auto md:w-32 max-w-full max-h-full"
                          alt={data.title}
                        />
                      </td>
                      <td className="p-4 block   text-center md:table-cell px-6 py-4 font-semibold text-gray-900 dark:text-white">
                        {data.title}
                      </td>

                      <td className="p-4 block   text-center md:table-cell px-6 py-4 font-semibold text-gray-900 dark:text-white">
                        {data.price}
                      </td>
                      <td className="p-4 block   text-center md:table-cell px-6 py-4">
                        <span
                          onClick={() => deleteItem(data.id)}
                          className="font-medium text-red-600 dark:text-red-500 hover:underline cursor-grab"
                        >
                          Remove
                        </span>
                      </td>
                      <td className="p-4 block   text-center md:table-cell px-6 py-4">
                        <span
                          onClick={() => addToCart(data.id)}
                          className="font-medium text-emerald-600 dark:text-red-500 hover:underline cursor-grab"
                        >
                          {loading && currentId === data.id ? (
                            <i className="fas fa-spinner fa-spin"></i>
                          ) : (
                            "ADD Cart"
                          )}
                          
                        </span>
                      </td>
                    </tr>
                  }
                </>
              ))}
            </tbody>
          </table>
        ) : (
          <h3 className="text-center text-gray-700 font-semibold text-2xl py-10">
            Your wishlist is empty <i className="fa-solid fa-face-sad-tear"></i>
          </h3>
        )}
      </div>
    </>
  );
}
