import { useContext, useState } from "react";

import logo from "../../assets/freshcart-logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { CartContext } from "../../Context/CartContext";

export default function Navbar() {
  const { datas } = useContext(CartContext);
  
  const { userLogin, setuserLogin } = useContext(UserContext);
  const { numberItems } = useContext(CartContext);
  const [clas, setClass] = useState("hidden");

  const navigate = useNavigate();

  function signout() {
    localStorage.removeItem("userToken");
    setuserLogin(null);
    navigate("/login");
  }
  function clickNav() {
    if (clas == "hidden") {
      setClass("block");
    } else {
      setClass("hidden");
    }
  }

  return (
    <>
      <nav className="bg-slate-300 fixed top-0 left-0 right-0 border-gray-200 z-50">
        <div className="w-11/12 flex flex-wrap gap-3  justify-between items-center mx-auto max-w-screen-xl p-4">
          <div className="flex  items-center gap-5">
            <Link
              to=""
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >
              <img
                src={logo}
                width={"120px"}
                className="h-8"
                alt="Flowbite Logo"
              />
            </Link>
          </div>

          <div className="hidden md:flex  items-center gap-5">
            {userLogin !== null ? (
              <>
                <ul className="flex gap-3 ">
                  <li>
                    <Link className="text-slate-600 hover:text-gray-950" to="">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-slate-600 hover:text-gray-950"
                      to="cart"
                    >
                      Cart
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-slate-600 hover:text-gray-950"
                      to="wishList"
                    >
                      wish list
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-slate-600 hover:text-gray-950"
                      to="products"
                    >
                      Products
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-slate-600 hover:text-gray-950"
                      to="categories"
                    >
                      Categories
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-slate-600 hover:text-gray-950"
                      to="brands"
                    >
                      Brands
                    </Link>
                  </li>
                  <li>
                    {/* {datas.length > 0 ?<Link
                      className="text-slate-600 hover:text-gray-950"
                      to="allorders"
                    >
                      AllOrder
                    </Link>: ""} */}
                    <Link
                      className="text-slate-600 hover:text-gray-950"
                      to="allorders"
                    >
                      AllOrder
                    </Link>
                  </li>
                </ul>
              </>
            ) : null}
          </div>

          <div className="flex items-center space-x-6 rtl:space-x-reverse ">
            <Link to="cart" className="relative hidden md:block">
              <i className="fa-solid fa-cart-shopping text-xl "></i>
              <span className="bg-green-600 text-white rounded-full w-5 h-5 absolute bottom-5 left-3 text-xs flex justify-center items-center text-center">
                {numberItems}{" "}
              </span>
            </Link>

            <ul className="flex gap-4">
              {userLogin !== null ? (
                <li>
                  <span
                    onClick={signout}
                    className="hidden md:block text-sm cursor-pointer"
                  >
                    {" "}
                    Signout
                  </span>
                </li>
              ) : (
                <>
                  <li>
                    <Link to="login">Login</Link>
                  </li>
                  <li>
                    <Link to="register">Register</Link>
                  </li>
                </>
              )}
            </ul>

            <div>
              <span
                onClick={() => clickNav()}
                className="cursor-pointer md:hidden"
              >
                <i className="fa-solid fa-bars text-xl hover:text-green-600 transition"></i>
              </span>
            </div>
          </div>
        </div>
        <div className={` text-center  items-center gap-5 ${clas}`}>
          {userLogin !== null ? (
            <>
              <ul className=" ">
                <li className="bg-green-600 mt-4">
                  <Link
                    className=" text-xl  block py-3 hover:bg-green-500 text-white"
                    to=""
                  >
                    Home
                  </Link>
                </li>
                <li className="bg-green-600 mt-4">
                  <Link
                    className=" text-xl  block py-3 hover:bg-green-500 text-white"
                    to="cart"
                  >
                    Cart
                  </Link>
                </li>
                <li className="bg-green-600 mt-4">
                  <Link
                    className=" text-xl  block py-3 hover:bg-green-500 text-white"
                    to="wishList"
                  >
                    wish list
                  </Link>
                </li>
                <li className="bg-green-600 mt-4">
                  <Link
                    className=" text-xl  block py-3 hover:bg-green-500 text-white"
                    to="products"
                  >
                    Products
                  </Link>
                </li>
                <li className="bg-green-600 mt-4">
                  <Link
                    className=" text-xl  block py-3 hover:bg-green-500 text-white"
                    to="categories"
                  >
                    Categories
                  </Link>
                </li>
                <li className="bg-green-600 mt-4">
                  <Link
                    className=" text-xl  block py-3 hover:bg-green-500 text-white"
                    to="brands"
                  >
                    Brands
                  </Link>
                </li>
                <li className="bg-green-600 mt-4 flex justify-around items-center">
                  <Link to="cart" className="relative">
                    <i className="fa-solid fa-cart-shopping text-xl "></i>
                    <span className="bg-green-600 text-white rounded-full w-5 h-5 absolute bottom-5 left-3 text-xs flex justify-center items-center text-center">
                      {numberItems}{" "}
                    </span>
                  </Link>
                  <span
                    onClick={signout}
                    className=" cursor-pointer text-xl  block py-3 hover:bg-green-500 text-white"
                  >
                    {" "}
                    Signout
                  </span>
                </li>
              </ul>
            </>
          ) : null}
        </div>
      </nav>
    </>
  );
}
