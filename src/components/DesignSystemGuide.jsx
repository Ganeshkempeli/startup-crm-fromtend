// Visual Reference Component
// Quick visual guide for design system colors and typography

import React from 'react';

export const ColorPalette = () => {
  const colors = [
    {
      name: 'Primary',
      hex: '#2563EB',
      usage: 'Buttons, Links, Actions, Focus states',
      variations: [
        { shade: 'Dark', hex: '#1E40AF' },
        { shade: 'Light', hex: '#DBEAFE' },
      ],
    },
    {
      name: 'Success',
      hex: '#22C55E',
      usage: 'Positive states, Won deals, Completions',
      variations: [
        { shade: 'Dark', hex: '#15803D' },
        { shade: 'Light', hex: '#DCFCE7' },
      ],
    },
    {
      name: 'Warning',
      hex: '#F59E0B',
      usage: 'Alerts, Pending status, Cautions',
      variations: [
        { shade: 'Dark', hex: '#B45309' },
        { shade: 'Light', hex: '#FEF3C7' },
      ],
    },
    {
      name: 'Danger',
      hex: '#EF4444',
      usage: 'Errors, Destructive actions, Failed states',
      variations: [
        { shade: 'Dark', hex: '#991B1B' },
        { shade: 'Light', hex: '#FEE2E2' },
      ],
    },
    {
      name: 'Background',
      hex: '#F8FAFC',
      usage: 'Page background, Subtle backgrounds',
      variations: [],
    },
    {
      name: 'Surface',
      hex: '#FFFFFF',
      usage: 'Cards, Components, Containers',
      variations: [],
    },
    {
      name: 'Border',
      hex: '#E2E8F0',
      usage: 'Dividers, Borders, Separators',
      variations: [],
    },
    {
      name: 'Text Primary',
      hex: '#1E293B',
      usage: 'Main content text, Headlines',
      variations: [],
    },
    {
      name: 'Text Secondary',
      hex: '#64748B',
      usage: 'Secondary information, Labels',
      variations: [],
    },
    {
      name: 'Text Tertiary',
      hex: '#94A3B8',
      usage: 'Hints, Placeholders, Disabled text',
      variations: [],
    },
  ];

  return (
    <div style={{ padding: '40px', backgroundColor: '#F8FAFC' }}>
      <h1>Color Palette</h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
        {colors.map((color) => (
          <div key={color.name} style={{ backgroundColor: 'white', borderRadius: '8px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <div
              style={{
                width: '100%',
                height: '120px',
                backgroundColor: color.hex,
                borderRadius: '6px',
                marginBottom: '16px',
              }}
            />
            <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: '600' }}>{color.name}</h3>
            <p style={{ margin: '0 0 4px 0', fontSize: '12px', color: '#64748B', fontFamily: 'monospace' }}>
              {color.hex}
            </p>
            <p style={{ margin: '0 0 12px 0', fontSize: '13px', color: '#64748B', lineHeight: '1.5' }}>
              {color.usage}
            </p>

            {color.variations.length > 0 && (
              <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: '12px' }}>
                {color.variations.map((variation) => (
                  <div key={variation.shade} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <div
                      style={{
                        width: '24px',
                        height: '24px',
                        backgroundColor: variation.hex,
                        borderRadius: '4px',
                      }}
                    />
                    <span style={{ fontSize: '12px' }}>
                      {variation.shade}: {variation.hex}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export const TypographyGuide = () => {
  const typographyStyles = [
    {
      name: 'Display / H1',
      size: '32px',
      weight: '700',
      lineHeight: '1.2',
      usage: 'Page titles, main headlines',
      example: 'Dashboard',
    },
    {
      name: 'Heading / H2',
      size: '24px',
      weight: '600',
      lineHeight: '1.3',
      usage: 'Section titles',
      example: 'Recent Leads',
    },
    {
      name: 'Heading / H3',
      size: '18px',
      weight: '600',
      lineHeight: '1.4',
      usage: 'Card titles, subsections',
      example: 'Lead Information',
    },
    {
      name: 'Heading / H4',
      size: '16px',
      weight: '600',
      lineHeight: '1.4',
      usage: 'Small headings, labels',
      example: 'Contact Details',
    },
    {
      name: 'Body Large',
      size: '16px',
      weight: '400',
      lineHeight: '1.5',
      usage: 'Large body text',
      example: 'The quick brown fox jumps over the lazy dog',
    },
    {
      name: 'Body Regular',
      size: '14px',
      weight: '400',
      lineHeight: '1.5',
      usage: 'Standard body text',
      example: 'The quick brown fox jumps over the lazy dog',
    },
    {
      name: 'Small',
      size: '12px',
      weight: '400',
      lineHeight: '1.4',
      usage: 'Labels, captions, hints',
      example: 'Last updated 2 hours ago',
    },
    {
      name: 'Extra Small',
      size: '11px',
      weight: '500',
      lineHeight: '1.4',
      usage: 'Badges, tags, metadata',
      example: 'QUALIFIED',
    },
  ];

  return (
    <div style={{ padding: '40px', backgroundColor: 'white' }}>
      <h1>Typography System</h1>

      <div style={{ display: 'grid', gap: '24px' }}>
        {typographyStyles.map((style) => (
          <div key={style.name} style={{ borderBottom: '1px solid #E2E8F0', paddingBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
              <div>
                <h3 style={{ margin: '0 0 4px 0', fontSize: '16px', fontWeight: '600' }}>
                  {style.name}
                </h3>
                <p style={{ margin: '0', fontSize: '12px', color: '#64748B' }}>
                  {style.usage}
                </p>
              </div>
              <div style={{ textAlign: 'right', fontSize: '12px', color: '#64748B' }}>
                <p style={{ margin: '0' }}>{style.size}</p>
                <p style={{ margin: '0' }}>Weight: {style.weight}</p>
                <p style={{ margin: '0' }}>Line: {style.lineHeight}</p>
              </div>
            </div>

            <div
              style={{
                fontSize: style.size,
                fontWeight: style.weight,
                lineHeight: style.lineHeight,
                color: '#1E293B',
                padding: '16px',
                backgroundColor: '#F8FAFC',
                borderRadius: '6px',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              }}
            >
              {style.example}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const SpacingScale = () => {
  const spacing = [
    { unit: 0, px: 0 },
    { unit: 1, px: 4 },
    { unit: 2, px: 8 },
    { unit: 3, px: 12 },
    { unit: 4, px: 16 },
    { unit: 5, px: 20 },
    { unit: 6, px: 24 },
    { unit: 8, px: 32 },
    { unit: 10, px: 40 },
    { unit: 12, px: 48 },
    { unit: 16, px: 64 },
  ];

  return (
    <div style={{ padding: '40px', backgroundColor: '#F8FAFC' }}>
      <h1>Spacing Scale (Base: 4px)</h1>

      <div style={{ display: 'grid', gap: '24px' }}>
        {spacing.map((space) => (
          <div key={space.unit} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '80px', fontSize: '12px', fontWeight: '600', color: '#64748B' }}>
              --space-{space.unit}
            </div>
            <div style={{ width: '60px', fontSize: '12px', color: '#64748B' }}>
              {space.px}px
            </div>
            <div
              style={{
                height: '24px',
                backgroundColor: '#2563EB',
                borderRadius: '4px',
                width: Math.max(space.px, 2),
              }}
            />
          </div>
        ))}
      </div>

      <h2 style={{ marginTop: '48px' }}>Common Usage</h2>
      <ul style={{ lineHeight: '1.8', color: '#1E293B' }}>
        <li>Page padding: <code style={{ backgroundColor: '#F1F5F9', padding: '2px 6px' }}>--space-8</code> (32px)</li>
        <li>Card padding: <code style={{ backgroundColor: '#F1F5F9', padding: '2px 6px' }}>--space-6</code> (24px)</li>
        <li>Component gap: <code style={{ backgroundColor: '#F1F5F9', padding: '2px 6px' }}>--space-4</code> (16px)</li>
        <li>Section margin: <code style={{ backgroundColor: '#F1F5F9', padding: '2px 6px' }}>--space-8</code> (32px)</li>
        <li>Button padding: <code style={{ backgroundColor: '#F1F5F9', padding: '2px 6px' }}>--space-3 --space-5</code> (12px 20px)</li>
      </ul>
    </div>
  );
};

export const ShadowSystem = () => {
  const shadows = [
    {
      name: 'None',
      value: 'none',
      css: 'box-shadow: none',
      usage: 'Flat design, no elevation',
    },
    {
      name: 'Small',
      value: '0 1px 2px rgba(0, 0, 0, 0.05)',
      css: '--shadow-sm',
      usage: 'Subtle elevation, cards',
    },
    {
      name: 'Medium',
      value: '0 4px 6px rgba(0, 0, 0, 0.07)',
      css: '--shadow-md',
      usage: 'Hover states, floating elements',
    },
    {
      name: 'Large',
      value: '0 10px 15px rgba(0, 0, 0, 0.1)',
      css: '--shadow-lg',
      usage: 'Modals, popovers',
    },
    {
      name: 'Extra Large',
      value: '0 20px 25px rgba(0, 0, 0, 0.15)',
      css: '--shadow-xl',
      usage: 'Large modals, overlays',
    },
    {
      name: '2X Large',
      value: '0 25px 50px rgba(0, 0, 0, 0.2)',
      css: '--shadow-2xl',
      usage: 'Full screen overlays',
    },
  ];

  return (
    <div style={{ padding: '40px', backgroundColor: 'white' }}>
      <h1>Shadow System</h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
        {shadows.map((shadow) => (
          <div
            key={shadow.name}
            style={{
              padding: '24px',
              backgroundColor: '#F8FAFC',
              borderRadius: '8px',
              border: '1px solid #E2E8F0',
              boxShadow: shadow.value,
            }}
          >
            <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: '600' }}>
              {shadow.name}
            </h3>
            <p style={{ margin: '0 0 4px 0', fontSize: '11px', color: '#64748B', fontFamily: 'monospace', wordBreak: 'break-all' }}>
              {shadow.value}
            </p>
            <p style={{ margin: '0 0 12px 0', fontSize: '12px', color: '#64748B' }}>
              CSS: <code style={{ backgroundColor: 'white', padding: '2px 6px' }}>{shadow.css}</code>
            </p>
            <p style={{ margin: '0', fontSize: '13px', color: '#64748B' }}>
              {shadow.usage}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export const StatusColors = () => {
  const statuses = [
    {
      name: 'Prospecting',
      color: '#F59E0B',
      lightColor: '#FEF3C7',
      usage: 'New leads, initial contact',
    },
    {
      name: 'Qualified',
      color: '#2563EB',
      lightColor: '#DBEAFE',
      usage: 'Lead meets criteria',
    },
    {
      name: 'Negotiation',
      color: '#F59E0B',
      lightColor: '#FEF3C7',
      usage: 'Active discussions',
    },
    {
      name: 'Won',
      color: '#22C55E',
      lightColor: '#DCFCE7',
      usage: 'Closed successfully',
    },
    {
      name: 'Lost',
      color: '#EF4444',
      lightColor: '#FEE2E2',
      usage: 'Deal did not close',
    },
  ];

  return (
    <div style={{ padding: '40px', backgroundColor: '#F8FAFC' }}>
      <h1>Status Color Mapping</h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '24px' }}>
        {statuses.map((status) => (
          <div key={status.name} style={{ backgroundColor: 'white', borderRadius: '8px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <div style={{ marginBottom: '12px' }}>
              <div
                style={{
                  display: 'inline-block',
                  backgroundColor: status.color,
                  color: 'white',
                  padding: '6px 12px',
                  borderRadius: '9999px',
                  fontSize: '12px',
                  fontWeight: '600',
                  marginBottom: '8px',
                }}
              >
                {status.name}
              </div>
            </div>

            <p style={{ margin: '0 0 12px 0', fontSize: '13px', color: '#64748B' }}>
              {status.usage}
            </p>

            <div style={{ display: 'grid', gap: '8px', fontSize: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '24px', height: '24px', backgroundColor: status.color, borderRadius: '4px' }} />
                <code style={{ fontFamily: 'monospace', color: '#64748B' }}>{status.color}</code>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '24px', height: '24px', backgroundColor: status.lightColor, borderRadius: '4px', border: '1px solid #E2E8F0' }} />
                <code style={{ fontFamily: 'monospace', color: '#64748B' }}>{status.lightColor}</code>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Export all guides as a single component
export const DesignSystemGuide = () => {
  return (
    <div>
      <ColorPalette />
      <TypographyGuide />
      <SpacingScale />
      <ShadowSystem />
      <StatusColors />
    </div>
  );
};

export default DesignSystemGuide;
