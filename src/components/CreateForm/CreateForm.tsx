import React, { FC, memo } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import s from "./CreateForm.module.scss";
import { ContactsType } from "../../types/types";

type PropsType = {
  offCreateMode: () => void;
  createContact: (contactBody: ContactsType) => void;
  id: number;
};

export const CreateForm: FC<PropsType> = memo(
  ({ offCreateMode, createContact, id }) => {
    const onClose = () => {
      offCreateMode();
    };

    const onSubmit = (values: ContactsType, actions: any) => {
      createContact(values);
      actions.resetForm();
      offCreateMode();
    };

    const initialValues: ContactsType = {
      id,
      name: "",
      email: "",
      phone: "",
      address: {
        city: "",
        street: "",
      },
    };

    const searchSchema = Yup.object().shape({
      name: Yup.string().required("Field is required"),
      email: Yup.string().required("Field is required"),
      phone: Yup.string().required("Field is required"),
    });

    return (
      <div className={s.wrapper}>
        <div className={s.content}>
          <div className={s.header}>
            <p onClick={onClose} className={s.close}>
              x
            </p>
          </div>
          <div className={s.main}>
            <Formik
              initialValues={initialValues}
              onSubmit={onSubmit}
              validationSchema={searchSchema}
            >
              {({ errors, touched }) => (
                <Form>
                  <div className={s.fields}>
                    <div className={s.input}>
                      <span>Name</span>
                      <Field type="text" name="name" />
                      {errors.name && touched.name ? (
                        <p className={s.error}>{errors.name}</p>
                      ) : null}
                    </div>
                    <div className={s.input}>
                      <span>Email</span>
                      <Field type="email" name="email" />
                      {errors.email && touched.email ? (
                        <p className={s.error}>{errors.email}</p>
                      ) : null}
                    </div>
                    <div className={s.input}>
                      <span>Phone</span>
                      <Field type="telephone" name="phone" />
                      {errors.phone && touched.phone ? (
                        <p className={s.error}>{errors.phone}</p>
                      ) : null}
                    </div>
                    <div className={s.input}>
                      <span>City</span>
                      <Field type="text" name="address.city" />
                    </div>
                    <div className={s.input}>
                      <span>Street</span>
                      <Field type="text" name="address.street" />
                    </div>
                  </div>
                  <button type="submit" className={s.btn}>
                    Create contact
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    );
  }
);
