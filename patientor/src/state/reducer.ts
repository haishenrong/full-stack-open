import { State } from "./state";
import { Diagnosis, Patient } from "../types";


export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "SET_DIAGNOSES";
      payload: Diagnosis[];
    };
export const setPatientList = (patients:Patient[]) => 
{
  return {
    type: "SET_PATIENT_LIST",
    payload: patients
  }as Action;
};

export const setDiagnoses= (diagnoses:Diagnosis[]) => 
{
  return {
    type: "SET_DIAGNOSES",
    payload: diagnoses
  }as Action;
};
export const addPatient = (patient:Patient) => 
{
  return {
    type: "ADD_PATIENT",
    payload: patient
  }as Action;
};
export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
      case "SET_DIAGNOSES":
        return {
          ...state,
          diagnoses: {
            ...action.payload.reduce(
              (memo, diagnosis) => ({ ...memo,[diagnosis.code]: diagnosis }),
              {}
            ),
            ...state.diagnoses
          }
        };
    default:
      return state;
  }
};
