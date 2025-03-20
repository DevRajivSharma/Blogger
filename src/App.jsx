import { useState,useEffect } from 'react'
import { useDispatch } from 'react-redux'
import auth from './appwrite/auth.js'
import {login,logout} from './feature/authSlice.js'
import {Footer, Header} from "./Components/index.js";
import { Outlet } from "react-router-dom";
import Loader from "./Components/Loader.jsx";

function App() {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

    useEffect(() => {
        auth.getCurrentUser()
            .then((userData) => {
                if (userData) {
                    dispatch(login({userData}))
                } else {
                    console.log('Logged Out')
                    dispatch(logout())
                }
            })
            .finally(() => setLoading(false))
    }, [dispatch])

   if (loading) {
     return (
        <Loader/>
     )
   }
   else {
     return (
         <div className={'bg-[#212121] h-screen w-screen text-white'}>
          <Header/>
            <Outlet/>
          <Footer/>
         </div>
     )
   }

}

export default App
