import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Allorders() {
  const { data,datas,setData } = useContext(CartContext);
  // const [datas, setData] = useState([]);
  // let userId = data?.data?.decoded?.id;

  // async function getUserOrders(Id) {
  //   await axios
  //     .get(`https://ecommerce.routemisr.com/api/v1/orders/user/${Id}`)
  //     .then((res) => setData(res.data))
  //     .catch((err) => err);
  // }

  // useEffect(() => {
  //   if (userId) {
  //     getUserOrders(userId);
  //   }
  // }, [userId]);
  // console.log(datas);

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="text-center w-full text-sm rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                #
              </th>
              <th scope="col" className="px-6 py-3">
                Order Price
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="text-center">
            {datas.length > 0
              ? datas.map((data) => (
                  <>
                    <tr
                      key={data._id}
                      className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200"
                    >
                      <th
                        scope="row"
                        className=" font-bold px-6 py-4 text-lg text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        #{data.id}
                      </th>
                      <td className="px-6 py-4 text-lg">
                        {data.totalOrderPrice} EGP
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <h4
                            className={` ${
                              data.isPaid ? "bg-green-600" : "bg-red-600"
                            } font-semibold rounded-xl inline-block px-3 py-1 mb-2 text-white`}
                          >
                            ispaid
                          </h4>
                        </div>

                        <h4
                          className={` ${
                            data.isDelivered ? "bg-green-600" : "bg-red-600"
                          } font-semibold inline-block rounded-xl px-3 py-1 text-white`}
                        >
                          isDelivered
                        </h4>
                      </td>
                      <td className="px-6 py-4">
                        <Link
                          to={`/orderDetails/${data._id}`}
                          className="font-medium text-lg px-4 py-2 rounded-lg  text-white bg-green-700 dark:text-blue-500 hover:bg-green-600 transition"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  </>
                ))
              : ""}
          </tbody>
        </table>
      </div>
    </>
  );
}
