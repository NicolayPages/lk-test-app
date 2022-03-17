import React, { FC, memo, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import editIcon from "../../assets/images/edit.png";
import { ContactItem } from "../../components/ContactItem/ContactItem";
import { CreateForm } from "../../components/CreateForm/CreateForm";
import Paginator from "../../components/Paginator/Paginator";
import Preloader from "../../components/Preloader/Preloader";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import {
  actions,
  changeContact,
  createNewContact,
  deleteContact,
  requestContacts,
} from "../../redux/reducers/contacts-reducer";
import { ContactsType } from "../../types/types";
import s from "./Contacts.module.scss";
import { SearchForm } from "./SearchForm";

const Contacts: FC = memo(() => {
  const dispatch = useDispatch();
  const { contacts, isFetching, limit, page, totalCount } = useTypedSelector(
    (state) => state.contacts
  );
  const [isCreate, setIsCreate] = useState(false);
  const { setFindedContacts } = actions;

  useEffect(() => {
    if (contacts.length == 0) {
      dispatch(requestContacts(page, limit));
    }
  }, []);

  const findContact = (term: string) => {
    dispatch(setFindedContacts(term));
  };

  const onCreateMode = () => {
    setIsCreate(true);
  };
  const offCreateMode = () => {
    setIsCreate(false);
  };
  const createContact = (contactBody: ContactsType) => {
    dispatch(createNewContact(contactBody));
  };
  const onDeleteContact = (id: number) => {
    dispatch(deleteContact(id));
  };
  const onChangeContact = (contact: ContactsType, contactId: number) => {
    dispatch(changeContact(contact, contactId));
  };

  const onPageChanged = (page: number) => {
    dispatch(requestContacts(page, limit));
  };

  return (
    <div className={s.container}>
      <div className={s.create}>
        <button onClick={onCreateMode} className={s.createBtn}>
          Create new contact
          <span>
            <img src={editIcon} alt="create" />
          </span>
        </button>
      </div>
      <SearchForm findContact={findContact} />
      {isFetching ? (
        <Preloader />
      ) : (
        <div className={s.contacts}>
          {contacts.map((c) => (
            <ContactItem
              onChangeContact={onChangeContact}
              onDeleteContact={onDeleteContact}
              key={c.id}
              {...c}
            />
          ))}
        </div>
      )}
      <div className={s.pagination}>
        <Paginator
          totalCount={totalCount}
          pageSize={limit}
          currentPage={page}
          onPageChanged={onPageChanged}
        />
      </div>

      {isCreate ? (
        <CreateForm
          createContact={createContact}
          offCreateMode={offCreateMode}
          id={contacts.length + 1}
        />
      ) : null}
    </div>
  );
});

export default Contacts;
