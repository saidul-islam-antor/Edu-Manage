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
import Users from "../AdminDashboard/Users";
import MyProfile from "../Dashboard/MyProfile";
import Forbidden from "../pages/Forbidden";
import AdminRoutes from "../PrivateRoutes/AdminRoutes";
import StudentRoutes from "../PrivateRoutes/StudentRoutes";
import TeacherRoutes from "../PrivateRoutes/TeacherRoutes";



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
      path:"forbidden",
      Component:Forbidden
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
  // Component:AddClass
  element:<TeacherRoutes><AddClass></AddClass></TeacherRoutes>
},
{
  path:'myClasses',
  // Component:MyClasses
  element:<TeacherRoutes><MyClasses></MyClasses></TeacherRoutes>
},
{
path:'myClass/:id',
// Component:MyClassDetails
element:<TeacherRoutes><MyClassDetails></MyClassDetails></TeacherRoutes>
},
{
  path:'updateClass/:id',
  // Component:UpdateClass
  element:<TeacherRoutes><UpdateClass></UpdateClass></TeacherRoutes>
},
{
  path:'my-enroll-class',
  // Component:MyEnrollClasses
  element:<StudentRoutes><MyEnrollClasses></MyEnrollClasses></StudentRoutes>
},

{
  path:'my-enroll-class/:id',
  // Component:MyEnrollClassDetails
  element:<StudentRoutes><MyEnrollClassDetails></MyEnrollClassDetails></StudentRoutes>
},
{
  path:'payment-history',
  // Component:PaymentHistory
  element:<StudentRoutes><PaymentHistory></PaymentHistory></StudentRoutes>
},
{
  path:'teacher-requests',
 element:<AdminRoutes><TeacherRequest></TeacherRequest></AdminRoutes>
},
{
 path:'admin-all-classes',
 element:<AdminRoutes><AllClassesAdmin></AllClassesAdmin></AdminRoutes>
},
{
  path:"users",
  element:<AdminRoutes><Users></Users></AdminRoutes>
},
{
path:"profile",
element:<MyProfile></MyProfile>

}

    ]
  }
]);


