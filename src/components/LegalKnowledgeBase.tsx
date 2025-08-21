import React, { useState } from 'react';
import { Search, Book, Scale, Users, Building, Briefcase, Shield, Leaf, CreditCard, AlertTriangle } from 'lucide-react';

interface LegalArea {
  id: string;
  title: string;
  icon: React.ComponentType<any>;
  description: string;
  keyActs: string[];
  commonQuestions: string[];
  color: string;
}

const LegalKnowledgeBase: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArea, setSelectedArea] = useState<string | null>(null);

  const legalAreas: LegalArea[] = [
    {
      id: 'criminal',
      title: 'Criminal Law',
      icon: Shield,
      description: 'Laws dealing with crimes, punishments, and criminal procedures',
      keyActs: ['Indian Penal Code 1860', 'Code of Criminal Procedure 1973', 'Evidence Act 1872', 'POCSO Act 2012'],
      commonQuestions: [
        'What is the punishment for theft under IPC?',
        'How to file an FIR?',
        'What are the types of bail?',
        'What is the difference between murder and culpable homicide?'
      ],
      color: 'red'
    },
    {
      id: 'civil',
      title: 'Civil Law',
      icon: Scale,
      description: 'Laws governing private disputes between individuals and organizations',
      keyActs: ['Indian Contract Act 1872', 'Transfer of Property Act 1882', 'Sale of Goods Act 1930', 'Specific Relief Act 1963'],
      commonQuestions: [
        'What makes a contract valid?',
        'How to transfer property legally?',
        'What are the remedies for breach of contract?',
        'What is the limitation period for civil suits?'
      ],
      color: 'blue'
    },
    {
      id: 'family',
      title: 'Family Law',
      icon: Users,
      description: 'Laws related to marriage, divorce, inheritance, and family relationships',
      keyActs: ['Hindu Marriage Act 1955', 'Hindu Succession Act 1956', 'Muslim Personal Law', 'Special Marriage Act 1954'],
      commonQuestions: [
        'What are the grounds for divorce?',
        'How is property inherited under Hindu law?',
        'What is the procedure for adoption?',
        'How to claim maintenance after divorce?'
      ],
      color: 'green'
    },
    {
      id: 'commercial',
      title: 'Commercial Law',
      icon: Building,
      description: 'Laws governing business, trade, and commercial transactions',
      keyActs: ['Companies Act 2013', 'GST Act 2017', 'Competition Act 2002', 'FEMA 1999'],
      commonQuestions: [
        'How to incorporate a company?',
        'What are GST compliance requirements?',
        'What is the procedure for trademark registration?',
        'How to resolve commercial disputes?'
      ],
      color: 'purple'
    },
    {
      id: 'labor',
      title: 'Labor Law',
      icon: Briefcase,
      description: 'Laws protecting workers rights and regulating employment',
      keyActs: ['Industrial Disputes Act 1947', 'Factories Act 1948', 'Minimum Wages Act 1948', 'Payment of Gratuity Act 1972'],
      commonQuestions: [
        'What are the rights of employees?',
        'How to claim gratuity?',
        'What is wrongful termination?',
        'How to file a complaint for workplace harassment?'
      ],
      color: 'orange'
    },
    {
      id: 'consumer',
      title: 'Consumer Law',
      icon: CreditCard,
      description: 'Laws protecting consumer rights and regulating trade practices',
      keyActs: ['Consumer Protection Act 2019', 'Food Safety Standards Act 2006', 'Bureau of Indian Standards Act 2016'],
      commonQuestions: [
        'How to file a consumer complaint?',
        'What are consumer rights?',
        'How to get refund for defective products?',
        'What is the jurisdiction of consumer courts?'
      ],
      color: 'indigo'
    },
    {
      id: 'environmental',
      title: 'Environmental Law',
      icon: Leaf,
      description: 'Laws for environmental protection and pollution control',
      keyActs: ['Environment Protection Act 1986', 'Water Act 1974', 'Air Act 1981', 'Forest Conservation Act 1980'],
      commonQuestions: [
        'How to get environmental clearance?',
        'What are the penalties for pollution?',
        'How to file environmental complaints?',
        'What is the role of Green Tribunal?'
      ],
      color: 'green'
    },
    {
      id: 'cyber',
      title: 'Cyber Law',
      icon: AlertTriangle,
      description: 'Laws dealing with internet, technology, and digital crimes',
      keyActs: ['Information Technology Act 2000', 'Personal Data Protection Bill', 'Intermediary Guidelines 2021'],
      commonQuestions: [
        'How to report cybercrime?',
        'What is identity theft punishment?',
        'How to protect personal data online?',
        'What are the penalties for hacking?'
      ],
      color: 'red'
    }
  ];

  const filteredAreas = legalAreas.filter(area =>
    area.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    area.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    area.keyActs.some(act => act.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getColorClasses = (color: string) => {
    const colorMap = {
      red: 'bg-red-50 border-red-200 text-red-800',
      blue: 'bg-blue-50 border-blue-200 text-blue-800',
      green: 'bg-green-50 border-green-200 text-green-800',
      purple: 'bg-purple-50 border-purple-200 text-purple-800',
      orange: 'bg-orange-50 border-orange-200 text-orange-800',
      indigo: 'bg-indigo-50 border-indigo-200 text-indigo-800'
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  const getIconColor = (color: string) => {
    const colorMap = {
      red: 'text-red-600',
      blue: 'text-blue-600',
      green: 'text-green-600',
      purple: 'text-purple-600',
      orange: 'text-orange-600',
      indigo: 'text-indigo-600'
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <Book className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">Legal Knowledge Base</h1>
        </div>
        <p className="text-lg text-gray-600">
          Comprehensive guide to Indian laws, acts, and legal procedures
        </p>
      </div>

      {/* Search */}
      <div className="mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search legal areas, acts, or topics..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Legal Areas Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredAreas.map((area) => {
          const Icon = area.icon;
          return (
            <div
              key={area.id}
              className={`p-6 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:shadow-lg ${getColorClasses(area.color)} ${
                selectedArea === area.id ? 'ring-2 ring-blue-500' : ''
              }`}
              onClick={() => setSelectedArea(selectedArea === area.id ? null : area.id)}
            >
              <div className="flex items-center space-x-3 mb-4">
                <Icon className={`h-6 w-6 ${getIconColor(area.color)}`} />
                <h3 className="text-lg font-semibold">{area.title}</h3>
              </div>
              
              <p className="text-sm mb-4 opacity-90">{area.description}</p>
              
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Key Acts:</h4>
                <ul className="text-xs space-y-1">
                  {area.keyActs.slice(0, 3).map((act, index) => (
                    <li key={index} className="opacity-80">• {act}</li>
                  ))}
                  {area.keyActs.length > 3 && (
                    <li className="opacity-60">+ {area.keyActs.length - 3} more</li>
                  )}
                </ul>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detailed View */}
      {selectedArea && (
        <div className="mt-8 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
          {(() => {
            const area = legalAreas.find(a => a.id === selectedArea);
            if (!area) return null;
            const Icon = area.icon;
            
            return (
              <div>
                <div className={`px-6 py-4 ${getColorClasses(area.color)}`}>
                  <div className="flex items-center space-x-3">
                    <Icon className={`h-6 w-6 ${getIconColor(area.color)}`} />
                    <h2 className="text-xl font-bold">{area.title}</h2>
                  </div>
                  <p className="mt-2 opacity-90">{area.description}</p>
                </div>
                
                <div className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Key Acts */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Legislation</h3>
                      <ul className="space-y-2">
                        {area.keyActs.map((act, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                            <span className="text-gray-700">{act}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {/* Common Questions */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Common Questions</h3>
                      <ul className="space-y-2">
                        {area.commonQuestions.map((question, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <span className="text-blue-500 font-bold mt-1">?</span>
                            <span className="text-gray-700">{question}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <p className="text-sm text-gray-600">
                      <strong>Disclaimer:</strong> This information is for general guidance only. 
                      For specific legal advice, please consult with a qualified legal professional 
                      specializing in {area.title.toLowerCase()}.
                    </p>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* Footer */}
      <div className="mt-12 text-center">
        <div className="bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">Need Specific Legal Advice?</h3>
          <p className="text-blue-700 mb-4">
            This knowledge base provides general information about Indian laws. For personalized legal advice, 
            case-specific guidance, or representation, please consult with qualified legal professionals.
          </p>
          <div className="flex justify-center space-x-4 text-sm text-blue-600">
            <span>• Bar Council of India</span>
            <span>• Legal Aid Services</span>
            <span>• Lok Adalats</span>
            <span>• Online Legal Consultations</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalKnowledgeBase;
