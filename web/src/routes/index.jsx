import { useEffect, useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import { Box } from "@mui/material";

import { Login } from "../pages/Login";
import { Dashboard } from "../pages/Dashboard";

import useData from "../providers/useToken";



export function Rotas() {
  const data = useData((state) => state.data);
  const [carregandoToken, setCarregandoToken] = useState(true);

  useEffect(() => {
    if(data) {
      setCarregandoToken(false)
    } else {
      setCarregandoToken(false)
    }
  }, [data]);

  const renderRoutes = (routes) => {
    return (
      <Routes>
        {routes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Routes>
    );
  };

  const privateRoutes = [
    { path: "/", element: <Dashboard /> },
    { path: "*", element: <Dashboard redirect/> }
  ];

  const publicRoutes = [
    { path: "/", element: <Login  /> },
    { path: "*", element: <Login redirect /> },
  ];

  return (
    <BrowserRouter>
       {carregandoToken ? <Box /> : data ? renderRoutes(privateRoutes) : renderRoutes(publicRoutes)}
    </BrowserRouter>
  );
}
