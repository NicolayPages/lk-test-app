import { Field, Form, Formik } from "formik";
import * as React from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import Preloader from "../../components/Preloader/Preloader";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { loginUser } from "../../redux/reducers/auth-reducer";
import { UserType } from "../../types/types";
import s from "./Login.module.scss";

const Login: React.FC = () => {
  const { isFetching, errorMessage } = useTypedSelector((state) => state.auth);
  const dispatch = useDispatch();

  const onSubmit = (values: UserType) => {
    dispatch(loginUser(values.username, values.password));
  };

  const initialValues: UserType = {
    username: "",
    password: "",
  };

  const searchSchema = Yup.object().shape({
    username: Yup.string().required("Field is required"),
    password: Yup.string().required("Field is required"),
  });

  if (isFetching) {
    return (
      <div className={s.loader}>
        <Preloader />
      </div>
    );
  }

  return (
    <div className={s.container}>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={searchSchema}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className={s.form}>
            <div className={s.header}>Login</div>
            <div className={s.input}>
              <p>Username</p>
              <Field
                className={
                  errors.username && touched.username ? s.errorField : null
                }
                type="login"
                name="username"
              />
              {errors.username && touched.username ? (
                <p className={s.error}>{errors.username}</p>
              ) : null}
            </div>
            <div className={s.input}>
              <p>Password</p>
              <Field
                className={
                  errors.password && touched.password ? s.errorField : null
                }
                type="password"
                name="password"
              />
              {errors.password && touched.password ? (
                <p className={s.error}>{errors.password}</p>
              ) : null}
            </div>
            {errorMessage && <div className={s.error}>{errorMessage}</div>}
            <button disabled={isSubmitting} className={s.btn}>
              Login
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
