type AddressType = {
  street: string;
  city: string;
};
export type ContactsType = {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: AddressType;
};

export type UserType = {
  username: string;
  password: string;
};

export type mockType = {
  username: string;
  address: { zipcode: string };
};
