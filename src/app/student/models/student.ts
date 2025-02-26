import { IPerson } from '../../shared/models/person';

export interface IStudent extends IPerson {
  gradeId: number;
  gradeLabel: string;
}
