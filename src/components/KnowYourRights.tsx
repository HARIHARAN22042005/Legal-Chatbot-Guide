import React from 'react';
import { Shield, Gavel, BookUser } from 'lucide-react';

const KnowYourRights: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <Shield className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">Know Your Rights</h1>
        </div>
        <p className="text-lg text-gray-600">
          An interactive guide to your fundamental rights in various situations.
        </p>
      </div>

      {/* Coming Soon Placeholder */}
      <div className="text-center py-16 border-2 border-dashed border-gray-300 rounded-lg">
        <Gavel className="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">Content Coming Soon</h2>
        <p className="text-gray-500 max-w-md mx-auto">
          We are working on adding comprehensive guides to your rights. This section will soon be populated with easy-to-understand legal information.
        </p>
        <div className="mt-6 flex justify-center items-center space-x-2 text-gray-500">
            <BookUser className="h-5 w-5" />
            <span>Topics will include: Rights during police encounters, workplace rights, and more.</span>
        </div>
      </div>
    </div>
  );
};

export default KnowYourRights;
