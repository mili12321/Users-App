/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useReducer } from "react";
import { Response } from "../types";
import { useCache } from "./useCache";

type State = {
  response: any;
  isLoading: boolean;
  error: any;
};

type Action = {
  type: string;
  response?: Response;
  error?: any;
};

function reducer(state: State, { type, response, error }: Action) {
  switch (type) {
    case "loading":
      return { ...state, isLoading: true };
    case "success":
      return { response, isLoading: false, error: null };
    case "error":
      return { response: null, isLoading: false, error };
    default:
      throw new Error("unknown action type");
  }
}

export function useFetch(url: string): State {
  const { cachedData, addToCache } = useCache();
  const [state, dispatch] = useReducer(reducer, {
    response: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    let shouldCancel = false;

    const fetchData = async (): Promise<void> => {
      dispatch({ type: "loading" });

      try {
        const cachedEntry = cachedData[url];
        if (cachedEntry) {
          dispatch({ type: "success", response: cachedEntry });
          return;
        }

        const res = await fetch(url);
        const response = await res.json();
        addToCache(url, response);

        if (shouldCancel) return;
        dispatch({ type: "success", response });
      } catch (error) {
        if (shouldCancel) return;
        dispatch({
          type: "error",
          error,
          response: { results: [], info: null },
        });
      }
    };

    fetchData();

    return () => {
      shouldCancel = true;
    };
  }, [url, cachedData, addToCache]);

  return state;
}
