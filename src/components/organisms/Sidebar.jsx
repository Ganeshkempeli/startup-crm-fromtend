import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
   LayoutDashboard, 
   Users, 
   BarChart3, 
   Menu, 
   X,
   Sparkles
 } from 'lucide-react';
import DarkModeToggle from '../common/DarkModeToggle';
import { useAuth } from '../../context/AuthContext';
import './Sidebar.css';
 
 /**
  * Sidebar renders the CRM brand, navigation layout, theme controllers, and user summaries.
  *
  * @component
  */
 export const Sidebar = () => {
   const [isOpen, setIsOpen] = useState(false);
   const { user } = useAuth();
 
   const toggleSidebar = () => {
     setIsOpen(!isOpen);
   };

   const getInitials = (name) => {
     if (!name) return 'U';
     const parts = name.trim().split(/\s+/);
     if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
     return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
   };
 
   return (
     <>
       {/* Mobile Menu Toggle Button */}
       <button 
         type="button" 
         className="mobile-nav-toggle" 
         onClick={toggleSidebar}
         aria-label="Toggle menu"
       >
         {isOpen ? <X size={20} /> : <Menu size={20} />}
       </button>
 
       {/* Overlay backdrop for mobile */}
       {isOpen && (
         <div className="sidebar-overlay" onClick={toggleSidebar}></div>
       )}
 
       <aside className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}>
         <div className="sidebar-brand">
           <div className="brand-logo">
             <Sparkles size={20} className="brand-icon" />
           </div>
           <span className="brand-name">Apex CRM</span>
         </div>
 
         {/* Primary Page Links */}
         <nav className="sidebar-nav">
           <NavLink 
             to="/" 
             className={({ isActive }) => `nav-item ${isActive ? 'nav-item-active' : ''}`}
             onClick={() => setIsOpen(false)}
             end
           >
             <LayoutDashboard size={18} className="nav-icon" />
             <span className="nav-label">Dashboard</span>
           </NavLink>
           <NavLink 
             to="/leads" 
             className={({ isActive }) => `nav-item ${isActive ? 'nav-item-active' : ''}`}
             onClick={() => setIsOpen(false)}
           >
             <Users size={18} className="nav-icon" />
             <span className="nav-label">Leads</span>
           </NavLink>
           <NavLink 
             to="/analytics" 
             className={({ isActive }) => `nav-item ${isActive ? 'nav-item-active' : ''}`}
             onClick={() => setIsOpen(false)}
           >
             <BarChart3 size={18} className="nav-icon" />
             <span className="nav-label">Analytics</span>
           </NavLink>
         </nav>
 
         {/* Sidebar Footer including Theme Selector and Profile */}
         <div className="sidebar-footer">
           <div className="flex justify-start px-2 py-1">
             <DarkModeToggle />
           </div>
           
           <div className="user-profile-badge">
             <div className="user-avatar">{getInitials(user?.name)}</div>
             <div className="user-info">
               <span className="user-name">{user?.name || 'User'}</span>
               <span className="user-role">{user?.role === 'admin' ? 'Sales Admin' : 'Sales Representative'}</span>
             </div>
           </div>
         </div>
       </aside>
     </>
   );
 };


export default Sidebar;
