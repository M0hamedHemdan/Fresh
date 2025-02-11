import { useEffect, useState } from "react";

import axios from "axios";
import Slider from "react-slick";

export default function CategoriesSlider() {
  const [categories, setcategories] = useState([]);

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 1000,
    responsive:[
      {breakpoint:1024,
        settings:{
          slidesToShow:5,
        }
      },
      {breakpoint:768,
        settings:{
          slidesToShow:3,
        }
      },
      {breakpoint:480,
        settings:{
          slidesToShow:2,
        }
      }
    ]
  };
  function getCategori() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then((res) => {
        setcategories(res.data.data);
      })
      .catch((res) => {
        res;
      });
  }

  useEffect(() => {
    getCategori();
  }, []);
  return (
    <>
      <h2 className="my-3 capitalize font-semibold text-gray-600">
        shop popular categories{" "}
      </h2>
      <div className=" overflow-hidden">
      <Slider {...settings}>
        {categories.map((categorie) => (
          <div key={categorie._id}>
            <img
              src={categorie.image}
              className="w-full h-[200px] object-cover"
              alt={categorie.name}
            />
            <h4>{categorie.name}</h4>
          </div>
        ))}
      </Slider>
      </div>
    </>
  );
}
