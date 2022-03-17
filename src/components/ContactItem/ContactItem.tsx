import { Field, Form, Formik } from "formik";
import React, { FC, memo, useState } from "react";
import deleteIcon from "../../assets/images/delete.png";
import editIcon from "../../assets/images/edit.png";
import { ContactsType } from "../../types/types";
import s from "./ContactItem.module.scss";

type PropsType = {
  onDeleteContact: (id: number) => void;
  onChangeContact: (contact: ContactsType, contactId: number) => void;
};

export const ContactItem: FC<ContactsType & PropsType> = memo((props) => {
  const { id, name, email, phone, address, onDeleteContact, onChangeContact } =
    props;
  const [editMode, setEditMode] = useState(false);

  const deleteContact = () => {
    onDeleteContact(id);
  };
  const onSubmit = (values: ContactsType) => {
    onChangeContact(values, id);
    setEditMode(false);
  };
  const onEditMode = () => {
    setEditMode(true);
  };

  const initialValues: ContactsType = {
    id,
    name,
    email,
    phone,
    address: {
      city: address.city,
      street: address.street,
    },
  };

  return (
    <div className={s.contact}>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        <Form className={s.main}>
          <h2 className={s.name}>
            {editMode ? (
              <Field
                autoFocus
                type="text"
                name="name"
                className={s.nameInput}
              />
            ) : (
              name
            )}
          </h2>
          <div className={s.content}>
            <p className={s.info}>
              <span>Email: </span>
              {editMode ? (
                <Field type="text" name="email" className={s.editInput} />
              ) : (
                email
              )}
            </p>
            <p className={s.info}>
              <span>Phone: </span>
              {editMode ? (
                <Field type="telephone" name="phone" className={s.editInput} />
              ) : (
                phone
              )}
            </p>
            <p className={s.info}>
              <span>City: </span>
              {editMode ? (
                <Field
                  type="text"
                  name="address.city"
                  className={s.editInput}
                />
              ) : (
                address.city
              )}
            </p>
            <p className={s.info}>
              <span>Street: </span>
              {editMode ? (
                <Field
                  type="text"
                  name="address.street"
                  className={s.editInput}
                />
              ) : (
                address.street
              )}
            </p>
          </div>
          {editMode ? (
            <button className={s.btn} type="submit">
              Save change
            </button>
          ) : null}
        </Form>
      </Formik>
      <div className={s.actions}>
        <button onClick={onEditMode} className={s.actionBtn}>
          <img src={editIcon} alt="edit" />
        </button>
        <button onClick={deleteContact} className={s.actionBtn}>
          <img src={deleteIcon} alt="delete" />
        </button>
      </div>
    </div>
  );
});
