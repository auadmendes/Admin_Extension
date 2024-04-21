import {
    createBrowserRouter, 
    RouterProvider
  } from 'react-router-dom';
  


import { Home } from './pages/Home';
import { TestPage } from './pages/TestPage';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />
    },
    {
        path: '/TestPage',
        element: <TestPage />
    },
]);

function Routes () {
    return (
        <RouterProvider router={router}/>
    )
}

export default Routes;