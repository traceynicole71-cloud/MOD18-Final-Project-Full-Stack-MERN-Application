import React from 'react';

export default function TaskItem({ task, onUpdateStatus, onDelete }) {
    const currentStatus = task.status;

    return (
    <div className={`bg-[#282a36]/40 border border-[#44475a] rounded-lg p-4 shadow-md hover:border-[#ff79c6]/30 transition duration-200 ${currentStatus === 'Done' ? 'opacity-70 border-dashed' : ''}`}>
      <h4 className={`font-bold text-sm text-[#f8f8f2] mb-1 ${currentStatus === 'Done' ? 'line-through decoration-[#44475a]' : ''}`}>
        {task.title}
      </h4>
      <p className={`text-xs font-light mb-4 ${currentStatus === 'Done' ? 'text-[#f8f8f2]/40' : 'text-[#f8f8f2]/60'}`}>
        Desc: {task.description}
      </p>
      
      <div className="flex justify-between items-center pt-2 border-t border-[#44475a]/30">
        {/* Context-aware swimlane navigation controls */}
        <div className="flex items-center space-x-1">
          <span className="text-[10px] uppercase font-bold text-[#f8f8f2]/40 mr-1">Move:</span>
          
          {currentStatus !== 'To Do' && (
            <button 
              onClick={() => onUpdateStatus(task._id, currentStatus === 'Done' ? 'In Progress' : 'To Do')}
              className="bg-[#1e1f29] border border-[#50fa7b] text-[#50fa7b] text-[10px] px-2 py-1 rounded hover:bg-[#50fa7b] hover:text-[#1e1f29] transition duration-150 font-bold outline-none"
              title="Move Left"
            >
              &larr;
            </button>
          )}

          {currentStatus !== 'Done' && (
            <button 
              onClick={() => onUpdateStatus(task._id, currentStatus === 'To Do' ? 'In Progress' : 'Done')}
              className="bg-[#1e1f29] border border-[#50fa7b] text-[#50fa7b] text-[10px] px-2 py-1 rounded hover:bg-[#50fa7b] hover:text-[#1e1f29] transition duration-150 font-bold outline-none"
              title="Move Right"
            >
              &rarr;
            </button>
          )}
        </div>
        
        <button 
          onClick={() => onDelete(task._id)}
          className="border border-[#ff79c6] text-[#ff79c6] text-[10px] font-bold px-2 py-1 rounded hover:bg-[#ff79c6] hover:text-[#1e1f29] transition duration-150 inline-flex items-center space-x-1 outline-none"
        >
          {currentStatus === 'Done' ? '✕' : <span>🗑️ Delete</span>}
        </button>
      </div>
    </div>
  );
}