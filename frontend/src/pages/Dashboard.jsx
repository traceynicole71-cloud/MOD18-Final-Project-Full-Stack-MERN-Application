import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import PAI from '../context/api';

export default function Dashboard() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const { logout, user } = useContext(AuthContext);
    const navigate = useNavigate();

    //Pull workspaces match database records
    useEffect(() => {
        const fetchWorkspaces = async () => {
            try {
                const res = await API.get('/projects');
                setProjects(res.data.data);
            } catch (error) {
                console.error("API Fetch breakdown:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchWorkspaces();
    }, []);

    return (
        <div className="min-h-screen bg-[#1e1f29] text-[#f8f8f2] font-sans selection:bg-[#44475a]">
      {/* Top Main Application Context Control Toolbar Nav */}
      <nav className="bg-[#1e1f29] border-b border-[#44475a]/60 px-8 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <svg className="w-6 h-6 text-[#ff79c6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
          <span className="text-xl font-bold tracking-wider text-[#ff79c6]">Pro-Tasker</span>
          <div className="h-6 w-px bg-[#44475a] mx-4 hidden sm:block"></div>
          <span className="text-sm font-semibold text-[#ff79c6] border-b-2 border-[#ff79c6] pb-4 pt-1 hidden sm:inline translate-y-[10px]">My Dashboard</span>
        </div>
        
        <div className="flex items-center space-x-6">
          <span className="text-sm text-[#f8f8f2]/80">Welcome, <strong className="text-[#f8f8f2] font-semibold">{user?.name || 'User'}</strong></span>
          <button onClick={logout} className="text-sm font-semibold text-[#f8f8f2]/60 hover:text-[#ff79c6] transition border-l border-[#44475a] pl-6 py-1">
            Logout
          </button>
        </div>
      </nav>

      {/* Primary Dashboard Content Area */}
      <main className="max-w-7xl mx-auto px-8 py-10">

        {/* Workspace Portfolio Sub-Header Actions Toolbar */}
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-xl font-bold text-[#50fa7b] tracking-wide">Your Projects</h2>
          <button className="bg-[#1e1f29] border border-[#50fa7b] text-[#50fa7b] hover:bg-[#50fa7b] hover:text-[#1e1f29] font-semibold text-sm px-4 py-2.5 rounded-lg shadow-md transition duration-200 flex items-center space-x-2">
            <span>+</span> <span>Create New Project</span>
          </button>
        </div>

        {/* Dynamic Portfolio Status Grids */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-[#ff79c6]"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            
            {/* Project Card Template: E-Commerce API */}
            <div className="bg-[#282a36]/40 border border-[#44475a] rounded-xl p-6 shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center space-x-2 text-[#50fa7b] mb-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  <h3 className="font-bold text-lg text-[#f8f8f2] tracking-wide">Title: E-Commerce API</h3>
                </div>

               <p className="text-sm text-[#f8f8f2]/60 mb-6 font-light leading-relaxed">Desc: Redesigning the backend...</p>
              </div>
              <div className="flex items-center space-x-3 pt-4 border-t border-[#44475a]/40">
                <button onClick={() => navigate('/projects/ecommerce-api')} className="bg-[#1e1f29] border border-[#50fa7b] text-[#50fa7b] hover:bg-[#50fa7b] hover:text-[#1e1f29] text-xs font-bold px-4 py-2 rounded-lg transition duration-200">
                  View Details
                </button>
                <button className="bg-[#1e1f29] border border-[#ff79c6] text-[#ff79c6] hover:bg-[#ff79c6] hover:text-[#1e1f29] text-xs font-bold px-4 py-2 rounded-lg transition duration-200 inline-flex items-center space-x-1">
                  <span>🗑️</span> <span>Delete</span>
                </button>
              </div>
            </div>

            {/* Project Card Template: Portfolio Website */}
            <div className="bg-[#282a36]/40 border border-[#44475a] rounded-xl p-6 shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center space-x-2 text-[#50fa7b] mb-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  <h3 className="font-bold text-lg text-[#f8f8f2] tracking-wide">Title: Portfolio Website</h3>
                </div>
                <p className="text-sm text-[#f8f8f2]/60 mb-6 font-light leading-relaxed">Desc: Modern UI using Vite</p>
              </div>
              <div className="flex items-center space-x-3 pt-4 border-t border-[#44475a]/40">
                <button className="bg-[#1e1f29] border border-[#50fa7b] text-[#50fa7b] hover:bg-[#50fa7b] hover:text-[#1e1f29] text-xs font-bold px-4 py-2 rounded-lg transition duration-200">
                  View Details
              </button>
                <button className="bg-[#1e1f29] border border-[#ff79c6] text-[#ff79c6] hover:bg-[#ff79c6] hover:text-[#1e1f29] text-xs font-bold px-4 py-2 rounded-lg transition duration-200 inline-flex items-center space-x-1">
                  <span>🗑️</span> <span>Delete</span>
                </button>
              </div>
            </div>

            {/* Project Card Template: Mobile App Fixes */}
            <div className="bg-[#282a36]/40 border border-[#44475a] rounded-xl p-6 shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center space-x-2 text-[#50fa7b] mb-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  <h3 className="font-bold text-lg text-[#f8f8f2] tracking-wide">Title: Mobile App Fixes</h3>
                </div>
                <p className="text-sm text-[#f8f8f2]/60 mb-6 font-light leading-relaxed">Desc: Fixing bugs and improving UX</p>
              </div>
              <div className="flex items-center space-x-3 pt-4 border-t border-[#44475a]/40">
                <button className="bg-[#1e1f29] border border-[#50fa7b] text-[#50fa7b] hover:bg-[#50fa7b] hover:text-[#1e1f29] text-xs font-bold px-4 py-2 rounded-lg transition duration-200">
                  View Details
                </button>
                <button className="bg-[#1e1f29] border border-[#ff79c6] text-[#ff79c6] hover:bg-[#ff79c6] hover:text-[#1e1f29] text-xs font-bold px-4 py-2 rounded-lg transition duration-200 inline-flex items-center space-x-1">
                  <span>🗑️</span> <span>Delete</span>
                </button>
               </div>
            </div>

          </div>
        )}
      </main>
    </div>
  );
}