import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

export default function Brands() {
  const [brands, setbrands] = useState([]);
  async function getBrands() {
    await axios
      .get(`https://ecommerce.routemisr.com/api/v1/brands`)
      .then((res) => {
        setbrands(res?.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getBrands();
  }, []);

  return (
    <>
      <h2 className="text-green-600 font-semibold text-center text-5xl mt-8">
        All Brands
      </h2>

      <div className="w-4/5 mx-auto grid mt-14 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {brands.map((brand) => (
          <div
            className="hover:shadow-[0px_0px_9px_#4FA74F]  duration-700 border-2"
            key={brand._id}
          >
            <img
              className=" h-auto w-full rounded-lg"
              src={brand.image}
              alt={brand.name}
            />
            <h3 className="text-center mb-9">{brand.name}</h3>
          </div>
        ))}
      </div>
    </>
  );
}
