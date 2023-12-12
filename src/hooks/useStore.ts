import { useReducer } from "react";
import {
  type Language,
  type Action,
  type State,
  type FromLanguage,
} from "../types.d";
import { AUTO_LANGUAGE } from "../utils/constants";

// 1. Create a initialState
const initialState: State = {
  fromLanguage: "auto",
  toLanguage: "en",
  fromText: "",
  toText: "",
  loading: false,
};

// 2. Create a reducer
function reducer(state: State, action: Action) {
  const { type } = action;

  if (type === "INTERCHANGE_LANGUAGES") {
    // State logic inside the reducer
    const loading = state.fromText !== "";
    if (state.fromLanguage === AUTO_LANGUAGE) return state;
    return {
      ...state,
      fromLanguage: state.toLanguage,
      toLanguage: state.fromLanguage,
      fromText: state.toText,
      toText: "",
      loading,
    };
  }

  if (type === "SET_FROM_LANGUAGE") {
    const loading = state.fromText !== "";
    if (state.fromLanguage === action.payload) return state;
    const newFromLanguage = action.payload;
    let newToLanguage = state.toLanguage;
    if (newFromLanguage === newToLanguage) {
      newToLanguage = newFromLanguage === "en" ? "es" : "en";
    }
    return {
      ...state,
      fromLanguage: newFromLanguage,
      toLanguage: newToLanguage,
      toText: "",
      loading,
    };
  }

  if (type === "SET_TO_LANGUAGE") {
    const loading = state.fromText !== "";
    if (state.toLanguage === action.payload) return state;
    const newToLanguage = action.payload;
    let newFromLanguage = state.fromLanguage;
    if (newToLanguage === newFromLanguage) {
      newFromLanguage = newToLanguage === "en" ? "es" : "en";
    }
    return {
      ...state,
      fromLanguage: newFromLanguage,
      toLanguage: newToLanguage,
      toText: "",
      loading,
    };
  }

  if (type === "SET_FROM_TEXT") {
    const loading = action.payload !== "";
    return {
      ...state,
      loading,
      fromText: action.payload,
      toText: "",
    };
  }

  if (type === "SET_TO_TEXT") {
    return {
      ...state,
      loading: false,
      toText: action.payload,
    };
  }

  return state;
}

export default function useStore() {
  // 3. Create a useReducer
  const [{ fromLanguage, toLanguage, fromText, toText, loading }, dispatch] =
    useReducer(reducer, initialState);

  const interChangeLanguages = () => {
    dispatch({ type: "INTERCHANGE_LANGUAGES" });
  };

  const setFromLanguage = (payload: FromLanguage) => {
    dispatch({ type: "SET_FROM_LANGUAGE", payload });
  };

  const setToLanguage = (payload: Language) => {
    dispatch({ type: "SET_TO_LANGUAGE", payload });
  };

  const setFromText = (payload: string) => {
    dispatch({ type: "SET_FROM_TEXT", payload });
  };

  const setToText = (payload: string) => {
    dispatch({ type: "SET_TO_TEXT", payload });
  };

  return {
    fromLanguage,
    toLanguage,
    fromText,
    toText,
    loading,
    interChangeLanguages,
    setFromLanguage,
    setToLanguage,
    setFromText,
    setToText,
  };
}
