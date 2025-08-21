import React, { useState, useEffect } from 'react';
import { User, Mail, Calendar, Shield, Settings, Activity, BarChart3, FileText, MessageSquare, Bookmark, Clock, Award, Bell, Lock, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useBookmarks } from '../contexts/BookmarkContext';

interface UserStats {
  questionsAsked: number;
  documentsAnalyzed: number;
  casesTracked: number;
  bookmarksSaved: number;
  totalSessions: number;
  lastActive: Date;
}

interface UserPreferences {
  emailNotifications: boolean;
  pushNotifications: boolean;
  darkMode: boolean;
  language: string;
  timezone: string;
}

const UserProfile: React.FC = () => {
  const { user, signOut } = useAuth();
  const { bookmarks } = useBookmarks();
  const [activeTab, setActiveTab] = useState<'overview' | 'activity' | 'settings' | 'security'>('overview');
  const [showRawData, setShowRawData] = useState(false);
  const [userStats, setUserStats] = useState<UserStats>({
    questionsAsked: 127,
    documentsAnalyzed: 23,
    casesTracked: 5,
    bookmarksSaved: bookmarks.length,
    totalSessions: 45,
    lastActive: new Date()
  });
  const [preferences, setPreferences] = useState<UserPreferences>({
    emailNotifications: true,
    pushNotifications: false,
    darkMode: false,
    language: 'English',
    timezone: 'Asia/Kolkata'
  });

  useEffect(() => {
    // Update bookmarks count when bookmarks change
    setUserStats(prev => ({ ...prev, bookmarksSaved: bookmarks.length }));
  }, [bookmarks]);

  if (!user) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'activity', label: 'Activity', icon: Activity },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'security', label: 'Security', icon: Lock }
  ];

  const handleSignOut = async () => {
    if (window.confirm('Are you sure you want to sign out?')) {
      await signOut();
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-6">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <User className="h-10 w-10 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">
                  {user.email?.split('@')[0] || 'User'}
                </h1>
                <p className="text-blue-100 text-lg">{user.email}</p>
                <p className="text-blue-200 text-sm">
                  Member since {formatDate(user.created_at)}
                </p>
              </div>
            </div>
            <button
              onClick={handleSignOut}
              className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {activeTab === 'overview' && (
          <OverviewTab user={user} userStats={userStats} formatDate={formatDate} />
        )}
        {activeTab === 'activity' && (
          <ActivityTab userStats={userStats} bookmarks={bookmarks} />
        )}
        {activeTab === 'settings' && (
          <SettingsTab preferences={preferences} setPreferences={setPreferences} />
        )}
        {activeTab === 'security' && (
          <SecurityTab user={user} formatDate={formatDate} showRawData={showRawData} setShowRawData={setShowRawData} />
        )}
      </div>
    </div>
  );
};

// Overview Tab Component
const OverviewTab: React.FC<{ user: any; userStats: UserStats; formatDate: (date: string) => string }> = ({ user, userStats, formatDate }) => (
  <div className="p-6">
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Stats Cards */}
      <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <div className="flex items-center">
            <MessageSquare className="h-8 w-8 text-blue-600" />
            <div className="ml-3">
              <p className="text-2xl font-bold text-blue-900">{userStats.questionsAsked}</p>
              <p className="text-sm text-blue-700">Questions Asked</p>
            </div>
          </div>
        </div>

        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <div className="flex items-center">
            <FileText className="h-8 w-8 text-green-600" />
            <div className="ml-3">
              <p className="text-2xl font-bold text-green-900">{userStats.documentsAnalyzed}</p>
              <p className="text-sm text-green-700">Documents</p>
            </div>
          </div>
        </div>

        <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
          <div className="flex items-center">
            <BarChart3 className="h-8 w-8 text-orange-600" />
            <div className="ml-3">
              <p className="text-2xl font-bold text-orange-900">{userStats.casesTracked}</p>
              <p className="text-sm text-orange-700">Cases Tracked</p>
            </div>
          </div>
        </div>

        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
          <div className="flex items-center">
            <Bookmark className="h-8 w-8 text-purple-600" />
            <div className="ml-3">
              <p className="text-2xl font-bold text-purple-900">{userStats.bookmarksSaved}</p>
              <p className="text-sm text-purple-700">Bookmarks</p>
            </div>
          </div>
        </div>
      </div>

      {/* Account Info */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Account Information</h3>

        <div className="space-y-3">
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <Mail className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm font-medium text-gray-900">Email</p>
              <p className="text-sm text-gray-600">{user.email}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <Calendar className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm font-medium text-gray-900">Member Since</p>
              <p className="text-sm text-gray-600">{formatDate(user.created_at)}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <Clock className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm font-medium text-gray-900">Last Active</p>
              <p className="text-sm text-gray-600">{userStats.lastActive.toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Achievement Section */}
    <div className="mt-8 pt-6 border-t border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <Award className="h-5 w-5 text-yellow-600 mr-2" />
        Achievements
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-center">
            <Award className="h-6 w-6 text-yellow-600" />
            <div className="ml-3">
              <p className="font-medium text-yellow-900">Legal Explorer</p>
              <p className="text-sm text-yellow-700">Asked 100+ questions</p>
            </div>
          </div>
        </div>

        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center">
            <FileText className="h-6 w-6 text-blue-600" />
            <div className="ml-3">
              <p className="font-medium text-blue-900">Document Analyst</p>
              <p className="text-sm text-blue-700">Analyzed 20+ documents</p>
            </div>
          </div>
        </div>

        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center">
            <Bookmark className="h-6 w-6 text-green-600" />
            <div className="ml-3">
              <p className="font-medium text-green-900">Knowledge Collector</p>
              <p className="text-sm text-green-700">Saved 40+ bookmarks</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Activity Tab Component
const ActivityTab: React.FC<{ userStats: UserStats; bookmarks: any[] }> = ({ userStats, bookmarks }) => (
  <div className="p-6">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Usage Statistics */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Usage Statistics</h3>
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <MessageSquare className="h-5 w-5 text-blue-600 mr-3" />
                <span className="font-medium">Questions Asked</span>
              </div>
              <span className="text-2xl font-bold text-blue-600">{userStats.questionsAsked}</span>
            </div>
            <div className="mt-2 bg-blue-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: '85%' }}></div>
            </div>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <FileText className="h-5 w-5 text-green-600 mr-3" />
                <span className="font-medium">Documents Analyzed</span>
              </div>
              <span className="text-2xl font-bold text-green-600">{userStats.documentsAnalyzed}</span>
            </div>
            <div className="mt-2 bg-green-200 rounded-full h-2">
              <div className="bg-green-600 h-2 rounded-full" style={{ width: '60%' }}></div>
            </div>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <BarChart3 className="h-5 w-5 text-orange-600 mr-3" />
                <span className="font-medium">Total Sessions</span>
              </div>
              <span className="text-2xl font-bold text-orange-600">{userStats.totalSessions}</span>
            </div>
            <div className="mt-2 bg-orange-200 rounded-full h-2">
              <div className="bg-orange-600 h-2 rounded-full" style={{ width: '70%' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Bookmarks */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Bookmarks</h3>
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {bookmarks.slice(0, 10).map((bookmark, index) => (
            <div key={bookmark.id || index} className="p-3 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900 text-sm">{bookmark.title}</h4>
              <p className="text-xs text-gray-600 mt-1 line-clamp-2">{bookmark.content}</p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-blue-600">{bookmark.source}</span>
                <span className="text-xs text-gray-500">
                  {new Date(bookmark.timestamp).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
          {bookmarks.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Bookmark className="h-8 w-8 mx-auto mb-2 text-gray-400" />
              <p>No bookmarks saved yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
);

// Settings Tab Component
const SettingsTab: React.FC<{ preferences: UserPreferences; setPreferences: (prefs: UserPreferences) => void }> = ({ preferences, setPreferences }) => {
  const handlePreferenceChange = (key: keyof UserPreferences, value: any) => {
    setPreferences({ ...preferences, [key]: value });
    // In a real app, you'd save this to the backend
    localStorage.setItem('userPreferences', JSON.stringify({ ...preferences, [key]: value }));
  };

  return (
    <div className="p-6">
      <div className="max-w-2xl">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Preferences</h3>

        <div className="space-y-6">
          {/* Notifications */}
          <div>
            <h4 className="text-md font-medium text-gray-900 mb-4 flex items-center">
              <Bell className="h-5 w-5 text-gray-600 mr-2" />
              Notifications
            </h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Email Notifications</p>
                  <p className="text-sm text-gray-600">Receive updates about legal news and case reminders</p>
                </div>
                <button
                  onClick={() => handlePreferenceChange('emailNotifications', !preferences.emailNotifications)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    preferences.emailNotifications ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      preferences.emailNotifications ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Push Notifications</p>
                  <p className="text-sm text-gray-600">Get instant alerts for important updates</p>
                </div>
                <button
                  onClick={() => handlePreferenceChange('pushNotifications', !preferences.pushNotifications)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    preferences.pushNotifications ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      preferences.pushNotifications ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Appearance */}
          <div>
            <h4 className="text-md font-medium text-gray-900 mb-4 flex items-center">
              <Eye className="h-5 w-5 text-gray-600 mr-2" />
              Appearance
            </h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Dark Mode</p>
                  <p className="text-sm text-gray-600">Switch to dark theme (coming soon)</p>
                </div>
                <button
                  onClick={() => handlePreferenceChange('darkMode', !preferences.darkMode)}
                  disabled
                  className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 opacity-50 cursor-not-allowed"
                >
                  <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-1" />
                </button>
              </div>
            </div>
          </div>

          {/* Language & Region */}
          <div>
            <h4 className="text-md font-medium text-gray-900 mb-4">Language & Region</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                <select
                  value={preferences.language}
                  onChange={(e) => handlePreferenceChange('language', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="English">English</option>
                  <option value="Hindi">हिंदी (Hindi)</option>
                  <option value="Tamil">தமிழ் (Tamil)</option>
                  <option value="Telugu">తెలుగు (Telugu)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Timezone</label>
                <select
                  value={preferences.timezone}
                  onChange={(e) => handlePreferenceChange('timezone', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                  <option value="Asia/Mumbai">Asia/Mumbai (IST)</option>
                  <option value="UTC">UTC</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Security Tab Component
const SecurityTab: React.FC<{
  user: any;
  formatDate: (date: string) => string;
  showRawData: boolean;
  setShowRawData: (show: boolean) => void
}> = ({ user, formatDate, showRawData, setShowRawData }) => (
  <div className="p-6">
    <div className="max-w-4xl">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Security & Privacy</h3>

      <div className="space-y-6">
        {/* Account Security */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center">
            <Shield className="h-6 w-6 text-green-600 mr-3" />
            <div>
              <h4 className="font-medium text-green-900">Account Secured</h4>
              <p className="text-sm text-green-700">Your account is protected with email verification</p>
            </div>
          </div>
        </div>

        {/* Account Details */}
        <div>
          <h4 className="text-md font-medium text-gray-900 mb-4">Account Details</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Email Address</p>
                  <p className="text-sm text-gray-600">{user.email}</p>
                  <p className="text-xs text-green-600 mt-1">✓ Verified</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <User className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">User ID</p>
                  <p className="text-sm text-gray-600 font-mono">{user.id}</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Account Created</p>
                  <p className="text-sm text-gray-600">{formatDate(user.created_at)}</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Last Updated</p>
                  <p className="text-sm text-gray-600">{formatDate(user.updated_at || user.created_at)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Privacy Information */}
        <div>
          <h4 className="text-md font-medium text-gray-900 mb-4">Privacy Information</h4>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h5 className="font-medium text-blue-900 mb-2">Data Protection</h5>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Your data is encrypted and stored securely</li>
              <li>• We don't share your personal information with third parties</li>
              <li>• You can request data deletion at any time</li>
              <li>• All legal queries are processed confidentially</li>
            </ul>
          </div>
        </div>

        {/* Developer Information */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-md font-medium text-gray-900">Developer Information</h4>
            <button
              onClick={() => setShowRawData(!showRawData)}
              className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900"
            >
              {showRawData ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              <span>{showRawData ? 'Hide' : 'Show'} Raw Data</span>
            </button>
          </div>

          {showRawData && (
            <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
              <pre className="text-xs text-green-400 font-mono">
                {JSON.stringify(user, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
);

export default UserProfile;
