import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../Pages/Home/Home";
import Error from "../Pages/Error/Error";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import NeedPostCardDetails from "../Pages/CardDetails/NeedPostCardDetails";
import AddVolunteerPost from "../Pages/AddVolunteerPost/AddVolunteerPost";


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
            element: <NeedPostCardDetails></NeedPostCardDetails>,
            loader: ({params}) => fetch(`${import.meta.env.VITE_API_URL}/volunteer/${params.id}`)
        },
        {
          path: '/addvolunteerpost',
          element:<AddVolunteerPost></AddVolunteerPost>
        }
      ]
    },
  ]);

  export default router