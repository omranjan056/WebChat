import React,{useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { RegisterUser } from '../../apicalls/users';
import {toast} from "react-hot-toast"
import {ShowLoader, HideLoader } from '../../redux/loaderSlice';
import { useDispatch } from 'react-redux';

function Register(){
  const dispatch = useDispatch();
  const navigate=useNavigate();
    const [user,setUser]=React.useState({
        name:'',
        email:'',
        password:'',
    })

    const register = async () => {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if(!emailPattern.test(user.email)) {
        toast.error("Entered Email is Invalid");
        return ;
      }
      if(user.password.length<4){
        toast.error("Password must be greater than 4 character");
        return ;
      }
      try {
        dispatch(ShowLoader());
        const response = await RegisterUser(user);
       dispatch(HideLoader())
        if (response.success) {
          toast.success(response.message);
        } else {
          toast.error(response.message);
        }
      } 
      catch (error) {
        dispatch(HideLoader())
        toast.error(error.message);
      }
    };
    useEffect(() => {
      if(localStorage.getItem("token"))
        navigate("/")
    }, [])
  return (
    <div className=" h-screen bg-primary flex items-center justify-center">
      <div className="bg-white shadow-md p-5 flex flex-col gap-5 w-96 rounded">
          <div className="flex gap-2">
            <i className="ri-question-answer-line text-primary text-2xl "></i>
            <h1 className="text-2xl  uppercase font-semibold text-primary " id="chatly-register">Chatly Register</h1>
          </div>
        <hr />
        <h1 className=" font-semibold ">Name</h1>
        <input
          className="rounded"
          type="text"
          required
          value={user.name}
          onChange={(e) => {
            const inputText = e.target.value;
            if (/^[a-zA-Z\s]*$/.test(inputText) || inputText === "") {
              setUser({ ...user, name: inputText });
            }
          }}
          placeholder="Enter Your Name"
        />

         <h1 className=" font-semibold ">Email</h1>
         <input
          className="rounded"
          type="email"
          required
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="Enter Your Email"
        />

         <h1 className=" font-semibold ">Password</h1>
        <input className="rounded" 
            type="password"
            value={user.password}
            required
            onChange={(e)=>setUser({...user,password:e.target.value})}
            placeholder='Enter Your Password'
         />
         <button className={
            user.email && user.password && user.name ? "contained-btn rounded-md " : "disabled-btn rounded-md" 
          } onClick={register}>Register</button>
         <Link to="/login" className='underline'>
            Already have an account? Login
         </Link>
      </div>
    </div>
  )
}

export default Register