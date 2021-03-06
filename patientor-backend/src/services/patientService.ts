import patients from '../../data/patients';
import { PatientEntry, PublicPatientEntry, NewPatientEntry } from '../types';
import {v1 as uuid} from 'uuid';

const getEntries = (): PatientEntry [] => {
  return patients;
};

const getPublicEntries = (): PublicPatientEntry []  => {
  return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const findById = (id: string): PatientEntry | undefined => {
  const patient = patients.find(p => p.id === id);
  console.log(patient);
  return patient;
};

const addPatient = (entry: NewPatientEntry): PatientEntry => {
  const id: string = uuid();
  const newPatientEntry = {
    id,
    ...entry
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getEntries,
  getPublicEntries,
  addPatient,
  findById
};