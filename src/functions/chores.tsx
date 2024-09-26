import { ChoreType } from '../types/ChoresType';
import { choreFrequency } from './choreConstants';

export const findChoreById = (choreId: string, chores: ChoreType[]) => {
  return chores.find((chore: { id: string }) => chore.id === choreId);
};

export const findChoreFrequencyById = (id: string) => {
  return choreFrequency.find((frequency) => frequency.id === id);
};
