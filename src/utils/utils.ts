import { Transform } from "class-transformer";

export const frDateTransform = (date: string) => {
      const [d, m, y] = date.split('/');
      const newDate = new Date(+y, +m - 1, +d);
      console.log(newDate)
      return newDate
}