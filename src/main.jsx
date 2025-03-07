import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Layout from './Layout.jsx'
import { Provider } from 'react-redux'
import { store } from './store/store'
import Home from './pages/Home/Index.jsx'
import Events from './pages/Events/Index.jsx'
import About from './pages/About/About.jsx'
import Contact from './pages/Contact/Contact.jsx'
import Donations from './pages/Donations/Index.jsx'
import Admin from './pages/AdminPage/Index.jsx'
import Protectroute from "./utils/ProtectRoute.js"; 

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='' element={<Home />} />
      <Route path='events' element={< Events/>} />
      <Route path='about' element={< About/>} />
      <Route path='contact' element={<Contact/>} />
      <Route path='donations' element={<Donations/>} />
      <Route path='admin'
      element={ 
          <Protectroute>
              <Admin/>
          </Protectroute>
      }
      />
    </Route>
    
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  // </React.StrictMode>
)
