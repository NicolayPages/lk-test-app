import { ThunkAction } from "redux-thunk";
import contactsAPI from "../../api/contacts-api";
import { ContactsType } from "../../types/types";
import { AppStateType, InferActionsTypes } from "../redux";

type initialStateType = typeof initialState;
type ThunkType = ThunkAction<void, AppStateType, unknown, ActionTypes>;
type ActionTypes = InferActionsTypes<typeof actions>;

let initialState = {
  isFetching: false,
  contacts: [] as Array<ContactsType>,
  limit: 5,
  totalCount: 0,
  page: 1,
};

const contactsReducer = (
  state = initialState,
  action: ActionTypes
): initialStateType => {
  switch (action.type) {
    case "TOGGLE_IS_FETCHING": {
      return {
        ...state,
        isFetching: action.isFetching,
      };
    }
    case "SET_CONTACTS": {
      return {
        ...state,
        contacts: action.contacts,
      };
    }
    case "SET_NEW_CONTACT": {
      return {
        ...state,
        contacts: [action.contact, ...state.contacts],
      };
    }
    case "DELETE_CONTACT": {
      return {
        ...state,
        contacts: state.contacts.filter((c) => c.id != action.contactId),
      };
    }
    case "CHANGE_CONTACT":
      return {
        ...state,
        contacts: state.contacts.map((c) => {
          if (c.id == action.payload.contactId) {
            return action.payload.contact;
          }
          return c;
        }),
      };
    case "FIND_CONTACT":
      return {
        ...state,
        contacts: state.contacts.filter((c) =>
          c.name.toLowerCase().includes(action.term.toLowerCase())
        ),
      };
    case "SET_TOTAL_COUNT":
      return {
        ...state,
        totalCount: action.totalCount,
      };
    case "SET_PAGE":
      return {
        ...state,
        page: action.page,
      };
    default:
      return state;
  }
};

export const actions = {
  toggleIsFetching: (isFetching: boolean) =>
    ({ type: "TOGGLE_IS_FETCHING", isFetching } as const),
  setContacts: (contacts: Array<ContactsType>) =>
    ({ type: "SET_CONTACTS", contacts } as const),
  setNewContact: (contact: ContactsType) =>
    ({ type: "SET_NEW_CONTACT", contact } as const),
  setDeleteContact: (contactId: number) =>
    ({ type: "DELETE_CONTACT", contactId } as const),
  setFindedContacts: (term: string) =>
    ({ type: "FIND_CONTACT", term } as const),
  setChangeContact: (contact: ContactsType, contactId: number) =>
    ({ type: "CHANGE_CONTACT", payload: { contact, contactId } } as const),
  setTotalCount: (totalCount: number) =>
    ({ type: "SET_TOTAL_COUNT", totalCount } as const),
  setPage: (page: number) => ({ type: "SET_PAGE", page } as const),
};

export const requestContacts =
  (page: number, limit: number): ThunkType =>
  async (dispatch) => {
    try {
      dispatch(actions.toggleIsFetching(true));
      dispatch(actions.setPage(page));
      const response = await contactsAPI.getContacts(page, limit);
      dispatch(
        actions.setTotalCount(Number(response.headers["x-total-count"]))
      );
      dispatch(actions.setContacts(response.data));
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(actions.toggleIsFetching(false));
    }
  };
export const createNewContact =
  (contactBody: ContactsType): ThunkType =>
  async (dispatch) => {
    try {
      const data = await contactsAPI.createContact(contactBody);
      dispatch(actions.setNewContact(data.body));
    } catch (error) {
      console.log(error);
    }
  };
export const deleteContact =
  (contactId: number): ThunkType =>
  async (dispatch) => {
    try {
      const response = await contactsAPI.deleteContact(contactId);
      if (response.status == 200) {
        dispatch(actions.setDeleteContact(contactId));
      }
    } catch (error) {
      console.log(error);
    }
  };
export const changeContact =
  (contact: ContactsType, contactId: number): ThunkType =>
  async (dispatch) => {
    try {
      const data = await contactsAPI.changeContact(contact, contactId);
      dispatch(actions.setChangeContact(data.body, data.body.id));
    } catch (error) {
      console.log(error);
    }
  };

export default contactsReducer;