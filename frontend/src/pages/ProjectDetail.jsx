import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTasks } from '../hooks/useTasks';
import TaskItem from '../components/TaskItem';
import API from '../context/api';

export default function ProjectDetail() {
  const { id: projectId } = useParams();
  const navigate = useNavigate();
  //Inject background hooks
  const { tasks, loading, error, fetchTasks, createTask, updateTaskStatus, deleteTask } = useTasks(projectId);
  const [project, setProject] = useState(null);
  const [projectLoading, setProjectLoading] = useState(false);
  const [projectError, setProjectError] = useState(null);
  //Manage user-input forms 
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDesc, setTaskDesc] = useState('');
  const [collabEmail, setCollabEmail] = useState('');
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [showEditProjectModal, setShowEditProjectModal] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [submittingProject, setSubmittingProject] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      if (!projectId) return;

      setProjectLoading(true);
      setProjectError(null);
      try {
        const response = await API.get(`/projects/${projectId}`);
        setProject(response.data.data);
      } catch (fetchError) {
        setProjectError(fetchError.response?.data?.message || 'Failed to load project details');
      } finally {
        setProjectLoading(false);
      }
    };

    fetchProject();
  }, [projectId]);

  useEffect(() => {
    if (projectId) {
      fetchTasks();
    }
  }, [projectId, fetchTasks]);

  const handleAddTaskSubmit = async (e) => {
    e.preventDefault();
    if (!taskTitle || !taskDesc) return;
    try {
      await createTask(taskTitle, taskDesc);
      setTaskTitle('');
      setTaskDesc('');
      setShowAddTaskModal(false);
    } catch (taskError) {
      console.error('Failed to inject new task data model:', taskError);
    }
  };

  const handleOpenEditProject = () => {
    setProjectName(project?.name || '');
    setProjectDescription(project?.description || '');
    setProjectError(null);
    setShowEditProjectModal(true);
  };

  const handleEditProjectSubmit = async (e) => {
    e.preventDefault();
    if (!projectName.trim() || !projectDescription.trim()) {
      setProjectError('Project name and description are required');
      return;
    }

    setSubmittingProject(true);
    setProjectError(null);
    try {
      const response = await API.put(`/projects/${projectId}`, {
        name: projectName.trim(),
        description: projectDescription.trim(),
      });
      setProject(response.data.data);
      setShowEditProjectModal(false);
    } catch (submitError) {
      setProjectError(submitError.response?.data?.message || 'Failed to update project');
    } finally {
      setSubmittingProject(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1e1f29] text-[#f8f8f2] font-sans selection:bg-[#44475a]">
      
      {/* 1. DYNAMIC HEADER NAVBAR LAYER (Matches Mockup Exactly) */}
      <nav className="bg-[#1e1f29] border-b border-[#44475a]/60 px-8 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <span className="text-xl font-bold tracking-wider text-[#ff79c6] cursor-pointer" onClick={() => navigate('/dashboard')}>
            Pro-Tasker
          </span>
          <button onClick={() => navigate('/dashboard')} className="text-xs font-semibold text-[#50fa7b] hover:underline ml-6 flex items-center space-x-1 outline-none">
            <span>&larr;</span> <span>Back to Dashboard</span>
          </button>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-[#f8f8f2]/80">Welcome, User</span>
          <span className="text-sm text-[#f8f8f2]/60 border-l border-[#44475a] pl-4 cursor-pointer hover:text-[#ff79c6]">Logout</span>
        </div>
      </nav>

      {/* 2. PRIMARY KANBAN CANVAS COCKPIT VIEWPORT */}
      <main className="max-w-7xl mx-auto px-8 py-8">
        
        {/* Workspace Metadata Descriptions Header Frame */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#f8f8f2] mb-1">
            {projectLoading ? 'Loading project...' : project?.name || 'Project Workspace'}
          </h1>
          <p className="text-xs text-[#50fa7b]">
            Description: <span className="text-[#f8f8f2]/70 font-light ml-1">{project?.description || 'Live synchronized database workspace container environment.'}</span>
          </p>
        </div>

        {projectError && (
          <div className="mb-6 rounded-xl border border-[#ff5555] bg-[#ff5555]/10 px-4 py-3 text-sm text-[#ff5555]">
            {projectError}
          </div>
        )}

        {/* Action Controls Toolbar Area */}
        <div className="flex flex-wrap gap-4 items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => setShowAddTaskModal(!showAddTaskModal)}
              className="bg-[#1e1f29] border border-[#50fa7b] text-[#50fa7b] hover:bg-[#50fa7b] hover:text-[#1e1f29] font-bold text-xs px-4 py-2.5 rounded transition duration-200"
            >
              {showAddTaskModal ? 'Close Form' : '+ Add New Task'}
            </button>
            
            {/* Invite Collaborator Form Component Section */}
            <div className="flex items-center bg-[#1e1f29] border border-[#44475a] rounded px-3 py-1.5 space-x-2">
              <span className="text-xs font-bold text-[#f8f8f2]/60">Invite Collaborator</span>
              <input 
                type="email" 
                value={collabEmail}
                onChange={(e) => setCollabEmail(e.target.value)}
                placeholder="Enter email address" 
                className="bg-transparent text-xs text-[#f8f8f2] outline-none placeholder-[#f8f8f2]/20 w-40 sm:w-48"
              />
              <button className="text-[#50fa7b] text-base hover:scale-110 transition outline-none">&rarr;</button>
            </div>
          </div>

          <button onClick={handleOpenEditProject} className="bg-[#1e1f29] border border-[#ff79c6] text-[#ff79c6] hover:bg-[#ff79c6] hover:text-[#1e1f29] font-bold text-xs px-4 py-2.5 rounded transition inline-flex items-center space-x-1">
            <span>📝</span> <span>Edit Project</span>
          </button>
        </div>

        {showEditProjectModal && (
          <form onSubmit={handleEditProjectSubmit} className="bg-[#282a36]/40 border border-[#ff79c6] rounded-xl p-6 mb-8 max-w-xl space-y-4">
            <h3 className="text-sm font-bold text-[#ff79c6]">Edit Project Details</h3>
            <div className="grid grid-cols-1 gap-3">
              <input
                type="text"
                placeholder="Project name"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                className="bg-[#1e1f29] border border-[#44475a] focus:border-[#ff79c6] rounded p-2 text-xs outline-none"
              />
              <textarea
                placeholder="Project description"
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
                className="bg-[#1e1f29] border border-[#44475a] focus:border-[#ff79c6] rounded p-2 text-xs outline-none h-24 resize-none"
              />
            </div>
            <div className="flex gap-3">
              <button type="submit" disabled={submittingProject} className="bg-[#ff79c6] text-[#1e1f29] font-bold text-xs px-4 py-2 rounded hover:bg-[#ff92d0] transition disabled:cursor-not-allowed disabled:opacity-70">
                {submittingProject ? 'Saving...' : 'Save Changes'}
              </button>
              <button type="button" onClick={() => setShowEditProjectModal(false)} className="border border-[#44475a] text-[#f8f8f2] font-bold text-xs px-4 py-2 rounded hover:border-[#f8f8f2] transition">
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* Inline Pop-down Form Panel for creating tasks */}
        {showAddTaskModal && (
          <form onSubmit={handleAddTaskSubmit} className="bg-[#282a36]/40 border border-[#44475a] rounded-xl p-6 mb-8 max-w-xl space-y-4">
            <h3 className="text-sm font-bold text-[#ff79c6]">Edit New Task </h3>
            <div className="grid grid-cols-1 gap-3">
              <input 
                type="text" 
                placeholder="Task Title (e.g., Setup Express)" 
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                className="bg-[#1e1f29] border border-[#44475a] focus:border-[#50fa7b] rounded p-2 text-xs outline-none"
              />
              <textarea 
                placeholder="Task Description details..." 
                value={taskDesc}
                onChange={(e) => setTaskDesc(e.target.value)}
                className="bg-[#1e1f29] border border-[#44475a] focus:border-[#50fa7b] rounded p-2 text-xs outline-none h-20 resize-none"
              />
            </div>
            <button type="submit" className="bg-[#50fa7b] text-[#1e1f29] font-bold text-xs px-4 py-2 rounded hover:bg-[#69ff94] transition">
              Send
            </button>
          </form>
        )}

        {/* Visual Board Swimlane Separator Divider Ring */}
        <div className="relative flex py-4 items-center mb-6">
          <div className="flex-grow border-t border-dashed border-[#44475a]"></div>
          <span className="flex-shrink mx-4 text-xs tracking-widest uppercase font-bold text-[#50fa7b]">Kanban Task Board</span>
          <div className="flex-grow border-t border-dashed border-[#44475a]"></div>
        </div>

        {/* 3. CORE RENDERING LAYER (Handles Network Sync Interceptions) */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-3">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-[#50fa7b]"></div>
            <p className="text-xs text-[#f8f8f2]/40 tracking-widest font-light">Loading Kanban metrics...</p>
          </div>
        ) : error ? (
          <div className="bg-[#ff5555]/10 border border-[#ff5555] rounded-xl p-4 text-center text-xs text-[#ff5555]">
            Failed to coordinate workspace task map streams: {error}
          </div>
        ) : (
          /* 4. SWIMLANES LAYOUT GRID MATRIX SYSTEM (Hooks layout mapping iteratively) */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            
            {/* COLUMN LANE 1: TO DO */}
            <div className="bg-[#1e1f29] border border-[#44475a] rounded-xl p-4 min-h-[450px]">
              <h3 className="text-center font-bold text-xs text-[#ef4444] uppercase tracking-widest mb-4">To Do</h3>
              <div className="space-y-4">
                {tasks.filter(t => t.status === 'To Do').map(task => (
                  <TaskItem key={task._id} task={task} onUpdateStatus={updateTaskStatus} onDelete={deleteTask} />
                ))}
              </div>
            </div>

            {/* COLUMN LANE 2: IN PROGRESS */}
            <div className="bg-[#1e1f29] border border-[#44475a] rounded-xl p-4 min-h-[450px]">
              <h3 className="text-center font-bold text-xs text-[#eab308] uppercase tracking-widest mb-4">In Progress</h3>
              <div className="space-y-4">
                {tasks.filter(t => t.status === 'In Progress').map(task => (
                  <TaskItem key={task._id} task={task} onUpdateStatus={updateTaskStatus} onDelete={deleteTask} />
                ))}
              </div>
            </div>

            {/* COLUMN LANE 3: DONE */}
            <div className="bg-[#1e1f29] border border-[#44475a] rounded-xl p-4 min-h-[450px]">
              <h3 className="text-center font-bold text-xs text-[#50fa7b] uppercase tracking-widest mb-4">Done</h3>
              <div className="space-y-4">
                {tasks.filter(t => t.status === 'Done').map(task => (
                  <TaskItem key={task._id} task={task} onUpdateStatus={updateTaskStatus} onDelete={deleteTask} />
                ))}
              </div>
            </div>

          </div>
        )}
      </main>
    </div>
  );
}