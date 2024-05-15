import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../Pages/Home/Home";
import Error from "../Pages/Error/Error";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import NeedPostCardDetails from "../Pages/CardDetails/NeedPostCardDetails";
import AddVolunteerPost from "../Pages/AddVolunteerPost/AddVolunteerPost";
import NeedVolunteerPage from "../Pages/NeedVolunteer/NeedVolunteerPage";
import MangeMyPost from "../Pages/ManageMyPost/MangeMyPost";
import UpdatePage from "../Pages/UpdatePage/UpdatePage";
import BeVolunteer from "../Pages/BeVolunteer/BeVolunteer";
import MyBeVolunteerReq from "../Pages/MyBeVolunteerReq/MyBeVolunteerReq";
import PrivateRoute from "./PrivateRoute";
import MyActivity from "../Pages/MyActivity/MyActivity";


const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      errorElement: <Error></Error>,
      children:[
        {
            path: '/',
            element: <Home></Home>,
            loader: ()=> fetch(`${import.meta.env.VITE_API_URL}/volunteers`)
        },
        {
            path: '/login',
            element: <Login></Login>
        },
        {
            path: '/register',
            element: <Register></Register>
        },
        {
            path: '/volunteer/:id',
            element: <PrivateRoute><NeedPostCardDetails></NeedPostCardDetails></PrivateRoute>,
            loader: ({params}) => fetch(`${import.meta.env.VITE_API_URL}/volunteer/${params.id}`,{
              credentials: 'include'
            })
        },
        {
            path: '/bevolunteer/:id',
            element:<BeVolunteer></BeVolunteer>,
            loader: ({params}) => fetch(`${import.meta.env.VITE_API_URL}/volunteer/${params.id}`)
        },
        {
            path: '/update/:id',
            element: <UpdatePage></UpdatePage>,
            loader: ({params}) => fetch(`${import.meta.env.VITE_API_URL}/volunteer/${params.id}`)
        },
        {
            path: '/managemypost',
            element: <PrivateRoute><MangeMyPost></MangeMyPost></PrivateRoute>,
            loader: () => fetch(`${import.meta.env.VITE_API_URL}/managemypost`,{
              credentials: 'include'
            })
        },
        {
          path: '/addvolunteerpost',
          element:<PrivateRoute><AddVolunteerPost></AddVolunteerPost></PrivateRoute>
        },
        {
          path: '/needvolunteer',
          element: <NeedVolunteerPage></NeedVolunteerPage>,
          loader: ()=> fetch(`${import.meta.env.VITE_API_URL}/volunteers`)
        },
        {
          path: '/mybevolunteerreq',
          element:<PrivateRoute><MyBeVolunteerReq></MyBeVolunteerReq></PrivateRoute>  ,
          
      },
      {
        path: '/myactivity',
        element: <PrivateRoute><MyActivity></MyActivity></PrivateRoute>
      }

      ]
    },
  ]);

  export default router