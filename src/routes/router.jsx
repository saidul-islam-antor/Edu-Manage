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
import MyEnrollClasses from "../Dashboard/MyEnrollClass";
import MyEnrollClassDetails from "../Dashboard/MyEnrollClassDetails";
import PaymentHistory from "../Dashboard/Payment History";
import TeachForm from "../pages/HomePage/component/TeachForm";
import TeacherRequest from "../AdminDashboard/TeacherRequest";
import AllClassesAdmin from "../AdminDashboard/AdminAllClasses";



import MyClassDetails from "../Dashboard/MyClasssDetails";



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
      path:'/teachForm',
      element:<PrivateRoutes>
        <TeachForm></TeachForm>
      </PrivateRoutes>
    },
    {
      path:'/paymentPage/:paymentId',
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
path:'myClass/:id',
Component:MyClassDetails
},
{
  path:'updateClass/:id',
  Component:UpdateClass
},
{
  path:'my-enroll-class',
  Component:MyEnrollClasses
},

{
  path:'my-enroll-class/:id',
  Component:MyEnrollClassDetails
},
{
  path:'payment-history',
  Component:PaymentHistory
},
{
  path:'teacher-requests',
  Component:TeacherRequest
},
{
 path:'admin-all-classes',
 Component:AllClassesAdmin
}

    ]
  }
]);


