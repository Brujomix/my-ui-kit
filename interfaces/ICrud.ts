import { TMethods } from "../types";

export interface ICrud {
  apiUrl: string;
  data? : Record<string, unknown>
  id?: string
  endpointName: string;
  method: TMethods;
}
