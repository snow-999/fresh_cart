import { useContext, useState } from 'react'
// import style from './Login.module.css'
import { useFormik } from 'formik'
import * as yup from "yup";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContetx';

export default function Login() {
  const [apierror, setApierror] = useState(null);
  const [loading, setLoading] = useState(false)
  let { setUserData } = useContext(UserContext)
  let nav = useNavigate();
  async function login(value) {
    try {
      setLoading(true)
      let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', value);
      localStorage.setItem('userToken', data.token)
      setUserData(data.token)

      nav("/home")
    } catch (error) {
      console.log(error.response.data.message);
      setApierror(error.response.data.message);
      setLoading(false)
    }

  }
  let validationSchema = yup.object().shape({
    email: yup.string().email('invalid email').required('email is requred'),
    password: yup.string().matches(/^[0-9]{6,10}$/, 'password is incorrect').required('password is requred')
  })
  let formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    }, validationSchema: validationSchema,
    onSubmit: login
  })

  return <>

    <h1 className="text-3xl">Login</h1>
    <div className='w-1/2 mx-auto'>
      <form onSubmit={formik.handleSubmit}>
        {apierror && <div className="p-2 my-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          {apierror}
        </div>}
        <div className="relative z-0 w-full mb-5 group">
          <input type="email" name="email" id="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} className=" block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
          <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 ">Email address</label>
          {formik.errors.email && formik.touched.email && <div className="p-2 my-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            {formik.errors.email}
          </div>}
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input type="password" name="password" id="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} className=" block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
          <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 ">Email password</label>
          {formik.errors.password && formik.touched.password && <div className="p-2 my-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            {formik.errors.password}
          </div>}
        </div>
        {!loading ? <button type="submit" className="bg-green-800 text-white p-2 rounded-md hover:bg-green-500">submit</button> : <button type="button" className="bg-green-800 text-white p-2 rounded-md hover:bg-green-500">
          <i className='fas fa-spinner fa-spin-pulse'></i>
        </button>}
      </form></div>

  </>
}
