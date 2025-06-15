import { TMethods } from "../types/TMethods";

export interface IMethods {
  apiUrl: string;
  formData: FormData;
  endpointName: string;
  method: TMethods;
}
