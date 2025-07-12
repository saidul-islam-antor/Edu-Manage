import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import RootLayouts from "../layouts/RootLayouts";
import Home from "../pages/HomePage/Home";
import Login from "../pages/authSystem/Login";
import Register from "../pages/authSystem/Register";


 export const router = createBrowserRouter([
  {
    path: "/",
   Component:RootLayouts,
   children:[
    {
        index:true,
        Component:Home
        
    },
    {
      path:'/login',
      Component:Login
      
    },
    {
      path:'/register',
      Component:Register
    }
   ]
  },
]);


