import React from 'react';
import { MessageSquare, Mic, Book, FolderOpen, Newspaper, Calculator, FileText, Scale, TrendingUp, Clock, AlertCircle, CheckCircle, Shield } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  action: () => void;
}

interface DashboardProps {
  onNavigate: (view: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const { user } = useAuth();

  const quickActions: QuickAction[] = [
    {
      id: 'chat',
      title: 'Ask Legal Question',
      description: 'Get instant answers to your legal queries',
      icon: MessageSquare,
      color: 'bg-primary',
      action: () => onNavigate('chat')
    },
    {
      id: 'know-your-rights',
      title: 'Know Your Rights',
      description: 'Explore your fundamental rights as an Indian citizen',
      icon: Shield,
      color: 'bg-teal-500',
      action: () => onNavigate('know-your-rights')
    },
    {
      id: 'voice',
      title: 'Voice Assistant',
      description: 'Speak your legal questions naturally',
      icon: Mic,
      color: 'bg-secondary',
      action: () => onNavigate('voice-interface')
    },
    {
      id: 'knowledge',
      title: 'Legal Knowledge',
      description: 'Browse comprehensive legal database',
      icon: Book,
      color: 'bg-green-500',
      action: () => onNavigate('knowledge-base')
    },
    {
      id: 'cases',
      title: 'Track Cases',
      description: 'Manage your legal cases and hearings',
      icon: FolderOpen,
      color: 'bg-orange-500',
      action: () => onNavigate('case-tracker')
    },
    {
      id: 'news',
      title: 'Legal News',
      description: 'Stay updated with latest legal developments',
      icon: Newspaper,
      color: 'bg-red-500',
      action: () => onNavigate('legal-news')
    },
    {
      id: 'calculator',
      title: 'Legal Calculator',
      description: 'Calculate fees, duties, and legal amounts',
      icon: Calculator,
      color: 'bg-indigo-500',
      action: () => onNavigate('legal-calculator')
    },
    {
      id: 'documents',
      title: 'Analyze Documents',
      description: 'Upload and analyze legal documents',
      icon: FileText,
      color: 'bg-cyan-500',
      action: () => onNavigate('pdf-reader')
    },
    {
      id: 'cases-summary',
      title: 'Case Summarizer',
      description: 'Summarize legal cases and judgments',
      icon: Scale,
      color: 'bg-pink-500',
      action: () => onNavigate('case-summarizer')
    }
  ];

  const stats = [
    {
      title: 'Questions Asked',
      value: '127',
      change: '+12%',
      icon: MessageSquare,
      color: 'text-primary'
    },
    {
      title: 'Documents Analyzed',
      value: '23',
      change: '+8%',
      icon: FileText,
      color: 'text-green-600'
    },
    {
      title: 'Cases Tracked',
      value: '5',
      change: '+2',
      icon: FolderOpen,
      color: 'text-orange-600'
    },
    {
      title: 'Bookmarks Saved',
      value: '45',
      change: '+15%',
      icon: CheckCircle,
      color: 'text-purple-600'
    }
  ];

  const recentActivity = [
    {
      id: '1',
      type: 'question',
      title: 'Asked about bail procedures',
      time: '2 hours ago',
      icon: MessageSquare,
      color: 'text-primary'
    },
    {
      id: '2',
      type: 'document',
      title: 'Analyzed contract document',
      time: '5 hours ago',
      icon: FileText,
      color: 'text-green-600'
    },
    {
      id: '3',
      type: 'case',
      title: 'Updated case status',
      time: '1 day ago',
      icon: FolderOpen,
      color: 'text-orange-600'
    },
    {
      id: '4',
      type: 'news',
      title: 'Read Supreme Court update',
      time: '2 days ago',
      icon: Newspaper,
      color: 'text-red-600'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {user?.email?.split('@')[0] || 'User'}!
        </h1>
        <p className="text-lg text-gray-600">
          Your comprehensive legal assistant dashboard
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-surface p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center">
                <div className={`p-2 rounded-lg bg-gray-50 ${stat.color}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <div className="flex items-center">
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <span className="ml-2 text-sm text-green-600 flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      {stat.change}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <div className="lg:col-span-2">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <button
                  key={action.id}
                  onClick={action.action}
                  className="bg-surface p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow text-left group"
                >
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-lg ${action.color} text-white group-hover:scale-110 transition-transform`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary transition-colors">
                        {action.title}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {action.description}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Activity</h2>
          <div className="bg-surface rounded-lg shadow-sm border border-gray-200">
            <div className="p-6">
              <div className="space-y-4">
                {recentActivity.map((activity) => {
                  const Icon = activity.icon;
                  return (
                    <div key={activity.id} className="flex items-start space-x-3">
                      <div className={`p-2 rounded-lg bg-gray-50 ${activity.color}`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">
                          {activity.title}
                        </p>
                        <div className="flex items-center mt-1">
                          <Clock className="h-3 w-3 text-gray-400 mr-1" />
                          <p className="text-xs text-gray-500">{activity.time}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="px-6 py-3 bg-gray-50 border-t border-gray-200 rounded-b-lg">
              <button className="text-sm text-primary hover:text-primary-dark font-medium">
                View all activity
              </button>
            </div>
          </div>

          {/* Quick Tips */}
          <div className="mt-6 bg-blue-50 rounded-lg p-6 border border-blue-200">
            <div className="flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-primary-dark mb-2">Quick Tip</h3>
                <p className="text-sm text-primary-dark">
                  Use the Voice Assistant for hands-free legal queries. Just click the microphone 
                  and speak your question naturally.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Tools */}
      <div className="mt-12">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Featured Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-primary to-primary-dark p-6 rounded-lg text-white">
            <MessageSquare className="h-8 w-8 mb-4" />
            <h3 className="text-lg font-semibold mb-2">AI-Powered Chat</h3>
            <p className="text-blue-100 text-sm mb-4">
              Get intelligent answers to complex legal questions with our advanced AI system.
            </p>
            <button
              onClick={() => onNavigate('chat')}
              className="bg-surface text-primary px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors"
            >
              Start Chatting
            </button>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-lg text-white">
            <Book className="h-8 w-8 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Legal Knowledge Base</h3>
            <p className="text-green-100 text-sm mb-4">
              Access comprehensive information about Indian laws, acts, and legal procedures.
            </p>
            <button
              onClick={() => onNavigate('knowledge-base')}
              className="bg-surface text-green-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-50 transition-colors"
            >
              Explore Laws
            </button>
          </div>

          <div className="bg-gradient-to-br from-secondary to-secondary-dark p-6 rounded-lg text-white">
            <Mic className="h-8 w-8 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Voice Assistant</h3>
            <p className="text-purple-100 text-sm mb-4">
              Speak your legal questions and get instant voice responses from our AI assistant.
            </p>
            <button
              onClick={() => onNavigate('voice-interface')}
              className="bg-surface text-secondary px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-50 transition-colors"
            >
              Try Voice
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;