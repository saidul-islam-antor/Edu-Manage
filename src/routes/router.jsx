import {
  createBrowserRouter,
  
} from "react-router";
import RootLayouts from "../layouts/RootLayouts";
import Home from "../pages/HomePage/Home";
import Login from "../pages/authSystem/Login";
import Register from "../pages/authSystem/Register";
import PrivetRoutes from "../PrivateRoutes/PrivateRoutes";
import DashBoardLayout from "../DashBoardLayout/DashBoardLayout";
import AddClass from "../Dashboard/AddClass";
import MyClasses from "../Dashboard/MyClasses";
import UpdateClass from "../Dashboard/UpdateClass";
import AllClasses from "../pages/HomePage/component/AllClasses";
import PrivateRoutes from "../PrivateRoutes/PrivateRoutes";
import ClassDetails from "../pages/HomePage/component/ClassDetails";
import PaymentPage from "../pages/HomePage/component/paymentPage";
import CheckoutForm from "../pages/HomePage/component/checkOutFrom";


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
    },
    {
      path:'/allClasses',
      Component:AllClasses
    },
    {
      path:'/classDetails/:id',
      element:<PrivateRoutes>
        <ClassDetails></ClassDetails>
      </PrivateRoutes>
    },
    {
      path:'/paymentPage/:id',
      element:<PrivateRoutes>
        <PaymentPage></PaymentPage>
      </PrivateRoutes>
    },
    {
      path:'/checkoutFrom',
      element:<PrivateRoutes>
        <CheckoutForm></CheckoutForm>
      </PrivateRoutes>
    }
   ]
  },
  {
    path:'/dashboard',
    element:<PrivetRoutes>
<DashBoardLayout></DashBoardLayout>
    </PrivetRoutes>,
    children:[
{
  path:'addClasses',
  Component:AddClass
},
{
  path:'myClasses',
  Component:MyClasses
},
{
  path:'updateClass/:id',
  Component:UpdateClass
}
    ]
  }
]);


