import React, { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { privateRoutes, publicRoutes } from "../../routes/routes";
import Preloader from "../Preloader/Preloader";

const AppRouter: React.FC = () => {
  const isAuth = useTypedSelector((state) => state.auth.isAuth);

  return (
    <Suspense fallback={<Preloader />}>
      {isAuth ? (
        <Routes>
          {privateRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
          <Route path="*" element={<Navigate to="/contacts" />} />
        </Routes>
      ) : (
        <Routes>
          {publicRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}
    </Suspense>
  );
};

export default AppRouter;
