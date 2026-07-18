// Component: Card
// Category: Organism/Container
// Description: Flexible card component for displaying content sections

import React from 'react';
import './Card.css';

export const Card = ({
  children,
  header = null,
  footer = null,
  compact = false,
  hoverable = true,
  className = '',
  headerAction = null,
  ...props
}) => {
  const cardClass = `card ${compact ? 'card-compact' : ''} ${!hoverable ? 'card-no-hover' : ''} ${className}`;

  return (
    <div className={cardClass} {...props}>
      {header && (
        <div className="card-header">
          <h3 className="card-title">{header}</h3>
          {headerAction && <div className="card-header-action">{headerAction}</div>}
        </div>
      )}

      <div className="card-body">{children}</div>

      {footer && <div className="card-footer">{footer}</div>}
    </div>
  );
};

// MetricCard - Specialized Card for displaying metrics
export const MetricCard = ({ icon, title, value, change, changeLabel, trend = 'up' }) => {
  const trendClass = trend === 'up' ? 'trend-up' : 'trend-down';
  const changeColor = trend === 'up' ? 'text-success' : 'text-danger';

  return (
    <Card compact hoverable className="metric-card">
      <div className="metric-header">
        {icon && <div className="metric-icon">{icon}</div>}
        <h4 className="metric-title">{title}</h4>
      </div>
      <div className="metric-value">{value}</div>
      {change && (
        <div className={`metric-change ${changeColor} ${trendClass}`}>
          <span>{change}</span>
          {changeLabel && <span className="metric-label">{changeLabel}</span>}
        </div>
      )}
    </Card>
  );
};

// DataCard - Specialized Card for displaying data/statistics
export const DataCard = ({ label, value, unit = '', description = '' }) => {
  return (
    <Card compact className="data-card">
      <div className="data-label">{label}</div>
      <div className="data-value">
        {value}
        {unit && <span className="data-unit">{unit}</span>}
      </div>
      {description && <div className="data-description">{description}</div>}
    </Card>
  );
};

// Usage Examples:
/*
<Card header="Lead Summary">
  <p>Content goes here</p>
</Card>

<MetricCard
  icon={<UsersIcon />}
  title="Total Leads"
  value="245"
  change="+12"
  changeLabel="from last month"
  trend="up"
/>

<DataCard
  label="Conversion Rate"
  value="3.8"
  unit="%"
  description="vs 3.2% last month"
/>
*/

export default Card;
