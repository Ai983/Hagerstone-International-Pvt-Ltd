import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useEstimator } from "./context";
import { FEATURES, PACKAGES, formatINR } from "./config";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp";

export const EstimatorProgress: React.FC = () => {
  const { step, totalSteps } = useEstimator();
  const pct = ((step + 1) / totalSteps) * 100;
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2 text-sm text-muted-foreground">
        <span>Step {step + 1} of {totalSteps}</span>
        <span>{step + 1}/{totalSteps}</span>
      </div>
      <div className="w-full bg-muted rounded-full h-2">
        <div className="bg-primary h-2 rounded-full transition-all" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
};

export const Step1Area: React.FC = () => {
  const { areaSqft, setArea } = useEstimator();
  return (
    <Card className="mb-6">
      <CardContent className="p-6 space-y-4">
        <h2 className="text-xl font-semibold text-center">What is your office area (in sq. ft)?</h2>
        <Input
          type="number"
          inputMode="numeric"
          placeholder="e.g., 2000"
          value={areaSqft ?? ""}
          onChange={(e) => setArea(e.target.value ? Number(e.target.value) : undefined)}
        />
      </CardContent>
    </Card>
  );
};

export const Step2Features: React.FC = () => {
  const { features, toggleFeature } = useEstimator();
  return (
    <Card className="mb-6">
      <CardContent className="p-6 space-y-4">
        <h2 className="text-xl font-semibold text-center">What all should be included in your office interiors?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {FEATURES.map((f) => (
            <label key={f.id} className="flex items-center gap-3 rounded-lg border p-3 cursor-pointer">
              <Checkbox checked={features.includes(f.id)} onCheckedChange={() => toggleFeature(f.id)} />
              <span>{f.label}</span>
            </label>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export const Step3Package: React.FC = () => {
  const { pkg, setPackage } = useEstimator();
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {Object.values(PACKAGES).map((p) => (
        <button key={p.id} onClick={() => setPackage(p.id)} className={`text-left rounded-xl border overflow-hidden transition ${pkg === p.id ? "border-primary" : "hover:border-primary/40"}`}>
          <img src={p.image} alt={p.title} className="h-40 w-full object-cover" />
          <div className="p-4">
            <div className="font-semibold mb-1">{p.title}</div>
            <div className="text-sm text-muted-foreground mb-2">{p.description}</div>
            <ul className="text-sm space-y-1">
              {p.bullets.map((b, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </button>
      ))}
    </div>
  );
};

export const Step4ContactOTP: React.FC = () => {
  const { name, email, phone, company, setContact, otpVerified, setOtpVerified } = useEstimator();
  const [sent, setSent] = React.useState(false);
  const [otp, setOtp] = React.useState("");

  const sendOtp = () => {
    if (!phone) return alert("Enter phone number first");
    setSent(true);
  };
  const verify = () => {
    if (otp.length === 6) setOtpVerified(true);
  };

  return (
    <Card className="mb-6">
      <CardContent className="p-6 space-y-4">
        <h2 className="text-xl font-semibold text-center">Your details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Input placeholder="Name" value={name ?? ""} onChange={e => setContact({ name: e.target.value })} />
          <Input placeholder="Email" type="email" value={email ?? ""} onChange={e => setContact({ email: e.target.value })} />
          <div className="flex gap-2 md:col-span-2">
            <Input placeholder="Phone number" value={phone ?? ""} onChange={e => setContact({ phone: e.target.value })} />
            <Button type="button" variant="secondary" onClick={sendOtp} disabled={sent}>
              {sent ? "OTP Sent" : "Send OTP"}
            </Button>
          </div>
          <Input placeholder="Company Name" value={company ?? ""} onChange={e => setContact({ company: e.target.value })} className="md:col-span-2" />
        </div>

        {sent && !otpVerified && (
          <div className="space-y-3">
            <div className="text-sm">Enter 6-digit OTP</div>
            <InputOTP maxLength={6} value={otp} onChange={setOtp}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
            <Button onClick={verify} disabled={otp.length !== 6}>Verify</Button>
          </div>
        )}

        {otpVerified && <div className="text-sm text-green-600">Phone verified ✓</div>}
      </CardContent>
    </Card>
  );
};

export const Step5Estimate: React.FC = () => {
  const { areaSqft, pkg } = useEstimator();
  if (!areaSqft || !pkg) return null;
  const p = PACKAGES[pkg];
  const rate = p.ratePerSqft;
  const compute = (r: number) => r * areaSqft;
  const display = Array.isArray(rate)
    ? `${formatINR(compute(rate[0]))} – ${formatINR(compute(rate[1]))}`
    : `${formatINR(compute(rate))}`;

  return (
    <Card>
      <CardContent className="p-6 space-y-2">
        <h2 className="text-xl font-semibold text-center">Your estimated budget range</h2>
        <div className="text-3xl font-bold text-center">{display}</div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4 text-sm">
          <div className="rounded-md border p-3">
            <div className="text-muted-foreground">Area</div>
            <div className="font-medium">{areaSqft} sq.ft</div>
          </div>
          <div className="rounded-md border p-3">
            <div className="text-muted-foreground">Package</div>
            <div className="font-medium">{p.title}</div>
          </div>
          <div className="rounded-md border p-3">
            <div className="text-muted-foreground">Rate</div>
            <div className="font-medium">{Array.isArray(p.ratePerSqft) ? `${formatINR(p.ratePerSqft[0])} – ${formatINR(p.ratePerSqft[1])}` : `${formatINR(p.ratePerSqft)}`} / sq.ft</div>
          </div>
        </div>
        <div className="pt-4 text-center">
          <Button asChild size="lg">
            <a href="/contact">Book a Free Consultation</a>
          </Button>
        </div>
        <div className="text-xs text-muted-foreground text-center">This is an indicative estimate and can be customized to your needs.</div>
      </CardContent>
    </Card>
  );
};


