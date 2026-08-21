interface AuthUser {
  _id: string;
  name: string;
  phone: string;
  createdAt?: string;
  updatedAt?: string;
}

interface User extends AuthUser {}

