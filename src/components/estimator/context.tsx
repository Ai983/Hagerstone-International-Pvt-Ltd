import React, { createContext, useContext, useMemo, useState } from "react";
import type { FeatureId, PackageId } from "./config";

type EstimatorState = {
  step: number;
  areaSqft?: number;
  features: FeatureId[];
  pkg?: PackageId;
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  otpVerified: boolean;
};

type EstimatorContextType = EstimatorState & {
  totalSteps: number;
  setStep: (s: number) => void;
  setArea: (n?: number) => void;
  toggleFeature: (f: FeatureId) => void;
  setPackage: (p: PackageId) => void;
  setContact: (data: Partial<Pick<EstimatorState, "name" | "email" | "phone" | "company">>) => void;
  setOtpVerified: (v: boolean) => void;
  reset: () => void;
};

const EstimatorContext = createContext<EstimatorContextType | null>(null);

export const EstimatorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<EstimatorState>({ step: 0, features: [], otpVerified: false });

  const api = useMemo<EstimatorContextType>(() => ({
    ...state,
    totalSteps: 5,
    setStep: (s) => setState((v) => ({ ...v, step: s })),
    setArea: (n) => setState((v) => ({ ...v, areaSqft: n })),
    toggleFeature: (f) => setState((v) => ({ ...v, features: v.features.includes(f) ? v.features.filter(x => x !== f) : [...v.features, f] })),
    setPackage: (p) => setState((v) => ({ ...v, pkg: p })),
    setContact: (data) => setState((v) => ({ ...v, ...data })),
    setOtpVerified: (otpVerified) => setState((v) => ({ ...v, otpVerified })),
    reset: () => setState({ step: 0, features: [], otpVerified: false })
  }), [state]);

  return <EstimatorContext.Provider value={api}>{children}</EstimatorContext.Provider>;
};

export const useEstimator = () => {
  const ctx = useContext(EstimatorContext);
  if (!ctx) throw new Error("useEstimator must be used within EstimatorProvider");
  return ctx;
};


