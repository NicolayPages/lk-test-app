import React, { FC, memo } from "react";
import { useDispatch } from "react-redux";
import logo from "../../assets/images/contact.png";
import person from "../../assets/images/person.jpg";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { logoutUser } from "../../redux/reducers/auth-reducer";
import s from "./Header.module.scss";

const Header: FC = memo(() => {
  const { isAuth, user } = useTypedSelector((state) => state.auth);
  const dispatch = useDispatch();

  const logOut = () => {
    dispatch(logoutUser());
  };

  return (
    <div className={s.container}>
      <div className={s.logo}>
        <img src={logo} alt="logo" />
        <span>LkTestApp</span>
      </div>
      <div className={s.action}>
        {isAuth ? (
          <div className={s.private}>
            <div className={s.person}>
              <p className={s.username}>{user.username}</p>
              <div className={s.image}>
                <img src={person} alt="person" />
              </div>
            </div>
            <button onClick={logOut} className={s.btn}>
              Logout
            </button>
          </div>
        ) : (
          <div className={s.info}>
            <p>
              Username: <span>Bret</span>
            </p>
            <p>
              Password: <span>92998-3874</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
});

export default Header;
