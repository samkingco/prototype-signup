import { AppState } from "..";
import { Account, Patient } from "./fake-data";

export interface ComputedAccount extends Account {}

function getAccount(state: AppState): ComputedAccount {
  return state.account;
}

function getPatient(state: AppState): Patient {
  const account = getAccount(state);
  return account.patient;
}

export const accountSelectors = {
  getAccount,
  getPatient,
};
