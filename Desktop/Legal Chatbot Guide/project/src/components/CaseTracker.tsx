import React, { useState, useEffect } from 'react';
import { Plus, Calendar, Clock, AlertCircle, CheckCircle, FileText, Edit, Trash2, Filter } from 'lucide-react';

interface LegalCase {
  id: string;
  title: string;
  caseNumber: string;
  court: string;
  caseType: 'Civil' | 'Criminal' | 'Family' | 'Commercial' | 'Constitutional' | 'Other';
  status: 'Active' | 'Pending' | 'Closed' | 'Appeal';
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  nextHearing: Date | null;
  description: string;
  lawyer: string;
  documents: string[];
  createdAt: Date;
  updatedAt: Date;
}

const CaseTracker: React.FC = () => {
  const [cases, setCases] = useState<LegalCase[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingCase, setEditingCase] = useState<LegalCase | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [filterType, setFilterType] = useState<string>('All');

  // Load cases from localStorage on mount
  useEffect(() => {
    const savedCases = localStorage.getItem('legalCases');
    if (savedCases) {
      try {
        const parsed = JSON.parse(savedCases).map((caseItem: any) => ({
          ...caseItem,
          nextHearing: caseItem.nextHearing ? new Date(caseItem.nextHearing) : null,
          createdAt: new Date(caseItem.createdAt),
          updatedAt: new Date(caseItem.updatedAt)
        }));
        setCases(parsed);
      } catch (error) {
        console.error('Error loading cases:', error);
      }
    }
  }, []);

  // Save cases to localStorage whenever cases change
  useEffect(() => {
    localStorage.setItem('legalCases', JSON.stringify(cases));
  }, [cases]);

  const addCase = (caseData: Omit<LegalCase, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newCase: LegalCase = {
      ...caseData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    setCases(prev => [newCase, ...prev]);
    setShowAddForm(false);
  };

  const updateCase = (updatedCase: LegalCase) => {
    setCases(prev => prev.map(caseItem =>
      caseItem.id === updatedCase.id
        ? { ...updatedCase, updatedAt: new Date() }
        : caseItem
    ));
    setEditingCase(null);
  };

  const deleteCase = (caseId: string) => {
    if (window.confirm('Are you sure you want to delete this case?')) {
      setCases(prev => prev.filter(caseItem => caseItem.id !== caseId));
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Closed': return 'bg-gray-100 text-gray-800';
      case 'Appeal': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Urgent': return 'bg-red-100 text-red-800';
      case 'High': return 'bg-orange-100 text-orange-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredCases = cases.filter(caseItem => {
    const statusMatch = filterStatus === 'All' || caseItem.status === filterStatus;
    const typeMatch = filterType === 'All' || caseItem.caseType === filterType;
    return statusMatch && typeMatch;
  });

  const upcomingHearings = cases
    .filter(caseItem => caseItem.nextHearing && caseItem.nextHearing > new Date())
    .sort((a, b) => (a.nextHearing!.getTime() - b.nextHearing!.getTime()))
    .slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Legal Case Tracker</h1>
          <p className="text-gray-600 mt-1">Manage and track your legal cases</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-5 w-5" />
          <span>Add Case</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <FileText className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Cases</p>
              <p className="text-2xl font-bold text-gray-900">{cases.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <CheckCircle className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Cases</p>
              <p className="text-2xl font-bold text-gray-900">
                {cases.filter(caseItem => caseItem.status === 'Active').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <Clock className="h-8 w-8 text-yellow-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-gray-900">
                {cases.filter(caseItem => caseItem.status === 'Pending').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <AlertCircle className="h-8 w-8 text-red-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Urgent</p>
              <p className="text-2xl font-bold text-gray-900">
                {cases.filter(caseItem => caseItem.priority === 'Urgent').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Hearings */}
      {upcomingHearings.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
            <Calendar className="h-5 w-5 mr-2" />
            Upcoming Hearings
          </h2>
          <div className="space-y-3">
            {upcomingHearings.map(caseItem => (
              <div key={caseItem.id} className="flex items-center justify-between bg-white p-3 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{caseItem.title}</p>
                  <p className="text-sm text-gray-600">{caseItem.court}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-blue-600">
                    {caseItem.nextHearing?.toLocaleDateString()}
                  </p>
                  <p className="text-xs text-gray-500">
                    {caseItem.nextHearing?.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="flex items-center space-x-4 mb-6">
        <Filter className="h-5 w-5 text-gray-400" />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
        >
          <option value="All">All Status</option>
          <option value="Active">Active</option>
          <option value="Pending">Pending</option>
          <option value="Closed">Closed</option>
          <option value="Appeal">Appeal</option>
        </select>
        
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
        >
          <option value="All">All Types</option>
          <option value="Civil">Civil</option>
          <option value="Criminal">Criminal</option>
          <option value="Family">Family</option>
          <option value="Commercial">Commercial</option>
          <option value="Constitutional">Constitutional</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Cases List */}
      <div className="space-y-4">
        {filteredCases.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No cases found</h3>
            <p className="text-gray-600 mb-4">
              {cases.length === 0 
                ? "Start by adding your first legal case to track."
                : "No cases match your current filters."
              }
            </p>
            {cases.length === 0 && (
              <button
                onClick={() => setShowAddForm(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Add Your First Case
              </button>
            )}
          </div>
        ) : (
          filteredCases.map(caseItem => (
            <div key={caseItem.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{caseItem.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(caseItem.status)}`}>
                      {caseItem.status}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(caseItem.priority)}`}>
                      {caseItem.priority}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                    <div>
                      <span className="font-medium">Case Number:</span> {caseItem.caseNumber}
                    </div>
                    <div>
                      <span className="font-medium">Court:</span> {caseItem.court}
                    </div>
                    <div>
                      <span className="font-medium">Type:</span> {caseItem.caseType}
                    </div>
                    <div>
                      <span className="font-medium">Lawyer:</span> {caseItem.lawyer}
                    </div>
                    {caseItem.nextHearing && (
                      <div>
                        <span className="font-medium">Next Hearing:</span> {caseItem.nextHearing.toLocaleDateString()}
                      </div>
                    )}
                    <div>
                      <span className="font-medium">Documents:</span> {caseItem.documents.length} files
                    </div>
                  </div>

                  {caseItem.description && (
                    <p className="mt-3 text-gray-700">{caseItem.description}</p>
                  )}
                </div>

                <div className="flex items-center space-x-2 ml-4">
                  <button
                    onClick={() => setEditingCase(caseItem)}
                    className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                    title="Edit case"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => deleteCase(caseItem.id)}
                    className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                    title="Delete case"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add/Edit Case Modal would go here */}
      {(showAddForm || editingCase) && (
        <CaseFormModal
          case={editingCase}
          onSave={editingCase ? updateCase : addCase}
          onCancel={() => {
            setShowAddForm(false);
            setEditingCase(null);
          }}
        />
      )}
    </div>
  );
};

// Case Form Modal Component (simplified for space)
const CaseFormModal: React.FC<{
  case?: LegalCase | null;
  onSave: (caseItem: any) => void;
  onCancel: () => void;
}> = ({ case: editCase, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: editCase?.title || '',
    caseNumber: editCase?.caseNumber || '',
    court: editCase?.court || '',
    caseType: editCase?.caseType || 'Civil',
    status: editCase?.status || 'Active',
    priority: editCase?.priority || 'Medium',
    nextHearing: editCase?.nextHearing?.toISOString().split('T')[0] || '',
    description: editCase?.description || '',
    lawyer: editCase?.lawyer || '',
    documents: editCase?.documents || []
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...editCase,
      ...formData,
      nextHearing: formData.nextHearing ? new Date(formData.nextHearing) : null
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            {editCase ? 'Edit Case' : 'Add New Case'}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Case Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Case Number</label>
                <input
                  type="text"
                  required
                  value={formData.caseNumber}
                  onChange={(e) => setFormData(prev => ({ ...prev, caseNumber: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>
            </div>
            
            {/* Add more form fields here */}
            
            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                {editCase ? 'Update Case' : 'Add Case'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CaseTracker;
