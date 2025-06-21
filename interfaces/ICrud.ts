import { TMethods } from "../types";

export interface ICrud<T> {
  apiUrl: string;
  data? : T
  id?: string
  endpointName: string;
  method: TMethods;
}
