import React from "react";
import { Button } from "@/components/ui/button";
import { EstimatorProgress, Step1Area, Step2Features, Step3Package, Step4ContactOTP, Step5Estimate } from "./Steps";
import { useEstimator } from "./context";

const EstimatorFlow: React.FC = () => {
  const { step, setStep, totalSteps, areaSqft, pkg, otpVerified, name, phone } = useEstimator();

  const canNext = () => {
    if (step === 0) return Boolean(areaSqft && areaSqft > 0);
    if (step === 1) return true;
    if (step === 2) return Boolean(pkg);
    if (step === 3) return Boolean(name && phone && otpVerified);
    return false;
  };

  const nextLabel = step === totalSteps - 2 ? (otpVerified ? "Reveal Estimate" : "Verify to Continue") : "Next";

  return (
    <div className="max-w-3xl mx-auto">
      <EstimatorProgress />

      {step === 0 && <Step1Area />}
      {step === 1 && <Step2Features />}
      {step === 2 && <Step3Package />}
      {step === 3 && <Step4ContactOTP />}
      {step === 4 && <Step5Estimate />}

      <div className="flex justify-between items-center mt-6">
        <Button variant="outline" onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0}>
          Back
        </Button>
        {step < totalSteps - 1 && (
          <Button onClick={() => setStep(step + 1)} disabled={!canNext()}>
            {nextLabel}
          </Button>
        )}
      </div>
    </div>
  );
};

export default EstimatorFlow;


