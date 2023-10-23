import {
  type SUPPORTED_LANGUAGES,
  type AUTO_LANGUAGE,
} from "./utils/constants";

export type Language = keyof typeof SUPPORTED_LANGUAGES;
export type AutoLanguage = typeof AUTO_LANGUAGE;
export type FromLanguage = Language | AutoLanguage;

export interface State {
  fromLanguage: FromLanguage;
  toLanguage: Language;
  fromText: string;
  toText: string;
  loading: boolean;
}

export type Action =
  | { type: "SET_FROM_LANGUAGE"; payload: FromLanguage }
  | { type: "SET_TO_LANGUAGE"; payload: Language }
  | { type: "SET_FROM_TEXT"; payload: string }
  | { type: "SET_TO_TEXT"; payload: string }
  | { type: "INTERCHANGE_LANGUAGES" };

export enum SectionType {
  From = "from",
  To = "to",
}
