import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProjectDetail() {
    const navigate = useNavigate();

    const [tasks, setTasks] = useState([
        { id: 'a', title: 'Task Title A', desc: 'Connect Atlas', status: 'To Do' },
        { id: 'b', title: 'Task Title B', desc: 'Hash Passwords', status: 'To Do' },
        { id: 'c', title: 'Task Title C', desc: 'Write Routes', status: 'In Progress' },
        { id: 'd', title: 'Task Title D', desc: 'Create Views', status: 'In Progress' },
        { id: 'd', title: 'Task Title E', desc: 'Setup Express', status: 'Done' }
    ]);

    return (
        <div className="min-h-screen bg-[#1e1f29] text-[#f8f8f2] font-sans selection:bg-[#44475a]">
      {/* Dynamic Header Navbar Layer */}
      <nav className="bg-[#1e1f29] border-b border-[#44475a]/60 px-8 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <span className="text-xl font-bold tracking-wider text-[#ff79c6] cursor-pointer" onClick={() => navigate('/dashboard')}>
            Pro-Tasker
          </span>
          <button onClick={() => navigate('/dashboard')} className="text-xs font-semibold text-[#50fa7b] hover:underline ml-6 flex items-center space-x-1">
            <span>&larr;</span> <span>Back to Dashboard</span>
          </button>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-[#f8f8f2]/80">Welcome, User</span>
          <span className="text-sm text-[#f8f8f2]/60 border-l border-[#44475a] pl-4 cursor-pointer hover:text-[#ff79c6]">Logout</span>
        </div>
      </nav>

      {/* Primary Kanban Canvas Area */}
      <main className="max-w-7xl mx-auto px-8 py-8">
        {/* Project Context Headers */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#f8f8f2] mb-1">Project: E-Commerce API</h1>
          <p className="text-xs text-[#50fa7b]">
            Description: <span className="text-[#f8f8f2]/70 font-light ml-1">Redesigning the core backend system using Node & Mongo.</span>
          </p>
        </div>

        {/* Action controls grid mirroring mockup parameters */}
        <div className="flex flex-wrap gap-4 items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <button className="bg-[#1e1f29] border border-[#50fa7b] text-[#50fa7b] hover:bg-[#50fa7b] hover:text-[#1e1f29] font-bold text-xs px-4 py-2.5 rounded transition">
              + Add New Task
            </button>
            
            {/* Invite Collaborator Widget */}
            <div className="flex items-center bg-[#1e1f29] border border-[#44475a] rounded px-3 py-1.5 space-x-2">
              <span className="text-xs font-bold text-[#f8f8f2]/60">Invite Collab</span>
              <input 
                type="email" 
                placeholder="Enter email address" 
                className="bg-transparent text-xs text-[#f8f8f2] outline-none placeholder-[#f8f8f2]/20 w-40 sm:w-48"
              />
              <button className="text-[#50fa7b] text-base hover:scale-110 transition">&;</button>
            </div>
          </div>

          <button className="bg-[#1e1f29] border border-[#ff79c6] text-[#ff79c6] hover:bg-[#ff79c6] hover:text-[#1e1f29] font-bold text-xs px-4 py-2.5 rounded transition inline-flex items-center space-x-1">
            <span>📝</span> <span>Edit Project</span>
          </button>
        </div>

        {/* Separator Divider Ring */}
        <div className="relative flex py-4 items-center mb-6">
          <div className="flex-grow border-t border-dashed border-[#44475a]"></div>
          <span className="flex-shrink mx-4 text-xs tracking-widest uppercase font-bold text-[#50fa7b]">Kanban Task Board</span>
          <div className="flex-grow border-t border-dashed border-[#44475a]"></div>
        </div>

        {/* Swimlanes Layout System */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* LANE A: TO DO */}
          <div className="bg-[#1e1f29] border border-[#44475a] rounded-xl p-4 min-h-[400px]">
            <h3 className="text-center font-bold text-xs text-[#8be9fd] uppercase tracking-widest mb-4">To Do</h3>
            <div className="space-y-4">
              {tasks.filter(t => t.status === 'To Do').map(task => (
                <div key={task.id} className="bg-[#282a36]/40 border border-[#44475a] rounded-lg p-4 shadow-md">
                  <h4 className="font-bold text-sm text-[#f8f8f2] mb-1">{task.title}</h4>
                  <p className="text-xs text-[#f8f8f2]/60 font-light mb-4">Desc: {task.desc}</p>
                  <div className="flex justify-between items-center pt-2 border-t border-[#44475a]/30">
                    <div className="flex items-center space-x-1">
                      <span className="text-[10px] uppercase font-bold text-[#f8f8f2]/40 mr-1">Move:</span>
                      <button className="bg-[#1e1f29] border border-[#50fa7b] text-[#50fa7b] text-[10px] px-2 py-1 rounded hover:bg-[#50fa7b] hover:text-[#1e1f29] transition">&rarr;</button>
                    </div>
                    <button className="border border-[#ff79c6] text-[#ff79c6] text-[10px] font-bold px-2 py-1 rounded hover:bg-[#ff79c6] hover:text-[#1e1f29] transition inline-flex items-center space-x-1">
                      <span>🗑️</span> <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* LANE B: IN PROGRESS */}
          <div className="bg-[#1e1f29] border border-[#44475a] rounded-xl p-4 min-h-[400px]">
            <h3 className="text-center font-bold text-xs text-[#50fa7b] uppercase tracking-widest mb-4">In Progress</h3>
            <div className="space-y-4">
              {tasks.filter(t => t.status === 'In Progress').map(task => (
                <div key={task.id} className="bg-[#282a36]/40 border border-[#44475a] rounded-lg p-4 shadow-md">
                  <h4 className="font-bold text-sm text-[#f8f8f2] mb-1">{task.title}</h4>
                  <p className="text-xs text-[#f8f8f2]/60 font-light mb-4">Desc: {task.desc}</p>
                  <div className="flex justify-between items-center pt-2 border-t border-[#44475a]/30">
                    <div className="flex items-center space-x-1">
                      <span className="text-[10px] uppercase font-bold text-[#f8f8f2]/40 mr-1">Move:</span>
                      <button className="bg-[#1e1f29] border border-[#50fa7b] text-[#50fa7b] text-[10px] px-2 py-1 rounded hover:bg-[#50fa7b] hover:text-[#1e1f29] transition">&larr;</button>
                      <button className="bg-[#1e1f29] border border-[#50fa7b] text-[#50fa7b] text-[10px] px-2 py-1 rounded hover:bg-[#50fa7b] hover:text-[#1e1f29] transition">&rarr;</button>
                    </div>
                    <button className="border border-[#ff79c6] text-[#ff79c6] text-[10px] font-bold px-2 py-1 rounded hover:bg-[#ff79c6] hover:text-[#1e1f29] transition">
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* LANE C: DONE */}
          <div className="bg-[#1e1f29] border border-[#44475a] rounded-xl p-4 min-h-[400px]">
            <h3 className="text-center font-bold text-xs text-[#50fa7b] uppercase tracking-widest mb-4">Done</h3>
            <div className="space-y-4">
              {tasks.filter(t => t.status === 'Done').map(task => (
                <div key={task.id} className="bg-[#282a36]/40 border border-[#44475a] rounded-lg p-4 shadow-md opacity-70">
                  <h4 className="font-bold text-sm text-[#f8f8f2] mb-1">{task.title}</h4>
                  <p className="text-xs text-[#f8f8f2]/60 font-light mb-4">Desc: {task.desc}</p>
                  <div className="flex justify-between items-center pt-2 border-t border-[#44475a]/30">
                    <div className="flex items-center space-x-1">
                      <span className="text-[10px] uppercase font-bold text-[#f8f8f2]/40 mr-1">Move:</span>
                      <button className="bg-[#1e1f29] border border-[#50fa7b] text-[#50fa7b] text-[10px] px-2 py-1 rounded hover:bg-[#50fa7b] hover:text-[#1e1f29] transition">&larr;</button>
                    </div>
                    <button className="border border-[#ff79c6] text-[#ff79c6] text-[10px] font-bold px-2 py-1 rounded hover:bg-[#ff79c6] hover:text-[#1e1f29] transition">
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}