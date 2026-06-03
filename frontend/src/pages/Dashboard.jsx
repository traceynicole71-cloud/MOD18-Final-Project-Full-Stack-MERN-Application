import { useEffect, useContext } from 'react';
import { AuthContext } from '../context/authContext';
import { useProjects } from '../hooks/useProjects';
import ProjectCard from '../components/ProjectCard';

export default function Dashboard() {
    const { logout, user } = useContext(AuthContext);
    const { projects, loading, error, fetchProjects, createProject, deleteProject } = useProjects();

   useEffect(() => {
    fetchProjects();
   }, [fetchProjects]);

    const handleCreateProject = async () => {
     const name = window.prompt('Project name');
     if (!name) return;
     const description = window.prompt('Project description') || '';
     await createProject(name, description);
    };

    const handleDeleteProject = async (projectId) => {
     await deleteProject(projectId);
    };

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
          <button onClick={handleCreateProject} className="bg-[#1e1f29] border border-[#50fa7b] text-[#50fa7b] hover:bg-[#50fa7b] hover:text-[#1e1f29] font-semibold text-sm px-4 py-2.5 rounded-lg shadow-md transition duration-200 flex items-center space-x-2">
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
            {projects.map((project) => (
              <ProjectCard key={project._id} project={project} onDelete={handleDeleteProject} />
            ))}
          </div>
        )}
        {error && <p className="mt-6 text-sm text-[#ff5555]">{error}</p>}
      </main>
    </div>
  );
}