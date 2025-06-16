import { TMethods } from "../types";
import { IModals } from "./IModal";

export interface IForms extends IModals {
  initialdata?: Record<string, unknown>;
  method: TMethods;
}
