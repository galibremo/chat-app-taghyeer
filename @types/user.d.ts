interface AuthUser {
  _id: string;
  name: string;
  phone: string;
  createdAt?: string;
  updatedAt?: string;
}

type User = AuthUser;

