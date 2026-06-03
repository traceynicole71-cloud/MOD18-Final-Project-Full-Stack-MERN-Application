import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProjectCard({ project, onDelete }) {
    const navigate = useNavigate();

    return (
    <div className="bg-[#282a36]/40 border border-[#44475a] hover:border-[#ff79c6]/50 rounded-xl p-6 shadow-xl flex flex-col justify-between transition-all duration-300 transform hover:translate-y-[-2px]">
      <div>
        {/* Header Icon & Title */}
        <div className="flex items-center space-x-2 text-[#50fa7b] mb-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <h3 className="font-bold text-lg text-[#f8f8f2] tracking-wide">
            Title: {project.name}
          </h3>
        </div>
        
        {/* Project Description */}
        <p className="text-sm text-[#f8f8f2]/60 mb-6 font-light leading-relaxed line-clamp-3">
          Desc: {project.description}
        </p>
      </div>
      
      {/* Interactive Controls */}
      <div className="flex items-center space-x-3 pt-4 border-t border-[#44475a]/40">
        <button 
          onClick={() => navigate(`/projects/${project._id}`)} 
          className="bg-[#1e1f29] border border-[#50fa7b] text-[#50fa7b] hover:bg-[#50fa7b] hover:text-[#1e1f29] text-xs font-bold px-4 py-2 rounded-lg transition duration-200 shadow-sm outline-none"
        >
          View Details
        </button>
        <button 
          onClick={() => onDelete(project._id)}
          className="bg-[#1e1f29] border border-[#ff79c6] text-[#ff79c6] hover:bg-[#ff79c6] hover:text-[#1e1f29] text-xs font-bold px-4 py-2 rounded-lg transition duration-200 inline-flex items-center space-x-1 shadow-sm outline-none"
        >
          <span>🗑️</span> <span>Delete</span>
        </button>
      </div>
    </div>
  );
}