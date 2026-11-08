export interface User {
    id: string;
    email: string;
    ime: string | null;
    priimek: string | null;
}

export interface UserData {
  email?: string
  ime?: string | null
  priimek?: string | null
}