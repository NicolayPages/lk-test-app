import React, { FC, memo } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import s from "./Contacts.module.scss";

interface MyFormValues {
  search: string;
}
interface PropsType {
  findContact: (term: string) => void;
}

export const SearchForm: FC<PropsType> = memo(({ findContact }) => {
  const onSubmit = (values: MyFormValues) => {
    findContact(values.search);
  };

  const initialValues: MyFormValues = { search: "" };

  const searchSchema = Yup.object().shape({
    search: Yup.string().required("Field is required"),
  });

  return (
    <div className={s.searchForm}>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={searchSchema}
      >
        {({ errors, touched }) => (
          <>
            <Form className={s.form}>
              <Field
                type="text"
                name="search"
                placeholder="search contact..."
                className={s.input}
              />
              <button type="submit" className={s.btn}>
                Find
              </button>
            </Form>
            {errors.search && touched.search ? (
              <p className={s.error}>{errors.search}</p>
            ) : null}
          </>
        )}
      </Formik>
    </div>
  );
});
