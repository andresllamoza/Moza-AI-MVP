import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { IndustrySelector } from '@/components/IndustrySelector';
import { IndustrySpecificDemo } from '@/components/demo/IndustrySpecificDemo';

export const IndustryDemoPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(
    searchParams.get('industry')
  );

  const handleIndustrySelect = (industry: string) => {
    setSelectedIndustry(industry);
  };

  const handleBack = () => {
    setSelectedIndustry(null);
    navigate('/industry-selector');
  };

  if (selectedIndustry) {
    return <IndustrySpecificDemo industry={selectedIndustry} onBack={handleBack} />;
  }

  return (
    <div>
      <IndustrySelector onIndustrySelect={handleIndustrySelect} />
    </div>
  );
};
