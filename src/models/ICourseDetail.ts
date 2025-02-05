import { ICourse } from './ICourse';

export interface IMovieDetail extends ICourse {
  genres: [{ name: string }];
  runtime: number;
}
