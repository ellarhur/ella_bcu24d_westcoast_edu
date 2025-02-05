export interface Course {
  id: number;
  title: string;
  number: string;
  days: number;
  classroom: boolean;
  online: boolean;
  image: string;
  dates: string[];
  students: string[];
  average: string;
  teacher: string;
  description: string;
}