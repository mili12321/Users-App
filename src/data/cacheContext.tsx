import React, { createContext, ReactNode, useState } from "react";
import { Response } from "./types";

interface CacheContextProps {
  cachedData: Record<string, Response>;
  addToCache: (url: string, data: Response) => void;
}

export const CacheContext = createContext<CacheContextProps | undefined>(
  undefined
);

export const CacheProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cachedData, setCachedData] = useState<Record<string, Response>>({});

  const addToCache = (url: string, data: Response) => {
    setCachedData((prevData) => ({ ...prevData, [url]: data }));
  };

  const contextValue: CacheContextProps = {
    cachedData,
    addToCache,
  };

  return (
    <CacheContext.Provider value={contextValue}>
      {children}
    </CacheContext.Provider>
  );
};
