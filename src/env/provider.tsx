"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { getEnv } from "./env";


interface Env {
  env: unknown;
  isLoading: boolean;
  envLoaded: boolean;
  isLoadError: boolean;
  envLoadErrorMessage: string;
}

interface EnvContextType {
  env: Env;
  setEnv: React.Dispatch<React.SetStateAction<Env>>;
}

const initialConfig: Env = {
  env: {},
  isLoading: false,
  envLoaded: false,
  isLoadError: false,
  envLoadErrorMessage: ""
};


export const EnvContext = createContext<EnvContextType | undefined>(undefined);

export const EnvProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [env, setEnv] = useState<Env>(initialConfig);

  useEffect(() => {
    setEnv((prevConfig) => ({ ...prevConfig, env: {}, isLoading: true, envLoaded: false, isLoadError: false }));
    getEnv().then((env) => {
      //setEnv(env);
      setEnv((prevConfig) => ({ ...prevConfig, isLoading: false, envLoaded: true,  env: env}));
    }).catch(err => {
      setEnv((prevConfig) => ({ ...prevConfig, isLoading: false, envLoaded: false,
        isLoadError: true, envLoadErrorMessage: err }));
      console.error('ENV_CONFIG_ERROR:', err);
    });
  }, []);
  return <EnvContext.Provider value={{env, setEnv}}>{children}</EnvContext.Provider>;
};

export const useEnv = () => {
  const context = useContext(EnvContext);
  if (!context) {
      throw new Error('useEnv must be used within a ConfigProvider');
  }

  return context;
};