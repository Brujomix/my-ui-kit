import { IMethods } from "./IMethods";
import { IModals } from "./IModal";

export interface IForms extends IModals, IMethods {
  initialData?: unknown;
  isEdit?: boolean;
}