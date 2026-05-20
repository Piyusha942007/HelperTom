import { useRole } from '../../App';
import { motion } from 'framer-motion';
import { User, ShieldAlert } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const RoleSwitcher = () => {
  const { role, setRole } = useRole();
  const navigate = useNavigate();

  const actualRole = typeof window !== 'undefined' ? sessionStorage.getItem('userRole') : null;

  // If the logged-in user is not a verified admin, hide the role switcher entirely
  if (actualRole !== 'admin') {
    return null;
  }

  const toggleRole = () => {
    const newRole = role === 'user' ? 'admin' : 'user';
    setRole(newRole);
    sessionStorage.setItem('userRole', newRole);
    if (newRole === 'admin') {
      navigate('/admin');
    } else {
      navigate('/');
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleRole}
      className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-border shadow-sm text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
    >
      {role === 'user' ? (
        <>
          <User size={16} className="text-primary" />
          <span>User Mode</span>
        </>
      ) : (
        <>
          <ShieldAlert size={16} className="text-blue-500" />
          <span>Admin Mode</span>
        </>
      )}
    </motion.button>
  );
};

export default RoleSwitcher;
