export interface UserEntity {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  createdAt: Date;
  updatedAt: Date;
}
