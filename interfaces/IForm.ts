import { TMethods } from "../types";
import { IModals } from "./IModal";

export interface IForms<T> extends IModals {
  initialdata?: T;
  method: TMethods;
  props ?: T | null
}
