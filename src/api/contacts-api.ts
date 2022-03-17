import axios from "axios";
import { ContactsType } from "../types/types";

const instance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/",
  headers: {
    "Content-type": "application/json; charset=UTF-8",
  },
});

const contactsAPI = {
  getContacts(page: number, limit: number) {
    return instance
      .get(`users`, {
        params: {
          _limit: limit,
          _page: page,
        },
      })
      .then((response) => {
        return response;
      });
  },
  createContact(contact: ContactsType) {
    return instance
      .post(`users`, {
        body: contact,
      })
      .then((response) => {
        return response.data;
      });
  },
  deleteContact(contactId: number) {
    return instance.delete(`users/${contactId}`);
  },
  changeContact(contact: ContactsType, contactId: number) {
    return instance
      .put(`users/${contactId}`, {
        body: contact,
      })
      .then((response) => {
        return response.data;
      });
  },
};

export default contactsAPI;
