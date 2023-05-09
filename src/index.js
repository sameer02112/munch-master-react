import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { About } from './components/About';
import { Error } from './components/Error';
import { createBrowserRouter , RouterProvider } from 'react-router-dom';
import { Contact } from './components/Contact';
import { Body } from './components/Body';
import { ResturantMenu} from './components/ResturantMenu'


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
        path: "/resturant/:id",
        element: <ResturantMenu/>
      },
    ]
  },
  
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router = {appRouter}/>);

