import React, {lazy, Suspense} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { About } from './components/About';
import { Error } from './components/Error';
import { createBrowserRouter , RouterProvider } from 'react-router-dom';
import { Contact } from './components/Contact';
import { Body } from './components/Body';
import { Cart } from './Cart';
import { Profile } from './components/Profile';
import { Upgrade, Payments , Addresses , Settings } from './components/Profile';
import { Orders } from './components/Orders';
import { Favourites } from './components/Favourites';
import { ResturantMenu} from './components/ResturantMenu';
import { Shimmer } from './components/Shimmer';
// import { Instamart } from './components/Instamart';

// Lazy/Dynamic import
const Instamart = lazy(() => import("./components/Instamart"));

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <Error/>,
    children: [
      {
        path: "/",
        element: <Body/>
      },
      {
        path: "/about",
        element: <About/>
      },
      {
        path: "/contact",
        element: <Contact/>
      },
      {
        path: "/instamart",
        element: <Suspense fallback={<Shimmer/>}><Instamart/></Suspense>
      },
      {
        path: "/profile",
        element: <Profile/>,
        children: [
          {
            path: "/profile/orders",
            element: <Orders/>,
          },
          {
            path: "/profile/favourites",
            element: <Favourites/>,
          },
          {
            path: "/profile/upgrade",
            element: <Upgrade/>,
          }, 
          {
            path: "/profile/payments",
            element: <Payments/>,
          },
          {
            path: "/profile/addresses",
            element: <Addresses/>,
          },
          {
            path: "/profile/settings",
            element: <Settings/>,
          }

        ]
      },
      {
        path: "/cart",
        element: <Cart/>
      },
      
      {
        path: "/resturant/:id",
        element: <ResturantMenu/>
      },
    ]
  },
  
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router = {appRouter}/>);

