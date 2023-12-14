/* eslint-disable react-hooks/exhaustive-deps */

import './App.css'

import {
  Routes,
  Route,
  Navigate,
  
  useNavigate,
  Outlet,
} from "react-router-dom";

import ErrorScreen from './screens/ErrorScreen'
import HomeScreen from './screens/HomeScreen';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';





const ProtectedRoutes = ({ authenticate }: { authenticate: boolean }) => {

  if (!authenticate) {
    return <Navigate to={"/login"} replace />;
  }

  return <Outlet />;
};

function App() {
  const dataUser = useSelector((state: any) => state.UserLogin);
  const navigate = useNavigate();
  const [authenticate, setAuthenticate] = useState(false)

  useEffect(() => {
    if (dataUser === '') {
      setAuthenticate(true)
      navigate('/');
    }

  }, [dataUser]);



  return (
    <section className={"App"}>
      <Routes>
        <Route element={<ProtectedRoutes authenticate={authenticate} />}>
       
        <Route path={"/*"} element={<ErrorScreen />} />
      </Route>
        <Route path={"/"} element={<HomeScreen />} />
        {/* <Route path={"/login"} element={<LoginScreen />} /> */}
      </Routes>
    </section>

  )
}

export default App
