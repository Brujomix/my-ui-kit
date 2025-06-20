import { TMethods } from "../types";
import { IModals } from "./IModal";

export interface IForms<T = undefined> extends IModals {
  initialdata?: Record<string, unknown>;
  method: TMethods;
  props ?: T | null
}
