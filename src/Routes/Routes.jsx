import { createBrowserRouter } from "react-router";
import Layout from "../Pages/Layout";
import Error from "../Pages/Error";
import Hero from "../Pages/Hero";
import Booking from "../Pages/Booking";
import CardDetails from "../Pages/BookingDetails";
import CardInfo from "../Pages/CardInfo";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import PrivateRoute from "../Provider/PrivateRoute";
import News from "../Pages/News";
import Contact from "../Pages/Contact";
import Blog from "../Pages/Blog";
import Destination from "../Pages/Destination";
import BookingDetails from "../Pages/BookingDetails";
import MyBookings from "../Pages/MyBookings";


const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    errorElement: <Error></Error>,
    children: [
      {
        index: true,
        Component: Hero,
        loader: () => fetch("data.json"),
      },
      {
        path: "booking",
        Component: Booking,
      },
      {
        path: "/cardDetails/:id",
        Component: CardDetails,
      },
      {
        path: "/cardInfo/:id",
        loader: async ({ params }) => {
          const res = await fetch("/data.json");
          const data = await res.json();
          return data.find((item) => item.id === parseInt(params.id));
        },
  
        element: <PrivateRoute><CardInfo /></PrivateRoute>, 
      },
      {
        path: '/auth/login', 
        Component: Login
      },
      {
        path: '/register',
        Component: Register
      },
      {
        path:'/news',
        Component:News
      },
      {
        path:'/destination/:id',
        Component:Destination
      },
      {
        path:'/Contact',
        Component:Contact
      },
      {
        path:'/blog',
        Component:Blog
      },
      {
        path:'/bookingDetails',
        Component:BookingDetails
      },
      {
        path:'/myBookings',
        Component:MyBookings
      }
    ],
  },
]);

export default router;