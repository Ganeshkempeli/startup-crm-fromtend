# Modern CRM Dashboard - Design System
## Premium SaaS Design for Startup Lead Management

---

## 1. COMPLETE UI ARCHITECTURE

### 1.1 Design Principles
- **Minimalism**: Remove visual noise, focus on essential information
- **Hierarchy**: Clear visual priorities guide user focus
- **Consistency**: Unified design language across all pages
- **Accessibility**: WCAG 2.1 AA compliant
- **Performance**: Fast interactions with smooth animations
- **Responsive**: Seamless experience across all devices

### 1.2 Design System Layers
```
┌─────────────────────────────────────────┐
│         Application Layout              │
├─────────────────────────────────────────┤
│  ┌──────────┐  ┌──────────────────────┐ │
│  │    Nav   │  │   Page Content       │ │
│  │  Sidebar │  │   - Headers          │ │
│  │          │  │   - Cards/Sections   │ │
│  └──────────┘  │   - Tables/Lists     │ │
│                │   - Modals/Overlays  │ │
│                └──────────────────────┘ │
└─────────────────────────────────────────┘
```

### 1.3 Device Breakpoints
- **Mobile**: 320px - 480px (portrait)
- **Tablet**: 481px - 768px (portrait & landscape)
- **Desktop**: 769px - 1024px (standard)
- **Large Desktop**: 1025px+ (wide screens)
- **Ultra Wide**: 1440px+ (premium displays)

---

## 2. COMPONENT HIERARCHY

### 2.1 Atomic Design Structure
```
atoms/
├── Button
├── Badge
├── Chip
├── Icon
├── Input
├── Label
├── Spinner
└── Tooltip

molecules/
├── InputGroup (Label + Input + Error)
├── FormField
├── CardHeader (Icon + Title + Action)
├── SearchBar
├── FilterTag
├── MetricItem (Icon + Value + Label)
├── Avatar (with status indicator)
└── DatePicker

organisms/
├── Card (container)
├── Modal/Dialog
├── Table
├── Navigation/Sidebar
├── Header/TopBar
├── FormSection
├── LeadCard (compound card)
├── MetricsPanel
└── ChartContainer

templates/
├── DashboardLayout
├── LeadsLayout
├── AnalyticsLayout
├── AuthLayout
└── SettingsLayout

pages/
├── Dashboard
├── Leads
├── Analytics
├── Settings
└── Profile
```

### 2.2 Component Relationships
```
Page (e.g., Dashboard.jsx)
├── DashboardLayout (template)
│   ├── Header/TopBar (organism)
│   │   ├── Title (atom)
│   │   ├── Actions (atom)
│   │   └── DateRange (molecule)
│   ├── Sidebar (organism)
│   │   └── NavigationItems (atoms)
│   └── MainContent
│       ├── MetricsPanel (organism)
│       │   └── MetricCards (molecules)
│       ├── LeadsTable (organism)
│       │   └── TableRows (atoms/molecules)
│       └── SummaryCards (molecules)
```

---

## 3. COLOR PALETTE & USAGE RULES

### 3.1 Core Colors
```css
/* Primary Colors */
--color-primary: #2563EB;      /* Actions, links, focus states */
--color-primary-light: #DBEAFE; /* Backgrounds, hover states */
--color-primary-dark: #1E40AF;  /* Active states, emphasis */

/* Success */
--color-success: #22C55E;       /* Positive actions, completions */
--color-success-light: #DCFCE7; /* Success backgrounds */
--color-success-dark: #15803D;  /* Success emphasis */

/* Warning */
--color-warning: #F59E0B;       /* Cautions, alerts */
--color-warning-light: #FEF3C7; /* Warning backgrounds */
--color-warning-dark: #B45309;  /* Warning emphasis */

/* Danger */
--color-danger: #EF4444;        /* Destructive actions, errors */
--color-danger-light: #FEE2E2;  /* Error backgrounds */
--color-danger-dark: #991B1B;   /* Error emphasis */

/* Neutral */
--color-background: #F8FAFC;    /* Page background */
--color-surface: #FFFFFF;       /* Card/Component background */
--color-border: #E2E8F0;        /* Borders, dividers */
--color-text-primary: #1E293B;  /* Main text */
--color-text-secondary: #64748B; /* Secondary text */
--color-text-tertiary: #94A3B8;  /* Tertiary text */
```

### 3.2 Dark Mode Colors
```css
/* Dark Mode Overrides */
--color-background-dark: #0F172A;
--color-surface-dark: #1E293B;
--color-border-dark: #334155;
--color-text-primary-dark: #F1F5F9;
--color-text-secondary-dark: #CBD5E1;
--color-text-tertiary-dark: #94A3B8;
```

### 3.3 Color Usage Rules

#### Primary Color (#2563EB)
- **Buttons**: Primary CTAs (Save, Create, Submit)
- **Links**: Text links, breadcrumbs
- **Highlights**: Active navigation items
- **Focus States**: Keyboard focus rings
- **Accents**: Important UI elements

#### Success Color (#22C55E)
- **Status Indicators**: Active, Online, Connected status
- **Form Validation**: Success messages
- **Badges**: Completed, Approved, Won deals
- **Charts**: Positive metrics (revenue increase)
- **Buttons**: Positive/confirm actions (rarely)

#### Warning Color (#F59E0B)
- **Alerts**: Important notices
- **Status Badges**: Pending, In Progress, At Risk
- **Highlights**: Items needing attention
- **Charts**: Neutral/warning metrics

#### Danger Color (#EF4444)
- **Destructive Buttons**: Delete, Remove
- **Error Messages**: Form errors, API failures
- **Status Indicators**: Offline, Failed, Critical
- **Alerts**: System errors, failures
- **Charts**: Negative metrics (revenue loss)

#### Neutral Colors
- **Background**: Page backgrounds
- **Surface**: Cards, containers, modals
- **Borders**: Subtle separators, dividers
- **Text**: Content hierarchy

---

## 4. SPACING SYSTEM

### 4.1 Spacing Scale (Base: 4px)
```css
/* Spacing tokens */
--space-0: 0;        /* No space */
--space-1: 4px;      /* Tight spacing */
--space-2: 8px;      /* Small gaps */
--space-3: 12px;     /* Comfortable */
--space-4: 16px;     /* Standard padding */
--space-5: 20px;     /* Generous padding */
--space-6: 24px;     /* Section spacing */
--space-8: 32px;     /* Large sections */
--space-10: 40px;    /* Extra large */
--space-12: 48px;    /* Page margins */
--space-16: 64px;    /* Maximum margin */
```

### 4.2 Component-Specific Spacing

#### Buttons
```
Button: 
  Padding: 10px 16px (small)
  Padding: 12px 20px (medium - standard)
  Padding: 14px 24px (large)
  Gap between icon & text: 8px
  Border radius: 6px
```

#### Cards
```
Card:
  Padding: 24px (standard content card)
  Padding: 16px (compact card)
  Border radius: 8px
  Box shadow: 0 1px 3px rgba(0,0,0,0.1)
  Margin bottom: 24px
```

#### Form Elements
```
Input/Select:
  Padding: 10px 12px
  Border radius: 6px
  Border width: 1px
  Font size: 14px
  
Label:
  Margin bottom: 8px
  Font weight: 500
  
Form Group:
  Margin bottom: 20px
```

#### Sidebar/Navigation
```
Sidebar:
  Width: 280px (desktop)
  Width: 100% (mobile, overlay)
  Padding: 24px 16px
  
Navigation Item:
  Padding: 12px 16px
  Margin bottom: 4px
  Border radius: 6px
```

#### Page Layout
```
Page Container:
  Max width: 1400px
  Padding: 32px (desktop)
  Padding: 20px (tablet)
  Padding: 16px (mobile)
  
Section Gap: 32px (desktop), 24px (tablet), 16px (mobile)
Column Gap: 24px (desktop), 16px (mobile)
```

#### Table Spacing
```
Table:
  Row height: 48px
  Cell padding: 12px
  Header padding: 16px
  
Header:
  Padding top/bottom: 12px
  Border bottom: 1px solid border color
```

---

## 5. TYPOGRAPHY SYSTEM

### 5.1 Font Family
```css
--font-primary: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
--font-mono: 'Monaco', 'Courier New', monospace;
```

### 5.2 Type Scale
```
Display/Hero (H1):
  Size: 32px - 36px
  Weight: 700
  Line height: 1.2
  Margin bottom: 24px

Heading 2 (H2):
  Size: 24px - 28px
  Weight: 600
  Line height: 1.3
  Margin bottom: 20px

Heading 3 (H3):
  Size: 18px - 20px
  Weight: 600
  Line height: 1.4
  Margin bottom: 16px

Heading 4 (H4):
  Size: 16px
  Weight: 600
  Line height: 1.4
  Margin bottom: 12px

Body/Paragraph (Large):
  Size: 16px
  Weight: 400
  Line height: 1.5
  Color: text-primary

Body/Paragraph (Regular):
  Size: 14px
  Weight: 400
  Line height: 1.5
  Color: text-primary

Small/Caption:
  Size: 12px
  Weight: 400
  Line height: 1.4
  Color: text-secondary

Extra Small:
  Size: 11px
  Weight: 500
  Line height: 1.4
  Color: text-tertiary
```

---

## 6. SHADOW SYSTEM

### 6.1 Elevation Shadows (Subtle)
```css
/* No elevation */
--shadow-none: none;

/* Elevation 1 - Cards, buttons on hover */
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);

/* Elevation 2 - Floating elements, dropdowns */
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.07);

/* Elevation 3 - Modals, popovers */
--shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);

/* Elevation 4 - Main modals, overlays */
--shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.15);

/* Elevation 5 - Heavy overlays */
--shadow-2xl: 0 25px 50px rgba(0, 0, 0, 0.2);
```

### 6.2 Focus Shadows
```css
--focus-ring: 0 0 0 3px rgba(37, 99, 235, 0.1);
--focus-ring-dark: 0 0 0 3px rgba(147, 197, 253, 0.2);
```

---

## 7. BORDER & RADIUS SYSTEM

### 7.1 Border Radius
```css
--radius-sm: 4px;    /* Subtle curves (inputs, small buttons) */
--radius-md: 6px;    /* Standard curves (cards, regular buttons) */
--radius-lg: 8px;    /* Generous curves (large containers) */
--radius-xl: 12px;   /* Extra curves (featured elements) */
--radius-full: 9999px; /* Fully rounded (avatars, badges) */
```

### 7.2 Border Styles
```css
/* Default border */
--border-default: 1px solid var(--color-border);

/* Subtle border (for less emphasis) */
--border-subtle: 1px solid rgba(0, 0, 0, 0.05);

/* Active border */
--border-active: 2px solid var(--color-primary);

/* Error border */
--border-error: 1px solid var(--color-danger);

/* Divider */
--border-divider: 1px solid var(--color-border);
```

---

## 8. ANIMATION & TRANSITIONS

### 8.1 Timing Functions
```css
--ease-linear: linear;
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);

--duration-fast: 150ms;    /* Quick interactions */
--duration-base: 200ms;    /* Standard transitions */
--duration-slow: 300ms;    /* Longer animations */
--duration-slower: 500ms;  /* Page transitions */
```

### 8.2 Transition Rules
- **Hover States**: 150ms ease-out
- **Focus States**: 150ms ease-out
- **Form Validation**: 200ms ease-out
- **Modal Opening**: 200ms ease-out
- **Page Navigation**: 300ms ease-in-out
- **Color Changes**: 200ms ease-out

---

## 9. DASHBOARD PAGE LAYOUT

### 9.1 Page Structure
```
┌────────────────────────────────────────────────────────────────┐
│                      Top Navigation Bar                        │
│  [Logo] [Navigation] [Search] [Notifications] [User Menu]     │
├────────────────┬────────────────────────────────────────────────┤
│                │                                                 │
│    Sidebar     │           Main Content Area                    │
│  - Dashboard   │                                                 │
│  - Leads       │  ┌──────────────────────────────────────────┐  │
│  - Analytics   │  │  Dashboard Title          [Date Range]   │  │
│  - Settings    │  └──────────────────────────────────────────┘  │
│                │                                                 │
│                │  ┌──────────────────────────────────────────┐  │
│                │  │  Key Metrics (Grid)                      │  │
│                │  │  ┌──────┐  ┌──────┐  ┌──────┐ ┌──────┐  │  │
│                │  │  │ Card │  │ Card │  │ Card │ │ Card │  │  │
│                │  │  └──────┘  └──────┘  └──────┘ └──────┘  │  │
│                │  └──────────────────────────────────────────┘  │
│                │                                                 │
│                │  ┌──────────────────┬──────────────────────┐   │
│                │  │  Recent Leads    │  Revenue Pipeline    │   │
│                │  │  (Table)         │  (Chart)             │   │
│                │  └──────────────────┴──────────────────────┘   │
│                │                                                 │
│                │  ┌──────────────────────────────────────────┐  │
│                │  │  Activity Feed                           │  │
│                │  └──────────────────────────────────────────┘  │
│                │                                                 │
└────────────────┴────────────────────────────────────────────────┘
```

### 9.2 Dashboard Sections

#### A. Top Bar
- Logo/Branding (32px height)
- Search bar (compact, focus expandable)
- Notifications bell (with badge count)
- User menu (avatar + dropdown)
- Dark mode toggle
- **Background**: Surface color, subtle shadow
- **Padding**: 16px 24px

#### B. Sidebar Navigation
- Logo section (48px height)
- Navigation items (active state highlight)
- Secondary items (bottom)
- Collapsible on tablet/mobile
- **Width**: 280px (desktop), 100% overlay (mobile)
- **Background**: Slightly darker surface color
- **Item height**: 44px

#### C. Key Metrics Section (4 Cards Grid)
```
┌─────────────────────────────────────────┐
│  [Icon]  Metric Name              ▲ 12% │
│  $45,240                                │
└─────────────────────────────────────────┘

Layout:
- Grid: 4 columns (desktop), 2 columns (tablet), 1 column (mobile)
- Gap: 24px
- Card padding: 24px
- Icon size: 32px
- Icon color: Primary
```

#### D. Recent Leads Section (Table)
```
Column Headers:
- Name (30%)
- Email (25%)
- Status (15%)
- Value (15%)
- Last Activity (15%)

Row height: 48px
Hover effect: Subtle background color change
Status badge: Colored pill
Action icons: Visible on hover
```

#### E. Revenue Pipeline (Chart)
- Bar/Column chart showing pipeline stages
- Legend below chart
- Responsive height (200px desktop, 300px mobile)
- **Colors**: Primary (Prospecting), Warning (Qualified), Success (Negotiation)

#### F. Activity Feed
- Timeline-style list
- Icon + name + action + timestamp
- Grouped by date (Today, Yesterday, This Week)
- Scrollable container (300px height max)

---

## 10. LEADS PAGE LAYOUT

### 10.1 Page Structure
```
┌────────────────────────────────────────────────────────────────┐
│                    Top Navigation Bar                          │
├────────────────┬────────────────────────────────────────────────┤
│                │  ┌──────────────────────────────────────────┐  │
│    Sidebar     │  │ Leads              [+ Add Lead] [Filter] │  │
│                │  └──────────────────────────────────────────┘  │
│                │                                                 │
│                │  ┌──────────────────────────────────────────┐  │
│                │  │  Search/Filter Bar                       │  │
│                │  │  [Search] [Status▼] [Source▼] [Score▼]  │  │
│                │  └──────────────────────────────────────────┘  │
│                │                                                 │
│                │  ┌──────────────────────────────────────────┐  │
│                │  │  Leads Table/Cards Grid                  │  │
│                │  │                                          │  │
│                │  │  [Lead Item] [Lead Item] [Lead Item]     │  │
│                │  │  [Lead Item] [Lead Item] [Lead Item]     │  │
│                │  │                                          │  │
│                │  └──────────────────────────────────────────┘  │
│                │                                                 │
│                │  Pagination / Load More                        │
│                │                                                 │
└────────────────┴────────────────────────────────────────────────┘
```

### 10.2 Key Components

#### A. Header Section
- Page title: "Leads"
- Subtitle: Shows count (e.g., "45 total leads")
- Primary button: "+ Add Lead"
- Secondary action: "Filter" or "View options"
- **Spacing**: 32px bottom margin

#### B. Search & Filter Bar
```
[Search icon] [Input placeholder="Search leads..."] 
[Status dropdown] [Source dropdown] [Score dropdown] [Clear filters]

Layout: Flex row, gap: 12px
Input width: auto-expand
Dropdowns: Fixed width (120px)
```

#### C. Leads Display Options
**Table View (Default - Desktop)**
- Columns: Avatar+Name | Email | Phone | Status | Score | Last Contact | Actions
- Sortable headers (click to sort, arrow indicator)
- Selectable rows (checkbox)
- Hover effect: Light background, action buttons appear
- Row height: 56px

**Card View (Mobile/Tablet - Optional)**
```
┌──────────────────────────┐
│ ┌──────┐ [Menu Icon]     │
│ │ Avat │ Name            │
│ │ ar   │ email@test.com  │
│ └──────┘ Status Badge    │
│                          │
│ Score: ⭐⭐⭐⭐⭐         │
│ Last Contact: 2 days ago │
└──────────────────────────┘
```

#### D. Lead Card (Row/Item)
```
Desktop (Table Row):
┌─────────────────────────────────────────────────────────┐
│ ☐ [Avatar] John Smith │ john@... │ +1-555-... │ 🔵 Qual │ ★★★★★ │ Jan 15 │ ⋮ │
└─────────────────────────────────────────────────────────┘

Mobile (Card):
┌─────────────────────────┐
│ ☑ [Avatar]              │
│ John Smith              │
│ john@email.com          │
│ +1-555-1234             │
│                         │
│ 🟢 Qualified            │
│ Score: 4.8/5            │
│ Last: Jan 15 (2d ago)   │
│                         │
│ [View] [Edit] [Delete]  │
└─────────────────────────┘
```

#### E. Status Badges
- **Prospecting** - Color: Warning (Yellow)
- **Qualified** - Color: Primary (Blue)
- **Negotiation** - Color: Warning (Orange)
- **Won** - Color: Success (Green)
- **Lost** - Color: Danger (Red)

---

## 11. ANALYTICS PAGE LAYOUT

### 11.1 Page Structure
```
┌────────────────────────────────────────────────────────────────┐
│                    Top Navigation Bar                          │
├────────────────┬────────────────────────────────────────────────┤
│                │  ┌──────────────────────────────────────────┐  │
│    Sidebar     │  │ Analytics          [Date Range ▼]        │  │
│                │  └──────────────────────────────────────────┘  │
│                │                                                 │
│                │  ┌──────────────────────────────────────────┐  │
│                │  │  Summary Cards (Key Metrics)             │  │
│                │  │  [Conv] [Avg Deal] [Win Rate] [Pipeline] │  │
│                │  └──────────────────────────────────────────┘  │
│                │                                                 │
│                │  ┌──────────────────┬──────────────────────┐   │
│                │  │ Conversion Funnel │ Revenue By Source   │   │
│                │  │  (Funnel Chart)   │ (Pie/Donut Chart)   │   │
│                │  └──────────────────┴──────────────────────┘   │
│                │                                                 │
│                │  ┌──────────────────┬──────────────────────┐   │
│                │  │ Revenue Trend     │ Sales Pipeline      │   │
│                │  │ (Line Chart)      │ (Bar Chart)         │   │
│                │  └──────────────────┴──────────────────────┘   │
│                │                                                 │
│                │  ┌──────────────────────────────────────────┐  │
│                │  │ Top Performers (Leaderboard)             │  │
│                │  │ ┌─────────────────────────────────────┐ │  │
│                │  │ │ 1. [Avatar] Sales Name    +$120K  │ │  │
│                │  │ │ 2. [Avatar] Other Sales   +$95K   │ │  │
│                │  │ │ 3. [Avatar] Another Sales +$85K   │ │  │
│                │  │ └─────────────────────────────────────┘ │  │
│                │  └──────────────────────────────────────────┘  │
│                │                                                 │
└────────────────┴────────────────────────────────────────────────┘
```

### 11.2 Key Components

#### A. Date Range Selector
```
[Last 7 Days ▼] or [Custom Date Range]
- 7 Days
- 30 Days
- 90 Days
- Year to Date
- Custom (date picker)
```

#### B. Summary Cards (KPIs)
```
┌─────────────────────────┐
│ Conversion Rate       ↑ │
│ 3.8%                 12%│
│                         │
│ [icon: funnel]          │
└─────────────────────────┘

Layout:
- 4 columns (desktop)
- 2 columns (tablet)
- 1 column (mobile)
- Card height: 140px
- Icon: 40px, Primary color
- Large number: 24px bold
- % change: 12px, colored (green/red)
```

#### C. Charts
**Left Column (50%)**
- Conversion Funnel Chart (Funnel visualization)
- Height: 300px
- Colors: Primary → Warning → Success gradient
- Labels: Count + %

**Right Column (50%)**
- Revenue By Source (Pie or Donut chart)
- Height: 300px
- Multiple colors from palette
- Legend: Bottom positioned

**Full Width Below**
- Revenue Trend (Line chart over time)
- Height: 300px
- X-axis: Dates
- Y-axis: Revenue
- Multiple lines (Target vs Actual)

- Sales Pipeline (Stacked Bar chart)
- Height: 300px
- Stages: Prospecting | Qualified | Negotiation | Closing
- Colors: Different colors per stage

#### D. Leaderboard / Top Performers
```
┌────────────────────────────────────────────┐
│ Top Performers (This Month)                │
├────────────────────────────────────────────┤
│ 1. [Avatar] Jane Smith       $125,450      │
│    13 won deals                            │
├────────────────────────────────────────────┤
│ 2. [Avatar] John Doe         $98,750       │
│    10 won deals                            │
├────────────────────────────────────────────┤
│ 3. [Avatar] Sarah Johnson    $87,200       │
│    9 won deals                             │
└────────────────────────────────────────────┘

Row height: 64px
Padding: 16px
Rank: 24px bold, Primary color
Dividers: Subtle border
```

---

## 12. RESPONSIVE DESIGN PATTERNS

### 12.1 Mobile (320px - 480px)
- Single column layout
- Sidebar becomes bottom tab navigation or slide-out drawer
- Cards go full width
- Tables become card layout
- Padding: 16px
- Font sizes reduced by 2-4px

### 12.2 Tablet (481px - 768px)
- Two column grid (where applicable)
- Sidebar collapsible to icons only
- Cards: 2 columns maximum
- Tables remain but with horizontal scroll
- Padding: 20px

### 12.3 Desktop (769px+)
- Full multi-column layouts
- Sidebar always visible
- Maximum 4 columns for grids
- Tables full width
- Padding: 24-32px

### 12.4 Responsive Rules
- Never force horizontal scroll
- Touch targets minimum 44px (mobile)
- Readable text on all screens
- Images scale proportionally
- Use max-width: 1400px for content containers

---

## 13. INTERACTIVE STATES

### 13.1 Button States
```
Default:
  Background: Primary
  Color: White
  Padding: 12px 20px
  
Hover:
  Background: Primary (darker)
  Transition: 150ms ease-out
  Cursor: pointer
  
Active/Pressed:
  Transform: scale(0.98)
  
Focus:
  Outline: 2px solid Primary
  Outline-offset: 2px
  
Disabled:
  Opacity: 0.5
  Cursor: not-allowed
```

### 13.2 Form Input States
```
Default:
  Border: 1px solid border-color
  Background: Surface
  
Focus:
  Border: 2px solid Primary
  Box-shadow: 0 0 0 3px rgba(Primary, 0.1)
  
Error:
  Border: 1px solid Danger
  Background: Danger-light
  
Success:
  Border: 1px solid Success
  Background: Success-light
  
Disabled:
  Background: Background
  Color: text-secondary
  Opacity: 0.6
```

### 13.3 Card States
```
Default:
  Background: Surface
  Shadow: shadow-sm
  Border-radius: 8px
  
Hover (interactive):
  Shadow: shadow-md
  Transform: translateY(-2px)
  Transition: 150ms ease-out
  
Active/Selected:
  Border: 2px solid Primary
  
Loading:
  Opacity: 0.7
  Pointer-events: none
```

---

## 14. ACCESSIBILITY

### 14.1 WCAG 2.1 AA Compliance
- **Color Contrast**: Minimum 4.5:1 for text
- **Focus Visible**: Always visible focus indicators
- **Keyboard Navigation**: All interactive elements
- **ARIA Labels**: For icons and unlabeled buttons
- **Form Labels**: Associated with inputs
- **Skip Links**: For main content access
- **Semantic HTML**: Proper heading hierarchy

### 14.2 Dark Mode Considerations
- Increase shadow opacity for visibility
- Adjust color contrast for dark backgrounds
- Maintain color contrast in dark mode
- Use lighter borders on dark surfaces
- Test readability in low light

---

## 15. DESIGN TOKENS IMPLEMENTATION

Create a `design-tokens.js` file in the project root:

```javascript
// design-tokens.js
export const designTokens = {
  colors: {
    primary: '#2563EB',
    success: '#22C55E',
    warning: '#F59E0B',
    danger: '#EF4444',
    background: '#F8FAFC',
    surface: '#FFFFFF',
    border: '#E2E8F0',
    text: {
      primary: '#1E293B',
      secondary: '#64748B',
      tertiary: '#94A3B8',
    },
    dark: {
      background: '#0F172A',
      surface: '#1E293B',
      border: '#334155',
    },
  },
  spacing: {
    0: 0,
    1: '4px',
    2: '8px',
    3: '12px',
    4: '16px',
    5: '20px',
    6: '24px',
    8: '32px',
    10: '40px',
    12: '48px',
    16: '64px',
  },
  shadows: {
    none: 'none',
    sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px rgba(0, 0, 0, 0.07)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px rgba(0, 0, 0, 0.15)',
    '2xl': '0 25px 50px rgba(0, 0, 0, 0.2)',
  },
  radius: {
    sm: '4px',
    md: '6px',
    lg: '8px',
    xl: '12px',
    full: '9999px',
  },
  fonts: {
    primary: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },
  transitions: {
    fast: '150ms ease-out',
    base: '200ms ease-out',
    slow: '300ms ease-in-out',
  },
};
```

---

## 16. IMPLEMENTATION CHECKLIST

- [ ] Create atomic component library (Buttons, Inputs, etc.)
- [ ] Build molecule components (Cards, Forms, etc.)
- [ ] Develop layout components (Sidebar, Header, etc.)
- [ ] Implement Dark mode context
- [ ] Create responsive utilities/hooks
- [ ] Build Dashboard page
- [ ] Build Leads page
- [ ] Build Analytics page
- [ ] Add smooth transitions/animations
- [ ] Test accessibility (WAVE, aXe)
- [ ] Test on mobile, tablet, desktop
- [ ] Create shared CSS variables file
- [ ] Document component prop patterns
- [ ] Set up Storybook (optional)
- [ ] Performance optimization (lazy loading, code splitting)

---

## 17. DESIGN INSPIRATION REFERENCES

**Linear Design**: Minimalism, clean typography, subtle interactions
**Stripe Design**: Premium feel, generous spacing, smooth animations
**Notion Design**: Clean cards, consistent hierarchy, flexible layouts

---

*Design System Version 1.0*
*Last Updated: 2024*
