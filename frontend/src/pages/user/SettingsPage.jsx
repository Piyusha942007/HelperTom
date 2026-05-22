import { useState, useEffect } from 'react';
import { User, ShieldCheck, Plus, MoreHorizontal, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [profile, setProfile] = useState({ fullName: '', username: '', email: '' });
  const [draftProfile, setDraftProfile] = useState({ fullName: '', username: '', email: '' });
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const email = typeof window !== 'undefined' ? sessionStorage.getItem('userEmail') : null;
    if (!email) return;
    const key = `profile_${email}`;
    const stored = typeof window !== 'undefined' ? localStorage.getItem(key) : null;
    let loadedProfile;
    if (stored) {
      try {
        loadedProfile = JSON.parse(stored);
      } catch (e) {
        loadedProfile = null;
      }
    }
    if (!loadedProfile) {
      const prefix = email.split('@')[0] || '';
      const capitalized = prefix.charAt(0).toUpperCase() + prefix.slice(1);
      loadedProfile = { fullName: capitalized, username: prefix, email };
    }
    setProfile(loadedProfile);
    setDraftProfile(loadedProfile);
  }, []);

  const saveProfile = (newProfile) => {
    const key = `profile_${newProfile.email}`;
    localStorage.setItem(key, JSON.stringify(newProfile));
    setProfile(newProfile);
    setDraftProfile(newProfile);
    setEditing(false);
  };

  const cancelEdit = () => {
    setDraftProfile(profile);
    setEditing(false);
  };
  const navigate = useNavigate();

  return (
    <div className="flex h-[calc(100vh-4rem)] max-w-6xl mx-auto p-4 lg:p-8">
      {/* Clerk Style Container */}
      <div className="flex w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-border">
        
        {/* Left Sidebar */}
        <div className="w-64 bg-slate-50/50 border-r border-border flex flex-col shrink-0">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-1">Account</h2>
            <p className="text-sm text-slate-500">Manage your account info.</p>
          </div>
          
          <div className="flex-1 px-3 space-y-1">
            <button 
              onClick={() => setActiveTab('profile')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'profile' ? 'bg-slate-200 text-slate-900' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <User size={18} className={activeTab === 'profile' ? 'text-slate-800' : 'text-slate-500'} />
              Profile
            </button>
            <button 
              onClick={() => setActiveTab('security')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'security' ? 'bg-slate-200 text-slate-900' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <ShieldCheck size={18} className={activeTab === 'security' ? 'text-slate-800' : 'text-slate-500'} />
              Security
            </button>
          </div>

          <div className="p-4 flex items-center gap-1.5 text-xs font-semibold text-slate-500 mt-auto opacity-70">
            <span>Secured by</span>
            {/* Fake clerk logo */}
            <svg width="40" height="15" viewBox="0 0 60 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.1479 20C15.7533 20 20.2958 15.5228 20.2958 10C20.2958 4.47715 15.7533 0 10.1479 0C4.54245 0 0 4.47715 0 10C0 15.5228 4.54245 20 10.1479 20ZM10.1479 16C13.5137 16 16.2366 13.3137 16.2366 10C16.2366 6.68629 13.5137 4 10.1479 4C6.78206 4 4.05915 6.68629 4.05915 10C4.05915 13.3137 6.78206 16 10.1479 16Z" fill="#6B7280"/>
              <text x="24" y="15" fontSize="14" fontWeight="bold" fill="#6B7280" fontFamily="sans-serif">clerk</text>
            </svg>
          </div>
        </div>

        {/* Right Content Area */}
        <div className="flex-1 relative bg-white flex flex-col">
          {/* Close button */}
          <button 
            onClick={() => navigate(-1)}
            className="absolute top-6 right-6 w-8 h-8 bg-pink-400 hover:bg-pink-500 text-white rounded-full flex items-center justify-center transition-colors z-10 shadow-sm"
          >
            <X size={16} strokeWidth={3} />
          </button>

          {activeTab === 'profile' && (
            <motion.div 
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex-1 overflow-y-auto custom-scrollbar p-10 lg:px-14"
            >
              <h1 className="text-2xl font-bold text-slate-900 mb-8">Profile Details</h1>

              <div className="divide-y divide-slate-100 border-t border-slate-100">
                {/* Profile Row */}
                <div className="py-6 flex flex-col gap-6 group">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-pink-700 text-white rounded-full flex items-center justify-center text-xl font-medium shrink-0">
                      {profile.fullName ? profile.fullName.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-700">{profile.fullName}</div>
                      <div className="text-sm text-slate-500">{profile.username}</div>
                    </div>
                  </div>

                  {!editing ? (
                    <button onClick={() => setEditing(true)} className="w-fit px-4 py-2 rounded-lg bg-slate-100 text-slate-700 font-medium hover:bg-slate-200 transition-colors">
                      Edit Profile
                    </button>
                  ) : (
                    <div className="grid gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-[0.2em] mb-2">Full Name</label>
                        <input
                          value={draftProfile.fullName}
                          onChange={(e) => setDraftProfile(prev => ({ ...prev, fullName: e.target.value }))}
                          className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-slate-400"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-[0.2em] mb-2">Username</label>
                        <input
                          value={draftProfile.username}
                          onChange={(e) => setDraftProfile(prev => ({ ...prev, username: e.target.value }))}
                          className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-slate-400"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-[0.2em] mb-2">Email</label>
                        <input
                          value={draftProfile.email}
                          disabled
                          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500"
                        />
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => saveProfile(draftProfile)}
                          className="px-4 py-3 rounded-2xl bg-emerald-600 text-white font-semibold hover:bg-emerald-500 transition-colors"
                        >
                          Save Profile
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="px-4 py-3 rounded-2xl border border-slate-200 text-slate-600 hover:bg-slate-100 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Username Row */}
                <div className="py-6 flex flex-col md:flex-row md:items-center justify-between gap-4 group">
                  <div className="text-sm font-semibold text-slate-700 w-48 shrink-0">Email Address</div>
                  <div className="flex-1 flex items-center gap-4">
                    <span className="text-sm text-slate-900">{profile.email}</span>
                  </div>
                </div>

                {/* Email Addresses Row */}
                <div className="py-6 flex flex-col md:flex-row md:items-start justify-between gap-4 group">
                  <div className="text-sm font-semibold text-slate-700 w-48 shrink-0 pt-1">Email addresses</div>
                  <div className="flex-1 flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                          <span className="text-sm text-slate-900">{profile.email}</span>
                          <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[11px] font-semibold rounded-md border border-slate-200">Primary</span>
                        </div>
                      <button className="text-slate-400 hover:text-slate-600">
                        <MoreHorizontal size={18} />
                      </button>
                    </div>
                    <button className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 self-start">
                      <Plus size={16} /> Add Email Address
                    </button>
                  </div>
                </div>

                {/* Phone Numbers Row */}
                <div className="py-6 flex flex-col md:flex-row md:items-center justify-between gap-4 group">
                  <div className="text-sm font-semibold text-slate-700 w-48 shrink-0">Phone numbers</div>
                  <div className="flex-1">
                    <button className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900">
                      <Plus size={16} /> Add Phone Number
                    </button>
                  </div>
                </div>

                {/* Connected Accounts Row */}
                <div className="py-6 flex flex-col md:flex-row md:items-center justify-between gap-4 group border-b border-slate-100">
                  <div className="text-sm font-semibold text-slate-700 w-48 shrink-0">Connected accounts</div>
                  <div className="flex-1 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 flex items-center justify-center shrink-0">
                        {/* Fake google icon */}
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                        </svg>
                      </div>
                      <span className="text-sm font-medium text-slate-900">Google</span>
                      <span className="text-sm text-slate-500">• theanvisharma@gmail.com</span>
                    </div>
                    <button className="text-slate-400 hover:text-slate-600">
                      <MoreHorizontal size={18} />
                    </button>
                  </div>
                </div>

              </div>
            </motion.div>
          )}
          
          {activeTab === 'security' && (
            <motion.div 
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex-1 overflow-y-auto custom-scrollbar p-10 lg:px-14"
            >
              <h1 className="text-2xl font-bold text-slate-900 mb-8">Security</h1>
              <p className="text-slate-500">Security settings placeholder.</p>
            </motion.div>
          )}

        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
