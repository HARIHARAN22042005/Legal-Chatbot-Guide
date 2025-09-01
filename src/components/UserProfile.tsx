import React, { useState, useEffect } from 'react';
import { User, Mail, Calendar, Shield, Settings, Activity, BarChart3, FileText, MessageSquare, Bookmark, Clock, Award, Bell, Lock, Eye, EyeOff, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useBookmarks } from '../contexts/BookmarkContext';

// Enhanced interfaces for better type safety and clarity
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

// Main UserProfile component
const UserProfile: React.FC = () => {
  const { user, signOut } = useAuth();
  const { bookmarks } = useBookmarks();
  const [activeTab, setActiveTab] = useState<'overview' | 'activity' | 'settings' | 'security'>('overview');
  const [showRawData, setShowRawData] = useState(false);
  const [showSignOutModal, setShowSignOutModal] = useState(false);

  // Mock data for user statistics and preferences
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
    await signOut();
    setShowSignOutModal(false);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 bg-background min-h-screen">
      {/* Header */}
      <Header user={user} onSignOut={() => setShowSignOutModal(true)} formatDate={formatDate} />

      {/* Tab Navigation */}
      <TabNavigation tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Tab Content */}
      <main className="mt-6">
        <div className="bg-surface rounded-xl shadow-md border border-gray-200">
          {activeTab === 'overview' && <OverviewTab user={user} userStats={userStats} formatDate={formatDate} />}
          {activeTab === 'activity' && <ActivityTab userStats={userStats} bookmarks={bookmarks} />}
          {activeTab === 'settings' && <SettingsTab preferences={preferences} setPreferences={setPreferences} />}
          {activeTab === 'security' && <SecurityTab user={user} formatDate={formatDate} showRawData={showRawData} setShowRawData={setShowRawData} />}
        </div>
      </main>

      {/* Sign Out Modal */}
      {showSignOutModal && (
        <SignOutModal onConfirm={handleSignOut} onCancel={() => setShowSignOutModal(false)} />
      )}
    </div>
  );
};

// Header Component
const Header: React.FC<{ user: any; onSignOut: () => void; formatDate: (date: string) => string }> = ({ user, onSignOut, formatDate }) => (
  <header className="bg-surface rounded-xl shadow-md border border-gray-200 overflow-hidden mb-6">
    <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-6 py-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-20 h-20 bg-gray-700 rounded-full flex items-center justify-center ring-4 ring-gray-600">
            <User className="h-10 w-10 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">
              {user.email?.split('@')[0] || 'User'}
            </h1>
            <p className="text-gray-300 text-lg">{user.email}</p>
            <p className="text-gray-400 text-sm mt-1">
              Member since {formatDate(user.created_at)}
            </p>
          </div>
        </div>
        <button
          onClick={onSignOut}
          className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors shadow-lg"
        >
          <LogOut className="h-5 w-5" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  </header>
);

// Tab Navigation Component
const TabNavigation: React.FC<{ tabs: any[]; activeTab: string; setActiveTab: (tab: any) => void }> = ({ tabs, activeTab, setActiveTab }) => (
  <div className="bg-surface rounded-xl shadow-md border border-gray-200">
    <nav className="flex space-x-1 sm:space-x-4 px-4">
      {tabs.map(tab => {
        const Icon = tab.icon;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 py-4 px-2 sm:px-4 border-b-4 font-semibold text-sm sm:text-base transition-all duration-300 ${
              activeTab === tab.id
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-300'
            }`}
          >
            <Icon className="h-5 w-5" />
            <span>{tab.label}</span>
          </button>
        );
      })}
    </nav>
  </div>
);

// Overview Tab Component
const OverviewTab: React.FC<{ user: any; userStats: UserStats; formatDate: (date: string) => string }> = ({ user, userStats, formatDate }) => (
  <div className="p-6">
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon={MessageSquare} value={userStats.questionsAsked} label="Questions Asked" color="primary" />
        <StatCard icon={FileText} value={userStats.documentsAnalyzed} label="Documents" color="green" />
        <StatCard icon={BarChart3} value={userStats.casesTracked} label="Cases Tracked" color="orange" />
        <StatCard icon={Bookmark} value={userStats.bookmarksSaved} label="Bookmarks" color="purple" />
      </div>
      <AccountInfo user={user} userStats={userStats} formatDate={formatDate} />
    </div>
    <AchievementsSection />
  </div>
);

// Stat Card Component
const StatCard: React.FC<{ icon: React.ElementType; value: number; label: string; color: string }> = ({ icon: Icon, value, label, color }) => (
  <div className={`bg-${color}-50 p-4 rounded-xl border border-${color}-200 shadow-sm hover:shadow-md transition-shadow`}>
    <div className="flex items-center">
      <Icon className={`h-8 w-8 text-${color}-600`} />
      <div className="ml-3">
        <p className={`text-2xl font-bold text-${color}-900`}>{value}</p>
        <p className={`text-sm text-${color}-700`}>{label}</p>
      </div>
    </div>
  </div>
);

// Account Info Component
const AccountInfo: React.FC<{ user: any; userStats: UserStats; formatDate: (date: string) => string }> = ({ user, userStats, formatDate }) => (
  <div className="space-y-4 bg-gray-50 p-4 rounded-xl border border-gray-200">
    <h3 className="text-lg font-semibold text-gray-900">Account Information</h3>
    <InfoItem icon={Mail} label="Email" value={user.email} />
    <InfoItem icon={Calendar} label="Member Since" value={formatDate(user.created_at)} />
    <InfoItem icon={Clock} label="Last Active" value={userStats.lastActive.toLocaleDateString()} />
  </div>
);

// Info Item Component
const InfoItem: React.FC<{ icon: React.ElementType; label: string; value: string }> = ({ icon: Icon, label, value }) => (
  <div className="flex items-start space-x-3 p-3 bg-white rounded-lg border border-gray-200">
    <Icon className="h-5 w-5 text-gray-500 mt-1" />
    <div>
      <p className="text-sm font-medium text-gray-900">{label}</p>
      <p className="text-sm text-gray-600 break-all">{value}</p>
    </div>
  </div>
);

// Achievements Section Component
const AchievementsSection: React.FC = () => (
  <div className="mt-8 pt-6 border-t border-gray-200">
    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
      <Award className="h-6 w-6 text-yellow-600 mr-2" />
      Achievements
    </h3>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <AchievementCard icon={Award} title="Legal Explorer" description="Asked 100+ questions" color="yellow" />
      <AchievementCard icon={FileText} title="Document Analyst" description="Analyzed 20+ documents" color="blue" />
      <AchievementCard icon={Bookmark} title="Knowledge Collector" description="Saved 40+ bookmarks" color="green" />
    </div>
  </div>
);

// Achievement Card Component
const AchievementCard: React.FC<{ icon: React.ElementType; title: string; description: string; color: string }> = ({ icon: Icon, title, description, color }) => (
  <div className={`p-4 bg-${color}-50 border border-${color}-200 rounded-xl shadow-sm`}>
    <div className="flex items-center">
      <Icon className={`h-6 w-6 text-${color}-600`} />
      <div className="ml-3">
        <p className={`font-semibold text-${color}-900`}>{title}</p>
        <p className={`text-sm text-${color}-700`}>{description}</p>
      </div>
    </div>
  </div>
);

// Activity Tab Component
const ActivityTab: React.FC<{ userStats: UserStats; bookmarks: any[] }> = ({ userStats, bookmarks }) => (
  <div className="p-6">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <UsageStatistics userStats={userStats} />
      <RecentBookmarks bookmarks={bookmarks} />
    </div>
  </div>
);

// Usage Statistics Component
const UsageStatistics: React.FC<{ userStats: UserStats }> = ({ userStats }) => (
  <div>
    <h3 className="text-xl font-semibold text-gray-900 mb-4">Usage Statistics</h3>
    <div className="space-y-4">
      <UsageBar icon={MessageSquare} label="Questions Asked" value={userStats.questionsAsked} maxValue={150} color="primary" />
      <UsageBar icon={FileText} label="Documents Analyzed" value={userStats.documentsAnalyzed} maxValue={50} color="green" />
      <UsageBar icon={BarChart3} label="Total Sessions" value={userStats.totalSessions} maxValue={60} color="orange" />
    </div>
  </div>
);

// Usage Bar Component
const UsageBar: React.FC<{ icon: React.ElementType; label: string; value: number; maxValue: number; color: string }> = ({ icon: Icon, label, value, maxValue, color }) => (
  <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
    <div className="flex items-center justify-between mb-2">
      <div className="flex items-center">
        <Icon className={`h-5 w-5 text-${color}-600 mr-3`} />
        <span className="font-medium">{label}</span>
      </div>
      <span className={`text-2xl font-bold text-${color}-600`}>{value}</span>
    </div>
    <div className={`bg-${color}-200 rounded-full h-2.5`}>
      <div className={`bg-${color}-600 h-2.5 rounded-full`} style={{ width: `${(value / maxValue) * 100}%` }}></div>
    </div>
  </div>
);

// Recent Bookmarks Component
const RecentBookmarks: React.FC<{ bookmarks: any[] }> = ({ bookmarks }) => (
  <div>
    <h3 className="text-xl font-semibold text-gray-900 mb-4">Recent Bookmarks</h3>
    <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
      {bookmarks.length > 0 ? (
        bookmarks.slice(0, 10).map((bookmark, index) => (
          <div key={bookmark.id || index} className="p-4 bg-gray-50 rounded-xl border border-gray-200 hover:bg-gray-100 transition-colors">
            <h4 className="font-semibold text-gray-900 text-md">{bookmark.title}</h4>
            <p className="text-sm text-gray-600 mt-1 line-clamp-2">{bookmark.content}</p>
            <div className="flex items-center justify-between mt-3">
              <span className="text-xs font-medium text-primary bg-blue-100 px-2 py-1 rounded-full">{bookmark.source}</span>
              <span className="text-xs text-gray-500">{new Date(bookmark.timestamp).toLocaleDateString()}</span>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-xl">
          <Bookmark className="h-10 w-10 mx-auto mb-3 text-gray-400" />
          <p className="font-medium">No bookmarks saved yet</p>
          <p className="text-sm">Start bookmarking important information.</p>
        </div>
      )}
    </div>
  </div>
);

// Settings Tab Component
const SettingsTab: React.FC<{ preferences: UserPreferences; setPreferences: (prefs: UserPreferences) => void }> = ({ preferences, setPreferences }) => {
  const handlePreferenceChange = (key: keyof UserPreferences, value: any) => {
    const newPreferences = { ...preferences, [key]: value };
    setPreferences(newPreferences);
    localStorage.setItem('userPreferences', JSON.stringify(newPreferences));
  };

  return (
    <div className="p-6">
      <div className="max-w-3xl mx-auto">
        <h3 className="text-2xl font-bold text-gray-900 mb-8">Preferences</h3>
        <div className="space-y-8">
          <SettingsSection icon={Bell} title="Notifications">
            <ToggleSetting
              label="Email Notifications"
              description="Receive updates about legal news and case reminders"
              enabled={preferences.emailNotifications}
              onChange={() => handlePreferenceChange('emailNotifications', !preferences.emailNotifications)}
            />
            <ToggleSetting
              label="Push Notifications"
              description="Get instant alerts for important updates"
              enabled={preferences.pushNotifications}
              onChange={() => handlePreferenceChange('pushNotifications', !preferences.pushNotifications)}
            />
          </SettingsSection>

          <SettingsSection icon={Eye} title="Appearance">
            <ToggleSetting
              label="Dark Mode"
              description="Switch to dark theme (coming soon)"
              enabled={preferences.darkMode}
              onChange={() => {}}
              disabled
            />
          </SettingsSection>

          <SettingsSection icon={Globe} title="Language & Region">
            <SelectSetting
              label="Language"
              value={preferences.language}
              onChange={(e) => handlePreferenceChange('language', e.target.value)}
              options={[
                { value: 'English', label: 'English' },
                { value: 'Hindi', label: 'हिंदी (Hindi)' },
                { value: 'Tamil', label: 'தமிழ் (Tamil)' },
                { value: 'Telugu', label: 'తెలుగు (Telugu)' },
              ]}
            />
            <SelectSetting
              label="Timezone"
              value={preferences.timezone}
              onChange={(e) => handlePreferenceChange('timezone', e.target.value)}
              options={[
                { value: 'Asia/Kolkata', label: 'Asia/Kolkata (IST)' },
                { value: 'Asia/Mumbai', label: 'Asia/Mumbai (IST)' },
                { value: 'UTC', label: 'UTC' },
              ]}
            />
          </SettingsSection>
        </div>
      </div>
    </div>
  );
};

// Settings Section Component
const SettingsSection: React.FC<{ icon: React.ElementType; title: string; children: React.ReactNode }> = ({ icon: Icon, title, children }) => (
  <div>
    <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
      <Icon className="h-6 w-6 text-gray-600 mr-3" />
      {title}
    </h4>
    <div className="space-y-4 pl-9">{children}</div>
  </div>
);

// Toggle Setting Component
const ToggleSetting: React.FC<{ label: string; description: string; enabled: boolean; onChange: () => void; disabled?: boolean }> = ({ label, description, enabled, onChange, disabled }) => (
  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200">
    <div>
      <p className="font-medium text-gray-900">{label}</p>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
    <button
      onClick={onChange}
      disabled={disabled}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        enabled ? 'bg-primary' : 'bg-gray-300'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          enabled ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  </div>
);

// Select Setting Component
const SelectSetting: React.FC<{ label: string; value: string; onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void; options: { value: string; label: string }[] }> = ({ label, value, onChange, options }) => (
  <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
    <label className="block text-md font-medium text-gray-800 mb-2">{label}</label>
    <select
      value={value}
      onChange={onChange}
      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-primary transition-shadow"
    >
      {options.map(option => (
        <option key={option.value} value={option.value}>{option.label}</option>
      ))}
    </select>
  </div>
);

// Security Tab Component
const SecurityTab: React.FC<{ user: any; formatDate: (date: string) => string; showRawData: boolean; setShowRawData: (show: boolean) => void }> = ({ user, formatDate, showRawData, setShowRawData }) => (
  <div className="p-6">
    <div className="max-w-4xl mx-auto">
      <h3 className="text-2xl font-bold text-gray-900 mb-8">Security & Privacy</h3>
      <div className="space-y-8">
        <SecurityStatus />
        <AccountDetails user={user} formatDate={formatDate} />
        <PrivacyInfo />
        <DeveloperInfo user={user} showRawData={showRawData} setShowRawData={setShowRawData} />
      </div>
    </div>
  </div>
);

// Security Status Component
const SecurityStatus: React.FC = () => (
  <div className="bg-green-50 border-l-4 border-green-500 rounded-r-lg p-4 shadow-sm">
    <div className="flex items-center">
      <Shield className="h-7 w-7 text-green-600 mr-4" />
      <div>
        <h4 className="font-semibold text-green-900">Account Secured</h4>
        <p className="text-sm text-green-800">Your account is protected with email-based authentication.</p>
      </div>
    </div>
  </div>
);

// Account Details Component
const AccountDetails: React.FC<{ user: any; formatDate: (date: string) => string }> = ({ user, formatDate }) => (
  <div>
    <h4 className="text-lg font-semibold text-gray-900 mb-4">Account Details</h4>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <DetailItem icon={Mail} label="Email Address" value={user.email} verified />
      <DetailItem icon={User} label="User ID" value={user.id} mono />
      <DetailItem icon={Calendar} label="Account Created" value={formatDate(user.created_at)} />
      <DetailItem icon={Clock} label="Last Updated" value={formatDate(user.updated_at || user.created_at)} />
    </div>
  </div>
);

// Detail Item Component
const DetailItem: React.FC<{ icon: React.ElementType; label: string; value: string; verified?: boolean; mono?: boolean }> = ({ icon: Icon, label, value, verified, mono }) => (
  <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
    <div className="flex items-start space-x-3">
      <Icon className="h-5 w-5 text-gray-500 mt-1" />
      <div>
        <p className="text-sm font-medium text-gray-900">{label}</p>
        <p className={`text-sm text-gray-600 ${mono ? 'font-mono' : ''}`}>{value}</p>
        {verified && <p className="text-xs text-green-600 mt-1 font-semibold">✓ Verified</p>}
      </div>
    </div>
  </div>
);

// Privacy Info Component
const PrivacyInfo: React.FC = () => (
  <div>
    <h4 className="text-lg font-semibold text-gray-900 mb-4">Privacy Information</h4>
    <div className="bg-blue-50 border-l-4 border-primary rounded-r-lg p-4 shadow-sm">
      <h5 className="font-semibold text-primary-dark mb-2">Data Protection Commitment</h5>
      <ul className="text-sm text-primary-dark space-y-2 list-disc list-inside">
        <li>Your data is encrypted at rest and in transit.</li>
        <li>We do not share your personal information with third parties without your consent.</li>
        <li>You have the right to request data deletion at any time.</li>
        <li>All legal queries are processed with strict confidentiality.</li>
      </ul>
    </div>
  </div>
);

// Developer Info Component
const DeveloperInfo: React.FC<{ user: any; showRawData: boolean; setShowRawData: (show: boolean) => void }> = ({ user, showRawData, setShowRawData }) => (
  <div>
    <div className="flex items-center justify-between mb-4">
      <h4 className="text-lg font-semibold text-gray-900">Developer Information</h4>
      <button
        onClick={() => setShowRawData(!showRawData)}
        className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900 font-medium"
      >
        {showRawData ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        <span>{showRawData ? 'Hide' : 'Show'} Raw User Data</span>
      </button>
    </div>
    {showRawData && (
      <div className="bg-gray-900 rounded-xl p-4 overflow-x-auto shadow-inner">
        <pre className="text-xs text-green-400 font-mono">
          {JSON.stringify(user, null, 2)}
        </pre>
      </div>
    )}
  </div>
);

// Sign Out Modal Component
const SignOutModal: React.FC<{ onConfirm: () => void; onCancel: () => void }> = ({ onConfirm, onCancel }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-surface rounded-xl shadow-2xl p-8 max-w-sm w-full">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Confirm Sign Out</h2>
      <p className="text-gray-600 mb-6">Are you sure you want to sign out of your account?</p>
      <div className="flex justify-end space-x-4">
        <button
          onClick={onCancel}
          className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold transition-colors shadow-lg"
        >
          Sign Out
        </button>
      </div>
    </div>
  </div>
);

// A placeholder for the Globe icon if not available in lucide-react
const Globe: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
);

export default UserProfile;
