export interface Address {
  id: string;
  name?: string;
  line1: string;
  line2?: string;
  city: string;
  postcode: string;
  phone?: string;
}

export type PatientGender =
  | "Male"
  | "Female"
  | "Non-binary"
  | "None"
  | undefined;

export interface Patient {
  id: string;
  isNoK?: boolean;
  firstName: string;
  lastName: string;
  dateOfBirth?: number;
  gender: PatientGender;
  postcode?: string;
  nhsNumber: string;
  gpSurgery: Address;
  knowsNHSNumber?: boolean;
  nominateOnSignup?: boolean;
}

export interface Account {
  email: string;
  emailVerified: boolean;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  phoneVerified: boolean;
  patient: Patient;
  hasAgreedToTerms: boolean;
  hasAgreedToMarketing: boolean;
}

const FakePatient: Patient = {
  id: "1",
  isNoK: undefined,
  firstName: "",
  lastName: "",
  dateOfBirth: undefined,
  gender: undefined,
  nhsNumber: "",
  knowsNHSNumber: true,
  nominateOnSignup: true,
  gpSurgery: {
    id: "gp_1",
    name: "Richmond Road Medical Centre",
    line1: "136 Richmond Rd",
    line2: "Hackney",
    city: "London",
    postcode: "E8 3HN",
    phone: "020 7254 2298",
  },
};

export const accountFakeData: Account = {
  email: "",
  emailVerified: false,
  password: "",
  firstName: "",
  lastName: "",
  phone: "",
  phoneVerified: false,
  patient: FakePatient,
  hasAgreedToTerms: false,
  hasAgreedToMarketing: false,
};

export const fallbackPatient: Partial<Patient> = {
  firstName: "Charlie",
  lastName: "Hatton",
  gender: "None",
};
