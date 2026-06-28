import { createBrowserRouter } from "react-router";
import Layout from "../Pages/Layout";
import Error from "../Pages/Error";
import Hero from "../Pages/Hero";
import Booking from "../Pages/Booking";
import CardDetails from "../Pages/CardDetails";
import CardInfo from "../Pages/CardInfo";

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
        Component: CardInfo,
      },
    ],
  },
]);
export default router;
