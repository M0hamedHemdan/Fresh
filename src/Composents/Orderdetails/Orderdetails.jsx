import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function Orderdetails() {
  const navigate = useNavigate()
  const { id } = useParams();
  console.log(id);

  const { data } = useContext(CartContext);
  const [datas, setData] = useState([]);
  // const [Itimes, setItimes] = useState([]);
  let userId = data?.data?.decoded?.id;
  let foundItem = datas.find((item) => item._id == id);
  console.log(foundItem);

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
  console.log(datas);
  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="block  w-4/5 mx-auto md:flex justify-around items-center py-12">
          <div className="mb-4">
            <p className="text-lg font-semibold ">
              Order ID:{" "}
              <span className=" font-normal text-green-600">
                {foundItem?.id}
              </span>
            </p>
            <p className="text-lg font-semibold">
              Total Payment Price :{" "}
              <span className=" font-normal text-green-600">
                {foundItem?.totalOrderPrice} EGP
              </span>
            </p>
            <p className="text-lg font-semibold">
              Payment Method: <span></span>
            </p>
            <span className="text-lg font-semibold ">
              {foundItem?.updatedAt}
            </span>
          </div>
          <div className="mb-4">
            <p className="text-lg font-semibold">
              Address Info <i className="fa-solid fa-location-dot"></i>
            </p>
            <p className=" text-lg text-gray-700">
              Address Details:{" "}
              <span className="text-black">
                {foundItem?.shippingAddress?.details}
              </span>
            </p>
            <p className="text-lg text-gray-700">
              City:{" "}
              <span className="text-black">
                {foundItem?.shippingAddress?.city}
              </span>
            </p>
            <p className="text-lg text-gray-700">
              Phone:{" "}
              <span className="text-black">
                {foundItem?.shippingAddress?.phone}
              </span>
            </p>
          </div>
          <div>
            <p className="text-lg font-semibold">
              Customer Info <i className="fa-solid fa-circle-user" />
            </p>
            <p className="text-lg text-gray-700">
              Name : <span className="text-black">{foundItem?.user?.name}</span>
            </p>
            <p className="text-lg text-gray-700">
              Email :{" "}
              <span className="text-black">{foundItem?.user?.email}</span>
            </p>
            <p className="text-lg text-gray-700">
              Phone:{" "}
              <span className="text-black">{foundItem?.user?.phone}</span>
            </p>
          </div>
        </div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-16 py-3">
                <span className="">Image</span>
              </th>
              <th scope="col" className="hidden md:table-header-group px-6 py-3">
                Product
              </th>

              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Quantity
              </th>
            </tr>
          </thead>
          <tbody>
            {foundItem?.cartItems?.map((data) => (
              <>
             
               <tr onClick={()=>navigate(`/productdetails/${data?.product.id}/${data?.product.category.name}`)}
                    key={data?._id}
                    className=" cursor-pointer bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="inline-block md:table-cell px-11 md:p-4">
                    
                      <img
                        src={data?.product.imageCover}
                        className=" w-16 md:w-32 max-w-full max-h-full"
                        alt="Apple Watch"
                      />
                    </td>
                    <td className="inline-block md:table-cell px-6 text-lg pb-2  md:py-4 font-semibold text-gray-900 dark:text-white">
                      {data?.product?.title}
                    </td>

                    <td className="px-6 text-lg py-4 font-semibold text-gray-900 dark:text-white">
                      {data?.price}
                    </td>
                    <td className="px-6 text-lg py-4">
                      <span>{data?.count}</span>
                    </td>
                  </tr>
                
              </>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
