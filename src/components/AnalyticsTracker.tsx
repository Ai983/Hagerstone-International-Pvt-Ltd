// src/components/AnalyticsTracker.tsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { sendPageView } from '@/integrations/ga';

export default function AnalyticsTracker() {
  const location = useLocation();

  useEffect(() => {
    sendPageView(location.pathname + location.search);
  }, [location]);

  return null;
}
