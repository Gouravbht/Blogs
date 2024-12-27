import { useEffect, useState } from 'react'

import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Home from './pages/Home';
import { Dashboard } from './pages/Dashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
useEffect(()=>{
  const token = localStorage.getItem('token');
  if(token){
    setIsAuthenticated(true);
    }
},[])
  return (
    <>
     <Routes>
<Route  path='/login' element={<Login setIsAuthenticated={setIsAuthenticated} />} />
<Route path='/' element={isAuthenticated?<Home/>: <Navigate to='/login'/>}/>
<Route path='/dashboard' element={isAuthenticated?<Dashboard/>: <Navigate to='/login'/>}/>

     </Routes>
    </>
  )
}

export default App
