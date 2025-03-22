import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Home from './components/Home.jsx'
import Indexeasy from './pages/indexeasy.jsx'
import Indexhard from './pages/indexhard.jsx'
import Indexmedium from './pages/indexmedium.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Home /> }, 
      { path: '/easygame', element: <Indexeasy /> },
      { path: '/hardgame', element: <Indexhard /> },
      { path: '/mediumgame', element: <Indexmedium /> },
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
