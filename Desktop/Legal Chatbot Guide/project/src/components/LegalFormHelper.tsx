import React, { useState } from 'react';
import { FileCheck, Download, AlertCircle, Bookmark, BookmarkCheck, CheckCircle } from 'lucide-react';
import { useBookmarks } from '../contexts/BookmarkContext';

interface FormField {
  id: string;
  label: string;
  type: 'text' | 'textarea' | 'select' | 'date' | 'number';
  required: boolean;
  options?: string[];
  placeholder?: string;
  help?: string;
}

interface LegalForm {
  id: string;
  title: string;
  description: string;
  category: string;
  fields: FormField[];
  instructions: string[];
  downloadUrl?: string;
}

const legalForms: LegalForm[] = [
  {
    id: 'fir-form',
    title: 'First Information Report (FIR)',
    description: 'File a complaint for cognizable offenses with the police',
    category: 'Criminal Law',
    fields: [
      { id: 'complainant-name', label: 'Complainant Name', type: 'text', required: true, placeholder: 'Enter your full name' },
      { id: 'complainant-address', label: 'Address', type: 'textarea', required: true, placeholder: 'Enter your complete address' },
      { id: 'phone', label: 'Phone Number', type: 'text', required: true, placeholder: 'Enter your contact number' },
      { id: 'incident-date', label: 'Date of Incident', type: 'date', required: true },
      { id: 'incident-time', label: 'Time of Incident', type: 'text', required: false, placeholder: 'Approximate time' },
      { id: 'incident-place', label: 'Place of Incident', type: 'textarea', required: true, placeholder: 'Detailed location of the incident' },
      { id: 'incident-details', label: 'Details of Incident', type: 'textarea', required: true, placeholder: 'Describe what happened in detail' },
      { id: 'accused-details', label: 'Accused Person Details', type: 'textarea', required: false, placeholder: 'Name and details of accused (if known)' },
      { id: 'witnesses', label: 'Witness Details', type: 'textarea', required: false, placeholder: 'Names and contact details of witnesses' }
    ],
    instructions: [
      'Visit the nearest police station with jurisdiction over the incident location',
      'Carry original identity proof and address proof',
      'Provide accurate and complete information',
      'Get a copy of the FIR with the FIR number',
      'Keep the FIR copy safe for future reference'
    ]
  },
  {
    id: 'affidavit-form',
    title: 'General Affidavit',
    description: 'Create a sworn statement for legal purposes',
    category: 'Civil Law',
    fields: [
      { id: 'deponent-name', label: 'Deponent Name', type: 'text', required: true, placeholder: 'Person making the affidavit' },
      { id: 'deponent-age', label: 'Age', type: 'number', required: true, placeholder: 'Age in years' },
      { id: 'deponent-address', label: 'Address', type: 'textarea', required: true, placeholder: 'Complete address of deponent' },
      { id: 'occupation', label: 'Occupation', type: 'text', required: true, placeholder: 'Current occupation' },
      { id: 'purpose', label: 'Purpose of Affidavit', type: 'select', required: true, options: ['Name Change', 'Address Proof', 'Income Certificate', 'Date of Birth', 'Other'] },
      { id: 'statement', label: 'Statement/Declaration', type: 'textarea', required: true, placeholder: 'The facts you want to declare under oath' },
      { id: 'supporting-docs', label: 'Supporting Documents', type: 'textarea', required: false, placeholder: 'List of documents attached as proof' }
    ],
    instructions: [
      'Print the affidavit on stamp paper of appropriate value',
      'Sign the affidavit in the presence of a notary or magistrate',
      'Carry original identity proof and supporting documents',
      'Get the affidavit notarized with official seal',
      'Make multiple copies for your records'
    ]
  },
  {
    id: 'rti-form',
    title: 'Right to Information (RTI) Application',
    description: 'Request information from government departments',
    category: 'Administrative Law',
    fields: [
      { id: 'applicant-name', label: 'Applicant Name', type: 'text', required: true, placeholder: 'Your full name' },
      { id: 'applicant-address', label: 'Address', type: 'textarea', required: true, placeholder: 'Complete postal address' },
      { id: 'department', label: 'Government Department', type: 'text', required: true, placeholder: 'Name of the department/office' },
      { id: 'information-sought', label: 'Information Sought', type: 'textarea', required: true, placeholder: 'Specific information you want to obtain' },
      { id: 'period', label: 'Period of Information', type: 'text', required: false, placeholder: 'Time period for the information (if applicable)' },
      { id: 'reason', label: 'Reason (Optional)', type: 'textarea', required: false, placeholder: 'Reason for seeking information (optional)' },
      { id: 'fee-payment', label: 'Application Fee', type: 'select', required: true, options: ['₹10 (General)', 'Free (BPL Card Holder)'] }
    ],
    instructions: [
      'Submit application to the Public Information Officer (PIO)',
      'Pay the prescribed application fee (₹10 for general applicants)',
      'BPL card holders are exempt from paying fees',
      'Response should be provided within 30 days',
      'If not satisfied, you can file an appeal to the First Appellate Authority'
    ]
  }
];

const LegalFormHelper: React.FC = () => {
  const [selectedForm, setSelectedForm] = useState<LegalForm | null>(null);
  const [formData, setFormData] = useState<{ [key: string]: string }>({});
  const [completedFields, setCompletedFields] = useState<Set<string>>(new Set());
  const { bookmarks, addBookmark, removeBookmark } = useBookmarks();

  const handleFieldChange = (fieldId: string, value: string) => {
    setFormData(prev => ({ ...prev, [fieldId]: value }));
    
    if (value.trim()) {
      setCompletedFields(prev => new Set([...prev, fieldId]));
    } else {
      setCompletedFields(prev => {
        const newSet = new Set(prev);
        newSet.delete(fieldId);
        return newSet;
      });
    }
  };

  const getCompletionPercentage = () => {
    if (!selectedForm) return 0;
    const requiredFields = selectedForm.fields.filter(field => field.required);
    const completedRequired = requiredFields.filter(field => completedFields.has(field.id));
    return Math.round((completedRequired.length / requiredFields.length) * 100);
  };

  const isBookmarked = (formId: string) => {
    return bookmarks.some(bookmark => bookmark.id === `form-${formId}`);
  };

  const toggleBookmark = (form: LegalForm) => {
    const bookmarkId = `form-${form.id}`;
    
    if (isBookmarked(form.id)) {
      removeBookmark(bookmarkId);
    } else {
      addBookmark({
        id: bookmarkId,
        title: `Form Guide: ${form.title}`,
        content: form.description,
        source: 'Legal Form Helper',
        timestamp: new Date(),
        category: form.category
      });
    }
  };

  const generateFormPreview = () => {
    if (!selectedForm) return '';
    
    let preview = `${selectedForm.title.toUpperCase()}\n\n`;
    
    selectedForm.fields.forEach(field => {
      const value = formData[field.id] || '[To be filled]';
      preview += `${field.label}: ${value}\n`;
    });
    
    return preview;
  };

  return (
    <div className="flex h-full bg-white">
      {/* Forms List */}
      <div className="w-1/3 border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3 mb-4">
            <FileCheck className="h-8 w-8 text-blue-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Legal Form Helper</h1>
              <p className="text-sm text-gray-600">Guidance for filling legal forms</p>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {legalForms.map((form) => (
            <button
              key={form.id}
              onClick={() => {
                setSelectedForm(form);
                setFormData({});
                setCompletedFields(new Set());
              }}
              className={`w-full text-left p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                selectedForm?.id === form.id ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-900">{form.title}</h3>
                <span className="text-xs px-2 py-1 bg-gray-200 text-gray-700 rounded-full">
                  {form.category}
                </span>
              </div>
              <p className="text-sm text-gray-600">{form.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Form Details */}
      <div className="flex-1 flex flex-col">
        {selectedForm ? (
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedForm.title}</h2>
                  <p className="text-gray-600">{selectedForm.description}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-600">{getCompletionPercentage()}%</div>
                    <div className="text-xs text-gray-500">Complete</div>
                  </div>
                  <button
                    onClick={() => toggleBookmark(selectedForm)}
                    className={`p-2 rounded-lg transition-colors ${
                      isBookmarked(selectedForm.id)
                        ? 'text-amber-600 bg-amber-50 hover:bg-amber-100'
                        : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {isBookmarked(selectedForm.id) ? (
                      <BookmarkCheck className="h-6 w-6" />
                    ) : (
                      <Bookmark className="h-6 w-6" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <div className="max-w-4xl space-y-8">
                {/* Progress Bar */}
                <div className="bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${getCompletionPercentage()}%` }}
                  ></div>
                </div>

                {/* Form Fields */}
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-900">Form Fields</h3>
                  {selectedForm.fields.map((field) => (
                    <div key={field.id} className="space-y-2">
                      <label className="flex items-center space-x-2">
                        <span className="font-medium text-gray-700">
                          {field.label}
                          {field.required && <span className="text-red-500 ml-1">*</span>}
                        </span>
                        {completedFields.has(field.id) && (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        )}
                      </label>
                      
                      {field.type === 'textarea' ? (
                        <textarea
                          value={formData[field.id] || ''}
                          onChange={(e) => handleFieldChange(field.id, e.target.value)}
                          placeholder={field.placeholder}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                          rows={3}
                        />
                      ) : field.type === 'select' ? (
                        <select
                          value={formData[field.id] || ''}
                          onChange={(e) => handleFieldChange(field.id, e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="">Select an option</option>
                          {field.options?.map(option => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type={field.type}
                          value={formData[field.id] || ''}
                          onChange={(e) => handleFieldChange(field.id, e.target.value)}
                          placeholder={field.placeholder}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      )}
                      
                      {field.help && (
                        <p className="text-sm text-gray-500">{field.help}</p>
                      )}
                    </div>
                  ))}
                </div>

                {/* Instructions */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-blue-900 mb-4">Filing Instructions</h3>
                  <ol className="space-y-2">
                    {selectedForm.instructions.map((instruction, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-0.5">
                          {index + 1}
                        </div>
                        <span className="text-blue-800">{instruction}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Form Preview */}
                {Object.keys(formData).length > 0 && (
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Form Preview</h3>
                    <pre className="text-sm text-gray-700 whitespace-pre-wrap font-mono bg-white p-4 rounded border">
                      {generateFormPreview()}
                    </pre>
                    <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                      <Download className="h-4 w-4" />
                      <span>Download Form</span>
                    </button>
                  </div>
                )}

                {/* Disclaimer */}
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-red-800">
                      <h4 className="font-semibold mb-1">Important Disclaimer</h4>
                      <p>This form helper provides general guidance only. Legal requirements may vary by jurisdiction and specific circumstances. Always verify current procedures and requirements with relevant authorities or consult qualified legal professionals before filing any legal documents.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-center p-8">
            <div>
              <FileCheck className="h-24 w-24 text-gray-300 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-gray-600 mb-2">Select a Legal Form</h2>
              <p className="text-gray-500 max-w-md">
                Choose a legal form from the list to get step-by-step guidance on filling it out correctly.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LegalFormHelper;