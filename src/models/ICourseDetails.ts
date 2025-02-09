import { ICourse } from './ICourse';

export interface ICourseDetails extends ICourse {
  genres: [{ name: string }];
  duration: number;
}
