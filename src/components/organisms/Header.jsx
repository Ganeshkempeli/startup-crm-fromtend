import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Bell, Search, ChevronRight, User, Settings, LogOut } from 'lucide-react';
import './Header.css';

export const Header = () => {
  const location = useLocation();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  // Map path to breadcrumbs
  const getBreadcrumbs = () => {
    const path = location.pathname;
    if (path === '/') return ['Platform', 'Dashboard'];
    if (path === '/leads') return ['Platform', 'Leads'];
    if (path === '/analytics') return ['Platform', 'Analytics'];
    return ['Platform'];
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <header className="header-container">
      <div className="header-breadcrumbs">
        {breadcrumbs.map((crumb, idx) => (
          <React.Fragment key={crumb}>
            {idx > 0 && <ChevronRight size={14} className="breadcrumb-separator" />}
            <span className={`breadcrumb-item ${idx === breadcrumbs.length - 1 ? 'breadcrumb-active' : ''}`}>
              {crumb}
            </span>
          </React.Fragment>
        ))}
      </div>

      <div className="header-actions">
        <div className="header-search">
          <Search size={16} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search leads..." 
            className="search-input"
          />
          <kbd className="search-shortcut">⌘K</kbd>
        </div>

        <div className="notification-bell-container">
          <button 
            type="button" 
            className="header-action-btn"
            onClick={() => setShowNotifications(!showNotifications)}
            aria-label="Notifications"
          >
            <Bell size={18} />
            <span className="bell-badge"></span>
          </button>
          
          {showNotifications && (
            <div className="notifications-dropdown card">
              <div className="dropdown-header">
                <h4>Notifications</h4>
                <span className="text-small text-primary" style={{ cursor: 'pointer' }}>Mark read</span>
              </div>
              <div className="dropdown-body">
                <div className="notification-item">
                  <div className="notification-dot success"></div>
                  <div className="notification-content">
                    <p className="notification-text"><strong>Sarah Jenkins</strong> marked as Deal Won</p>
                    <span className="text-xs">2 hours ago</span>
                  </div>
                </div>
                <div className="notification-item">
                  <div className="notification-dot primary"></div>
                  <div className="notification-content">
                    <p className="notification-text">New lead <strong>Chloe Fontaine</strong> created</p>
                    <span className="text-xs">3 hours ago</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="profile-menu-container">
          <button 
            type="button" 
            className="profile-avatar-btn"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            aria-label="User profile menu"
          >
            JD
          </button>

          {showProfileMenu && (
            <div className="profile-dropdown card">
              <div className="dropdown-user-info">
                <span className="font-semibold text-primary">John Doe</span>
                <span className="text-small">john.doe@company.com</span>
              </div>
              <div className="dropdown-divider"></div>
              <button type="button" className="dropdown-item">
                <User size={14} />
                <span>My Profile</span>
              </button>
              <button type="button" className="dropdown-item">
                <Settings size={14} />
                <span>Settings</span>
              </button>
              <div className="dropdown-divider"></div>
              <button type="button" className="dropdown-item text-error">
                <LogOut size={14} />
                <span>Log Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
