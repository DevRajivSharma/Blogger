import { useState,useEffect } from 'react'
import { useDispatch } from 'react-redux'
import auth from './appwrite/auth.js'
import {login,logout} from './feature/authSlice.js'
import {Footer, Header} from "./Components/index.js";
import { Outlet } from "react-router-dom";
import Loader from "./Components/Loader.jsx";

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

    useEffect(() => {
        auth.getCurrentUser()
            .then((userData) => {
                if (userData) {
                    console.log('userData : ',userData)
                    dispatch(login(userData))
                } else {
                    dispatch(logout())
                }
            })
            .finally(() => setLoading(false))
    }, [dispatch])

   if (loading) {
     return (
        <div className={'bg-[#212121]  w-screen h-screen flex items-center'}>
            <Loader/>
        </div>
     )
   }
   else {
     return (
         <div className={'bg-[#212121]  w-screen h-screen overflow-y-auto text-white'}>
          <Header/>
            <Outlet/>
          <Footer/>
         </div>
     )
   }

}

export default App
