import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import { Link } from "react-router-dom";

export default function Categories() {
  const [categories, setcategories] = useState([]);
  const [supCategories, setsupCategories] = useState([]);
  const { getSubCategories, getCategories } = useContext(CartContext);
  async function getApi() {
    const { data } = await getCategories();
    setcategories(data.data);
  }
  async function getid(id) {
    const { data } = await getSubCategories(id);
    console.log(data.data);
    setsupCategories(data.data);
  }

  useEffect(() => {
    getApi();
    getid();
  }, []);

  return (
    <>
      <div className="w-4/5 mx-auto md:w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 my-6">
        {categories.map((categorie) => (
          <>
            <div
              key={categorie._id}
              className=" bg-white border border-gray-200 rounded-lg hover:shadow-[0px_0px_11px_#4FA74F] duration-700 "
            >
              <Link onClick={() => getid(categorie._id)} to="">
                <div className="h-80 overflow-hidden">
                  <img className=" w-full" src={categorie.image} alt />
                </div>
                <h3 className="text-center py-5 text-3xl font-semibold text-green-600">
                  {categorie.name}
                </h3>
              </Link>
            </div>
          </>
        ))}
      </div>
      {supCategories.length > 0 ? (
        <>
          <h2 className="text-4xl font-semibold text-green-600 text-center">
            Electronics subcategories
          </h2>
        </>
      ) : (
        ""
      )}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 my-6">
        {supCategories.map((sup) => (
          <>
            <h3
              key={sup._id}
              className="hover:shadow-[0px_0px_11px_#4FA74F] duration-700 py-5 border-2 rounded-xl  text-center text-3xl font-semibold"
            >
              {sup.name}
            </h3>
          </>
        ))}
      </div>
    </>
  );
}
