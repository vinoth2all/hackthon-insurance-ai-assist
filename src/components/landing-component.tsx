"use client"
import { useEnv } from "@/env/provider";
import MainContent from "./main-content";

export default function LandingComponet() {
  const { env } = useEnv();

  if(!env.envLoaded && !env.isLoadError){
    return <div className="app-loading">Loading...</div>
  }

  if(!env.envLoaded && env.isLoadError){
    //console.log("APP_LOADINF_ERROR: ", env.envLoadErrorMessage)
    return <div className="app-loading-error">Something went wrong!, Please try again later.</div>
  }

    return (<>
        <MainContent />
    </>);
  }