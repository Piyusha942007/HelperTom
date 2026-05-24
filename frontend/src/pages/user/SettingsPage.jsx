import { useState, useEffect } from 'react';
import { User, ShieldCheck, X } from 'lucide-react';
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

                {/* Email Address Row */}
                <div className="py-6 flex flex-col md:flex-row md:items-center justify-between gap-4 group border-b border-slate-100">
                  <div className="text-sm font-semibold text-slate-700 w-48 shrink-0">Email Address</div>
                  <div className="flex-1 flex items-center gap-4">
                    <span className="text-sm text-slate-900">{profile.email}</span>
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
