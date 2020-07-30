import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Dispatch } from "..";
import { accountFakeData, Account, Patient } from "./fake-data";

const initialState: Account = accountFakeData;

export const { actions, reducer } = createSlice({
  name: "account",
  initialState,
  reducers: {
    reset: () => initialState,
    setAccountDetails: (state, action: PayloadAction<Partial<Account>>) => {
      const newState = {
        ...state,
        ...action.payload,
      };

      return newState;
    },
    setPatientDetails: (state, action: PayloadAction<Partial<Patient>>) => {
      state.patient = {
        ...state.patient,
        ...action.payload,
      };
    },
  },
});

export function reset() {
  return function (dispatch: Dispatch) {
    dispatch(actions.reset());
  };
}

export function setAccountDetails(account: Partial<Account>) {
  return function (dispatch: Dispatch) {
    dispatch(actions.setAccountDetails(account));
  };
}

export function setPatientDetails(patient: Partial<Patient>) {
  return function (dispatch: Dispatch) {
    dispatch(actions.setPatientDetails(patient));
  };
}
