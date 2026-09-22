"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface LowDataContextType {
  isLowData: boolean;
  toggleLowData: () => void;
  setLowData: (enabled: boolean) => void;
  isOnline: boolean;
  estimatedDataSavedMb: number;
}

const LowDataContext = createContext<LowDataContextType>({
  isLowData: false,
  toggleLowData: () => {},
  setLowData: () => {},
  isOnline: true,
  estimatedDataSavedMb: 0,
});

export function LowDataProvider({ children }: { children: React.ReactNode }) {
  const [isLowData, setIsLowDataState] = useState<boolean>(false);
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [estimatedDataSavedMb, setEstimatedDataSavedMb] = useState<number>(0);

  // Initialize from localStorage or browser connection API
  useEffect(() => {
    if (typeof window === "undefined") return;

    // 1. Check network online status
    setIsOnline(navigator.onLine);
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // 2. Check saved user preference
    const savedPref = localStorage.getItem("skillora_low_data_mode");
    if (savedPref !== null) {
      const enabled = savedPref === "true";
      setIsLowDataState(enabled);
      applyClassToDom(enabled);
    } else {
      // 3. Auto-detect Save-Data header or slow 2G/3G connection
      const navConn = (navigator as unknown as { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
      if (navConn?.saveData === true || navConn?.effectiveType === "2g" || navConn?.effectiveType === "3g") {
        setIsLowDataState(true);
        applyClassToDom(true);
      }
    }

    // 4. Calculate approximate data saved telemetry
    const savedTracker = parseInt(localStorage.getItem("skillora_data_saved_mb") || "42", 10);
    setEstimatedDataSavedMb(savedTracker);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const applyClassToDom = (enabled: boolean) => {
    if (typeof document === "undefined") return;
    if (enabled) {
      document.documentElement.classList.add("low-data-mode");
      document.body.classList.add("low-data-mode");
    } else {
      document.documentElement.classList.remove("low-data-mode");
      document.body.classList.remove("low-data-mode");
    }
  };

  const setLowData = (enabled: boolean) => {
    setIsLowDataState(enabled);
    applyClassToDom(enabled);
    if (typeof window !== "undefined") {
      localStorage.setItem("skillora_low_data_mode", enabled ? "true" : "false");
      if (enabled) {
        const currentSaved = estimatedDataSavedMb + 5;
        setEstimatedDataSavedMb(currentSaved);
        localStorage.setItem("skillora_data_saved_mb", currentSaved.toString());
      }
    }
  };

  const toggleLowData = () => {
    setLowData(!isLowData);
  };

  return (
    <LowDataContext.Provider
      value={{
        isLowData,
        toggleLowData,
        setLowData,
        isOnline,
        estimatedDataSavedMb,
      }}
    >
      {children}
    </LowDataContext.Provider>
  );
}

export function useLowData() {
  const context = useContext(LowDataContext);
  if (!context) {
    throw new Error("useLowData must be used within a LowDataProvider");
  }
  return context;
}

