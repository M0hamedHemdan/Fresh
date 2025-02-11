import axios from 'axios';
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import * as yup from "yup"
import { UserContext } from '../../Context/UserContext';



export default function Register() {
  const {userLogin, setuserLogin} = useContext(UserContext)
  const navigate = useNavigate();
  const [ApliError, setApliError] = useState("");
  const [isLoading, setisLoading] = useState(false);

  function handleRegister(values) {
    setisLoading(true)
    console.log(values);
    axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup` , values)
    
    .then((res)=>{
      setisLoading(false)
      // console.log(res.data.message);
      if (res.data.message === "success") {
        // console.log("okay");
        localStorage.setItem("userToken", res.data.token)
        setuserLogin(res.data.token)
        navigate("/")
        
      }
    })
    .catch((res)=>{
      // console.log(res.response.data.message);
      setisLoading(false)
      setApliError(res.response.data.message)
    })
   
    //call api

    
  }


  const validationSchema = yup.object().shape({
    name : yup.string()
      .min(3,"min length is 3")
      .max(20,"max length 10")
      .required("name is required"),
    email : yup.string()
      .email("not valid email")
      .required("email is required"),
    password : yup.string()
      .required("password is required")
      .min(6,"password min length is 6"),
    rePassword : yup.string()
      .required("rePassword is required")
      .oneOf([yup.ref("password")], "not mathed with password"),
    phone : yup.string()
      .required("phone is required")
      .matches(/^01[1025][0-9]{8}$/, "Phone Not Valid")
  });


  const formik = useFormik({
    initialValues : {
      name : "",
      email :"",
      password :"",
      rePassword :"",
      phone :"",
    },
    validationSchema ,
    onSubmit : handleRegister,  //function


  });


  return (
    <>
      {
        ApliError?<div className='w-1/2 mx-auto bg-red-600 text-white font-bold rounded-lg p-3'>
        {ApliError}
        </div>: null
      }
      

      <h2 className='font-bold text-2xl text-center my-4 text-emerald-700'>
        Register Now
      </h2>
      <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto">
        <div className="relative z-0 w-full mb-5 group">
            <input 
              type="text" 
              name="name" 
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id="name" 
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-600 peer" 
              placeholder=" " 
              required 
            />
            <label 
              htmlFor="name" 
              className="left-0 peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >Enter Your Name
            </label>
            {
            formik.errors.name && formik.touched.name ?( <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 " role="alert">
              <span className="font-medium">{formik.errors.name}</span> Change a few things up and try submitting again.
            </div> ):null
            }
        </div>
        <div className="relative z-0 w-full mb-5 group">
            <input 
              type="email" 
              name="email" 
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id="email" 
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-600 peer" 
              placeholder=" " 
              required 
            />
            <label 
              htmlFor="email" 
              className="left-0 peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Enter Yoru Email
            </label>
            {
            formik.errors.email &&  formik.touched.email ?( <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 " role="alert">
              <span className="font-medium">{formik.errors.email}</span> Change a few things up and try submitting again.
            </div> ):null
            }
        </div>
        <div className="relative z-0 w-full mb-5 group">
            <input 
              type="password" 
              name="password" 
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id="password" 
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-600 peer" 
              placeholder=" " 
              required 
            />
            <label 
              htmlFor="password" 
              className="left-0 peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Enter Yoru Password
            </label>
            {
            formik.errors.password && formik.touched.password ?( <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 " role="alert">
              <span className="font-medium">{formik.errors.password}</span> Change a few things up and try submitting again.
            </div>):null
            }
        </div>
        <div className="relative z-0 w-full mb-5 group">
            <input 
              type="password" 
              name="rePassword" 
              value={formik.values.rePassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id="rePassword" 
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-600 peer" 
              placeholder=" " 
              required 
            />
            <label 
              htmlFor="rePassword" 
              className="left-0 peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Enter Yoru RePassword
            </label>
            {
            formik.errors.rePassword && formik.touched.rePassword ?( <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 " role="alert">
              <span className="font-medium">{formik.errors.rePassword}</span> Change a few things up and try submitting again.
            </div>):null
            }
        </div>
        <div className="relative z-0 w-full mb-5 group">
            <input 
              type="tel" 
              name="phone" 
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id="phone" 
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-600 peer" 
              placeholder=" " 
              required 
            />
            <label 
              htmlFor="phone" 
              className="left-0 peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Enter Yoru Phone
            </label>
            {
            formik.errors.phone && formik.touched.phone ? (<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 " role="alert">
              <span className="font-medium">{formik.errors.phone}</span> Change a few things up and try submitting again.
            </div>):null
            }
        </div>
        <div className='flex gap-4 items-center'>

        <button
          type="submit" 
          className="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
          >
            {
              isLoading ? <i className='fas fa-spinner fa-spin px-4'></i>:"Register"
            }
          </button>

          <Link to={"/login"}>
            <span className='text-blue-500 underline'>
              do you have an account? login Now
            </span>
          </Link>
        </div>

       
      </form>
    </>
  )
}
