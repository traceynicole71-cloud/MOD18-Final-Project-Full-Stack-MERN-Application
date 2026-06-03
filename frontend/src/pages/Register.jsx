import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [formError, setFormError] = useState(null);

    const { register, error: apiError, setError } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (setError) setError(null);
    }, [setError]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormError(null);

        if (!name || !email || !password || !confirmPassword) {
            setFormError("Please fill out all fields");
            return;
        }

        if (password.length < 6) {
            setFormError("Password must be at least 6 characters long");
            return;
        }
        if (password !== confirmPassword) {
            setFormError("Passwords do not match");
            return;
        }
        try {
            await register(name, email, password);
            navigate('/dashboard');
        } catch {
          setFormError('Registration failed. Please try again.');
        }
    };

    return (
    <div className="min-h-screen bg-[#1e1f29] text-[#f8f8f2] font-sans flex flex-col items-center pt-12 px-4 selection:bg-[#44475a]">
      
      <div className="w-full max-w-[400px] flex items-center space-x-3 mb-8 cursor-pointer" onClick={() => navigate('/login')}>
        <svg className="w-8 h-8 text-[#ff79c6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
        <span className="text-2xl font-bold tracking-wider text-[#ff79c6]">Pro-Tasker</span>
      </div>

      <div className="bg-[#282a36]/40 border border-[#44475a] w-full max-w-[400px] rounded-xl p-8 shadow-2xl backdrop-blur-sm">
        <h2 className="text-3xl font-medium text-center text-[#ff79c6] mb-6 tracking-tight">Create Account</h2>
        
        {(formError || apiError) && (
          <div className="bg-[#ff5555]/10 border border-[#ff5555] rounded-lg p-3 flex items-center space-x-2 mb-6">
            <svg className="w-4 h-4 text-[#ff5555] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-xs text-[#ff5555] font-medium">{formError || apiError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#f8f8f2] uppercase tracking-wider mb-2">Full Name</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe" 
              className="w-full bg-[#1e1f29] border border-[#44475a] focus:border-[#8be9fd] focus:ring-1 focus:ring-[#8be9fd] rounded-lg px-4 py-2.5 text-sm text-[#f8f8f2] placeholder-[#f8f8f2]/30 outline-none transition"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#f8f8f2] uppercase tracking-wider mb-2">Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com" 
              className="w-full bg-[#1e1f29] border border-[#44475a] focus:border-[#8be9fd] focus:ring-1 focus:ring-[#8be9fd] rounded-lg px-4 py-2.5 text-sm text-[#f8f8f2] placeholder-[#f8f8f2]/30 outline-none transition"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#f8f8f2] uppercase tracking-wider mb-2">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full bg-[#1e1f29] border border-[#44475a] focus:border-[#8be9fd] focus:ring-1 focus:ring-[#8be9fd] rounded-lg px-4 py-2.5 text-sm text-[#f8f8f2] placeholder-[#f8f8f2]/30 outline-none transition"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#f8f8f2] uppercase tracking-wider mb-2">Confirm Password</label>
            <input 
              type="password" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full bg-[#1e1f29] border border-[#44475a] focus:border-[#8be9fd] focus:ring-1 focus:ring-[#8be9fd] rounded-lg px-4 py-2.5 text-sm text-[#f8f8f2] placeholder-[#f8f8f2]/30 outline-none transition"
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-[#50fa7b] hover:bg-[#69ff94] text-[#1e1f29] font-bold py-3 px-4 rounded-lg shadow-lg hover:shadow-[#50fa7b]/20 transition duration-200 text-sm tracking-wide transform active:scale-[0.99] mt-2 outline-none"
          >
            Sign Up
          </button>
        </form>

        <div className="mt-6 text-center border-t border-[#44475a] pt-4">
          <p className="text-xs text-[#f8f8f2]/60">
            Already have an account?{' '}
            <span onClick={() => navigate('/login')} className="text-[#ff79c6] hover:underline cursor-pointer font-medium ml-1">
              Sign In
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}