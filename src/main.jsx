import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {Provider} from "react-redux";
import store from './store/store.js'
import {createBrowserRouter,RouterProvider} from "react-router-dom";
import {AuthLayout} from "./Components"
import Login from "./Pages/Login.jsx"
import SignUp from "./Pages/SignUp.jsx"
import Post from "./Pages/Post.jsx"
import AllPosts from "./Pages/AllPost.jsx"
import AddPost from "./Pages/AddPost.jsx"
import EditPost from "./Pages/EditPost.jsx"
import Home from "./Pages/Home.jsx"
import Verify from "./Components/Verify.jsx";
import CheckEmail from "./Components/CheckEmail.jsx";
const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/login",
                element: (
                   // <AuthLayout authenticated={false}>
                        <Login />
                    //</AuthLayout>
                ),
            },
            {
                path: "/signup",
                element: (
                    // <AuthLayout >
                        <SignUp />
                     // </AuthLayout>
                ),
            },
            {
                path: "/all-posts",
                element: (
                    <AuthLayout authenticated>
                        {" "}
                        <AllPosts />
                    </AuthLayout>
                ),
            },
            {
                path: "/add-post",
                element: (
                    <AuthLayout authenticated>
                        {" "}
                        <AddPost />
                    </AuthLayout>
                ),
            },
            {
                path: "/edit-post/:slug",
                element: (
                    <AuthLayout authenticated>
                        {" "}
                        <EditPost />
                    </AuthLayout>
                ),
            },
            {
                path: "/post/:slug",
                element: <Post />,
            },
            {
                path:"/verify",
                element: <Verify/>
            },
            {
                path:"/checkMail",
                element: <CheckEmail/>
            }
        ],
    },
])


createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </StrictMode>,
)