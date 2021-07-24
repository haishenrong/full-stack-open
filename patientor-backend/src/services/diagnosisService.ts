import diagnoses from '../../data/diagnoses';
import { DiagnosisEntry } from '../types';

const getEntries = (): DiagnosisEntry[] => {
  return diagnoses;
};

const addEntry = () => {
  return null;
};

export default {
  getEntries,
  addEntry
};