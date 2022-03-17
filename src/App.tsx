import React, { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import "./assets/styles/App.scss";
import AppRouter from "./components/AppRouter/AppRouter";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import { actions } from "./redux/reducers/auth-reducer";
import { UserType } from "./types/types";

const App: FC = () => {
  const { setUser, toggleIsAuth } = actions;
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem("auth")) {
      dispatch(
        setUser({
          username: localStorage.getItem("username" || ""),
        } as UserType)
      );
      dispatch(toggleIsAuth(true));
    }
  }, []);

  return (
    <div className="wrapper">
      <header className="header">
        <Header />
      </header>
      <main className="main">
        <AppRouter />
      </main>
      <footer className="footer">
        <Footer />
      </footer>
    </div>
  );
};

export default App;
