import React, { useState } from 'react';
import { Calculator, DollarSign, Calendar, Percent, FileText, Info } from 'lucide-react';

type CalculatorType = 'stamp-duty' | 'court-fees' | 'interest' | 'gratuity' | 'notice-period' | 'limitation';

interface CalculationResult {
  amount: number;
  breakdown: { [key: string]: number };
  details: string[];
  applicableLaw: string;
}

const LegalCalculator: React.FC = () => {
  const [activeCalculator, setActiveCalculator] = useState<CalculatorType>('stamp-duty');
  const [result, setResult] = useState<CalculationResult | null>(null);

  const calculators = [
    { id: 'stamp-duty', name: 'Stamp Duty', icon: FileText, description: 'Calculate stamp duty for property transactions' },
    { id: 'court-fees', name: 'Court Fees', icon: DollarSign, description: 'Calculate court fees for legal proceedings' },
    { id: 'interest', name: 'Interest Calculator', icon: Percent, description: 'Calculate interest on delayed payments' },
    { id: 'gratuity', name: 'Gratuity Calculator', icon: Calendar, description: 'Calculate gratuity amount for employees' },
    { id: 'notice-period', name: 'Notice Period', icon: Calendar, description: 'Calculate notice period compensation' },
    { id: 'limitation', name: 'Limitation Period', icon: Calendar, description: 'Check limitation periods for legal actions' }
  ];

  const renderCalculator = () => {
    switch (activeCalculator) {
      case 'stamp-duty':
        return <StampDutyCalculator onResult={setResult} />;
      case 'court-fees':
        return <CourtFeesCalculator onResult={setResult} />;
      case 'interest':
        return <InterestCalculator onResult={setResult} />;
      case 'gratuity':
        return <GratuityCalculator onResult={setResult} />;
      case 'notice-period':
        return <NoticePeriodCalculator onResult={setResult} />;
      case 'limitation':
        return <LimitationCalculator onResult={setResult} />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <Calculator className="h-8 w-8 text-green-600" />
          <h1 className="text-3xl font-bold text-gray-900">Legal Calculators</h1>
        </div>
        <p className="text-lg text-gray-600">
          Calculate legal fees, duties, and other amounts with precision
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Calculator Selection */}
        <div className="lg:col-span-1">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Select Calculator</h2>
          <div className="space-y-2">
            {calculators.map(calc => {
              const Icon = calc.icon;
              return (
                <button
                  key={calc.id}
                  onClick={() => {
                    setActiveCalculator(calc.id as CalculatorType);
                    setResult(null);
                  }}
                  className={`w-full text-left p-4 rounded-lg border transition-colors ${
                    activeCalculator === calc.id
                      ? 'bg-green-50 border-green-200 text-green-900'
                      : 'bg-white border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="h-5 w-5" />
                    <div>
                      <div className="font-medium">{calc.name}</div>
                      <div className="text-sm text-gray-600">{calc.description}</div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Calculator Form */}
        <div className="lg:col-span-2">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            {renderCalculator()}
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-1">
          {result && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-green-900 mb-4">Calculation Result</h3>
              
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-900">
                    ₹{result.amount.toLocaleString('en-IN')}
                  </div>
                  <div className="text-sm text-green-700">Total Amount</div>
                </div>

                {Object.keys(result.breakdown).length > 0 && (
                  <div>
                    <h4 className="font-medium text-green-900 mb-2">Breakdown:</h4>
                    <div className="space-y-1">
                      {Object.entries(result.breakdown).map(([key, value]) => (
                        <div key={key} className="flex justify-between text-sm">
                          <span className="text-green-700">{key}:</span>
                          <span className="font-medium">₹{value.toLocaleString('en-IN')}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {result.details.length > 0 && (
                  <div>
                    <h4 className="font-medium text-green-900 mb-2">Details:</h4>
                    <ul className="space-y-1">
                      {result.details.map((detail, index) => (
                        <li key={index} className="text-sm text-green-700">• {detail}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="pt-4 border-t border-green-200">
                  <div className="flex items-center space-x-2 text-sm text-green-700">
                    <Info className="h-4 w-4" />
                    <span>Based on: {result.applicableLaw}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Stamp Duty Calculator Component
const StampDutyCalculator: React.FC<{ onResult: (result: CalculationResult) => void }> = ({ onResult }) => {
  const [propertyValue, setPropertyValue] = useState('');
  const [state, setState] = useState('Maharashtra');
  const [propertyType, setPropertyType] = useState('residential');

  const calculate = () => {
    const value = parseFloat(propertyValue);
    if (!value) return;

    // Simplified stamp duty calculation (Maharashtra rates)
    let stampDutyRate = 0.05; // 5% for residential
    if (propertyType === 'commercial') stampDutyRate = 0.06; // 6% for commercial

    const stampDuty = value * stampDutyRate;
    const registrationFee = value * 0.01; // 1% registration fee
    const total = stampDuty + registrationFee;

    onResult({
      amount: total,
      breakdown: {
        'Stamp Duty': stampDuty,
        'Registration Fee': registrationFee
      },
      details: [
        `Property Value: ₹${value.toLocaleString('en-IN')}`,
        `Stamp Duty Rate: ${(stampDutyRate * 100)}%`,
        `Registration Fee: 1%`,
        `State: ${state}`
      ],
      applicableLaw: 'Indian Stamp Act, 1899 & State Stamp Acts'
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Stamp Duty Calculator</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Property Value (₹)</label>
          <input
            type="number"
            value={propertyValue}
            onChange={(e) => setPropertyValue(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
            placeholder="Enter property value"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
          <select
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          >
            <option value="Maharashtra">Maharashtra</option>
            <option value="Delhi">Delhi</option>
            <option value="Karnataka">Karnataka</option>
            <option value="Tamil Nadu">Tamil Nadu</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
          <select
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          >
            <option value="residential">Residential</option>
            <option value="commercial">Commercial</option>
          </select>
        </div>

        <button
          onClick={calculate}
          className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
        >
          Calculate Stamp Duty
        </button>
      </div>
    </div>
  );
};

// Court Fees Calculator Component
const CourtFeesCalculator: React.FC<{ onResult: (result: CalculationResult) => void }> = ({ onResult }) => {
  const [claimAmount, setClaimAmount] = useState('');
  const [courtType, setCourtType] = useState('district');

  const calculate = () => {
    const amount = parseFloat(claimAmount);
    if (!amount) return;

    let courtFee = 0;
    
    // Simplified court fee calculation
    if (amount <= 1000) {
      courtFee = 10;
    } else if (amount <= 5000) {
      courtFee = 25;
    } else if (amount <= 20000) {
      courtFee = amount * 0.025; // 2.5%
    } else {
      courtFee = 500 + (amount - 20000) * 0.01; // ₹500 + 1% of excess
    }

    onResult({
      amount: courtFee,
      breakdown: { 'Court Fee': courtFee },
      details: [
        `Claim Amount: ₹${amount.toLocaleString('en-IN')}`,
        `Court Type: ${courtType}`,
        'Fee calculated as per Court Fees Act'
      ],
      applicableLaw: 'Court Fees Act, 1870'
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Court Fees Calculator</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Claim Amount (₹)</label>
          <input
            type="number"
            value={claimAmount}
            onChange={(e) => setClaimAmount(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
            placeholder="Enter claim amount"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Court Type</label>
          <select
            value={courtType}
            onChange={(e) => setCourtType(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          >
            <option value="district">District Court</option>
            <option value="high">High Court</option>
            <option value="supreme">Supreme Court</option>
          </select>
        </div>

        <button
          onClick={calculate}
          className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
        >
          Calculate Court Fee
        </button>
      </div>
    </div>
  );
};

// Placeholder components for other calculators
const InterestCalculator: React.FC<{ onResult: (result: CalculationResult) => void }> = ({ onResult }) => (
  <div className="text-center py-8">
    <Calculator className="h-12 w-12 text-gray-400 mx-auto mb-4" />
    <h3 className="text-lg font-medium text-gray-900 mb-2">Interest Calculator</h3>
    <p className="text-gray-600">Calculate interest on delayed payments and loans</p>
  </div>
);

const GratuityCalculator: React.FC<{ onResult: (result: CalculationResult) => void }> = ({ onResult }) => (
  <div className="text-center py-8">
    <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
    <h3 className="text-lg font-medium text-gray-900 mb-2">Gratuity Calculator</h3>
    <p className="text-gray-600">Calculate gratuity amount for employees</p>
  </div>
);

const NoticePeriodCalculator: React.FC<{ onResult: (result: CalculationResult) => void }> = ({ onResult }) => (
  <div className="text-center py-8">
    <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
    <h3 className="text-lg font-medium text-gray-900 mb-2">Notice Period Calculator</h3>
    <p className="text-gray-600">Calculate notice period compensation</p>
  </div>
);

const LimitationCalculator: React.FC<{ onResult: (result: CalculationResult) => void }> = ({ onResult }) => (
  <div className="text-center py-8">
    <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
    <h3 className="text-lg font-medium text-gray-900 mb-2">Limitation Period Calculator</h3>
    <p className="text-gray-600">Check limitation periods for legal actions</p>
  </div>
);

export default LegalCalculator;
