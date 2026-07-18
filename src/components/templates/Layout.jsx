// Layout Components
// Core layout structure for pages

import React from 'react';
import './Layout.css';

export const PageLayout = ({ children, sidebar, header }) => {
  return (
    <div className="page-layout">
      {sidebar && <aside className="page-sidebar">{sidebar}</aside>}
      <main className="page-main">
        {header && <header className="page-header">{header}</header>}
        <div className="page-content">{children}</div>
      </main>
    </div>
  );
};

export const PageHeader = ({ title, subtitle, actions, dateRange }) => {
  return (
    <div className="page-header-container">
      <div className="page-header-info">
        <h1 className="page-title">{title}</h1>
        {subtitle && <p className="page-subtitle">{subtitle}</p>}
      </div>
      <div className="page-header-actions">
        {dateRange && <div className="date-range-selector">{dateRange}</div>}
        {actions && <div className="page-actions">{actions}</div>}
      </div>
    </div>
  );
};

export const PageSection = ({ children, spacing = 'default' }) => {
  const spacingClass = `section-${spacing}`;
  return <section className={`page-section ${spacingClass}`}>{children}</section>;
};

export const ContentGrid = ({ children, columns = 2, gap = '6' }) => {
  return (
    <div
      className={`content-grid grid-${columns}`}
      style={{ '--gap': `var(--space-${gap})` }}
    >
      {children}
    </div>
  );
};

export const SidePanel = ({ title, children, actions }) => {
  return (
    <div className="side-panel">
      <div className="side-panel-header">
        <h3 className="side-panel-title">{title}</h3>
        {actions && <div className="side-panel-actions">{actions}</div>}
      </div>
      <div className="side-panel-content">{children}</div>
    </div>
  );
};

// Dashboard Layout Example
export const DashboardLayout = ({ header, metrics, content, sidebar, activities }) => {
  return (
    <PageLayout sidebar={sidebar} header={header}>
      {metrics && <PageSection spacing="large">{metrics}</PageSection>}
      {content && <PageSection spacing="large">{content}</PageSection>}
      {activities && <PageSection spacing="default">{activities}</PageSection>}
    </PageLayout>
  );
};

// Leads Layout Example
export const LeadsLayout = ({ header, filters, leads, pagination, sidebar }) => {
  return (
    <PageLayout sidebar={sidebar} header={header}>
      {filters && <PageSection spacing="default">{filters}</PageSection>}
      {leads && <PageSection spacing="large">{leads}</PageSection>}
      {pagination && <PageSection spacing="default">{pagination}</PageSection>}
    </PageLayout>
  );
};

// Analytics Layout Example
export const AnalyticsLayout = ({ header, metrics, charts, leaderboard, sidebar }) => {
  return (
    <PageLayout sidebar={sidebar} header={header}>
      {metrics && <PageSection spacing="large">{metrics}</PageSection>}
      {charts && <PageSection spacing="large">{charts}</PageSection>}
      {leaderboard && <PageSection spacing="default">{leaderboard}</PageSection>}
    </PageLayout>
  );
};

export default PageLayout;
