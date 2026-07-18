# CRM Dashboard - Implementation Guide

## Quick Start

This guide will help you implement the premium CRM Dashboard UI using the design system.

---

## 1. PROJECT STRUCTURE

```
src/
├── design/
│   └── tokens.js              # Design tokens (colors, spacing, etc.)
├── styles/
│   └── design-system.css      # Global CSS variables and base styles
├── components/
│   ├── atoms/
│   │   ├── Button.jsx
│   │   ├── Button.css
│   │   ├── Badge.jsx
│   │   ├── Input.jsx
│   │   ├── Icon.jsx
│   │   └── ...
│   ├── molecules/
│   │   ├── FormField.jsx      # Label + Input
│   │   ├── SearchBar.jsx
│   │   ├── MetricItem.jsx
│   │   ├── Avatar.jsx
│   │   └── ...
│   ├── organisms/
│   │   ├── Card.jsx
│   │   ├── Card.css
│   │   ├── Modal.jsx
│   │   ├── Table.jsx
│   │   ├── Navigation.jsx
│   │   └── ...
│   ├── templates/
│   │   ├── Layout.jsx
│   │   ├── Layout.css
│   │   ├── DashboardLayout.jsx
│   │   ├── LeadsLayout.jsx
│   │   └── AnalyticsLayout.jsx
│   ├── dashboard/
│   │   ├── Dashboard.jsx
│   │   └── Dashboard.css
│   ├── leads/
│   │   ├── Leads.jsx
│   │   └── Leads.css
│   └── analytics/
│       ├── Analytics.jsx
│       └── Analytics.css
├── hooks/
│   ├── useTheme.js           # Dark mode hook
│   ├── useResponsive.js      # Responsive helper
│   └── ...
├── context/
│   ├── ThemeContext.jsx      # Already exists
│   └── LeadContext.jsx       # Already exists
├── App.jsx
├── App.css
├── main.jsx
└── index.css
```

---

## 2. SETUP INSTRUCTIONS

### Step 1: Import Global Styles
Add to your `main.jsx` (before all other imports):

```javascript
import './styles/design-system.css'
import './index.css'
import App from './App.jsx'
```

### Step 2: Import Design Tokens
Use in any component:

```javascript
import { colors, spacing, shadows, radius } from './design/tokens'

// Example:
const cardStyles = {
  backgroundColor: colors.surface,
  padding: spacing[6],
  borderRadius: radius.lg,
  boxShadow: shadows.md,
}
```

### Step 3: Create App Layout
Update your `App.jsx`:

```javascript
import { ThemeProvider } from './context/ThemeContext'
import { PageLayout } from './components/templates/Layout'
import Sidebar from './components/organisms/Sidebar'
import Header from './components/organisms/Header'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="app">
          <Routes>
            <Route
              path="/"
              element={
                <PageLayout sidebar={<Sidebar />} header={<Header />}>
                  <Dashboard />
                </PageLayout>
              }
            />
            <Route
              path="/leads"
              element={
                <PageLayout sidebar={<Sidebar />} header={<Header />}>
                  <Leads />
                </PageLayout>
              }
            />
            <Route
              path="/analytics"
              element={
                <PageLayout sidebar={<Sidebar />} header={<Header />}>
                  <Analytics />
                </PageLayout>
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
```

---

## 3. COMPONENT USAGE EXAMPLES

### Button Component
```jsx
import { Button } from './components/atoms/Button'
import { CheckIcon } from './icons'

// Basic
<Button variant="primary">Save Changes</Button>

// With Icon
<Button variant="success" icon={<CheckIcon />}>
  Confirm
</Button>

// Large
<Button variant="danger" size="large">
  Delete Lead
</Button>

// Disabled
<Button disabled>Cannot Click</Button>

// Full Width
<Button fullWidth>Full Width Button</Button>
```

### Card Component
```jsx
import { Card, MetricCard, DataCard } from './components/organisms/Card'

// Basic Card
<Card header="Lead Details">
  <p>Content goes here...</p>
</Card>

// Metric Card
<MetricCard
  icon={<TrendingUpIcon />}
  title="Total Revenue"
  value="$245,000"
  change="+18.5%"
  changeLabel="vs last month"
  trend="up"
/>

// Data Card
<DataCard
  label="Conversion Rate"
  value="3.8"
  unit="%"
  description="vs 3.2% last month"
/>
```

### Page Layout
```jsx
import { PageLayout, PageHeader, PageSection, ContentGrid } from './components/templates/Layout'

<PageLayout sidebar={<Sidebar />}>
  <PageHeader
    title="Dashboard"
    subtitle="Welcome back, John!"
    actions={<Button>+ Add Lead</Button>}
  />
  <PageSection spacing="large">
    <ContentGrid columns={4} gap="6">
      <MetricCard ... />
      <MetricCard ... />
      <MetricCard ... />
      <MetricCard ... />
    </ContentGrid>
  </PageSection>
</PageLayout>
```

---

## 4. DARK MODE IMPLEMENTATION

### Using Theme Context
```jsx
import { useTheme } from './context/ThemeContext'

function MyComponent() {
  const { isDark, toggleTheme } = useTheme()

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDark])

  return (
    <button onClick={toggleTheme}>
      Toggle {isDark ? 'Light' : 'Dark'} Mode
    </button>
  )
}
```

### CSS Variables Auto-Adjust
All CSS variables automatically switch when `.dark` class is added to `html` element.

---

## 5. RESPONSIVE DESIGN IMPLEMENTATION

### Using Media Queries
```jsx
import styled from 'styled-components'
import { media } from './design/tokens'

const ResponsiveGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-6);

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`
```

### Using Custom Hook
```jsx
import { useResponsive } from './hooks/useResponsive'

function MyComponent() {
  const { isMobile, isTablet, isDesktop } = useResponsive()

  if (isMobile) {
    return <MobileView />
  }

  if (isTablet) {
    return <TabletView />
  }

  return <DesktopView />
}
```

---

## 6. SPACING GUIDELINES

### Use CSS Variables for Consistency
```jsx
import styled from 'styled-components'

const Container = styled.div`
  padding: var(--space-6);           /* 24px */
  margin-bottom: var(--space-8);     /* 32px */
  gap: var(--space-4);               /* 16px */
`
```

### Common Spacing Patterns
```
Page padding:       var(--space-8)      /* 32px */
Card padding:       var(--space-6)      /* 24px */
Component gap:      var(--space-4)      /* 16px */
Section margin:     var(--space-8)      /* 32px */
Button padding:     var(--space-3) 5   /* 12px 20px */
Input padding:      var(--space-2) 3   /* 8px 12px */
```

---

## 7. COLOR USAGE

### Status Colors
```jsx
const statusColorMap = {
  'prospecting': '#F59E0B',    // Warning/Yellow
  'qualified': '#2563EB',      // Primary/Blue
  'negotiation': '#F59E0B',    // Warning/Orange
  'won': '#22C55E',            // Success/Green
  'lost': '#EF4444',           // Danger/Red
}
```

### Using in Components
```jsx
<Badge style={{ backgroundColor: statusColorMap[status] }}>
  {status}
</Badge>
```

---

## 8. FORM IMPLEMENTATION

### Form Structure
```jsx
import { FormField, Input, Label, Button } from './components/molecules'

function LeadForm() {
  const [formData, setFormData] = useState({})
  const [errors, setErrors] = useState({})

  return (
    <form>
      <FormField>
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          type="text"
          placeholder="John Smith"
          value={formData.name || ''}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          error={errors.name}
        />
      </FormField>

      <FormField>
        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          type="email"
          placeholder="john@example.com"
          value={formData.email || ''}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          error={errors.email}
        />
      </FormField>

      <div style={{ marginTop: 'var(--space-6)' }}>
        <Button variant="primary" type="submit">
          Add Lead
        </Button>
      </div>
    </form>
  )
}
```

---

## 9. TABLE IMPLEMENTATION

### Table Component
```jsx
import { Table } from './components/organisms/Table'

function LeadsTable({ leads }) {
  const columns = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email' },
    { key: 'status', label: 'Status', render: (value) => <Badge>{value}</Badge> },
    { key: 'value', label: 'Lead Value', render: (value) => `$${value}` },
    { key: 'lastContact', label: 'Last Contact' },
    {
      key: 'actions',
      label: 'Actions',
      render: (_, row) => (
        <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
          <Button size="small" variant="secondary">Edit</Button>
          <Button size="small" variant="danger">Delete</Button>
        </div>
      ),
    },
  ]

  return <Table columns={columns} data={leads} />
}
```

---

## 10. MODAL/DIALOG IMPLEMENTATION

### Modal Component
```jsx
import { Modal, ModalHeader, ModalBody, ModalFooter } from './components/organisms/Modal'
import { Button } from './components/atoms/Button'

function EditLeadModal({ lead, isOpen, onClose, onSave }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalHeader title="Edit Lead" onClose={onClose} />
      <ModalBody>
        <LeadForm initialData={lead} />
      </ModalBody>
      <ModalFooter>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={onSave}>
          Save Changes
        </Button>
      </ModalFooter>
    </Modal>
  )
}
```

---

## 11. ANIMATION & TRANSITIONS

### Smooth Transitions
```jsx
import styled from 'styled-components'

const AnimatedCard = styled.div`
  transition: all var(--transition-fast);

  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }
`
```

### Custom Animations
```css
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-slide-in {
  animation: slideIn 300ms ease-out forwards;
}
```

---

## 12. ACCESSIBILITY

### ARIA Labels
```jsx
<Button aria-label="Close modal" onClick={onClose}>
  ✕
</Button>
```

### Keyboard Navigation
```jsx
const handleKeyDown = (e) => {
  if (e.key === 'Escape') {
    onClose()
  }
}
```

### Focus Management
```jsx
const modalRef = useRef()

useEffect(() => {
  if (isOpen) {
    modalRef.current?.focus()
  }
}, [isOpen])
```

---

## 13. COMMON PATTERNS

### Loading State
```jsx
<Button disabled className="loading">
  <Spinner size="small" />
  Loading...
</Button>
```

### Empty State
```jsx
<Card className="empty-state">
  <div style={{ textAlign: 'center', padding: 'var(--space-12)' }}>
    <EmptyIcon size={48} />
    <h3>No Leads Found</h3>
    <p>Start by adding your first lead</p>
    <Button>+ Add Lead</Button>
  </div>
</Card>
```

### Error State
```jsx
<div className="alert alert-danger">
  <ErrorIcon />
  <div>
    <h4>Error</h4>
    <p>Failed to load leads. Please try again.</p>
  </div>
</div>
```

---

## 14. PERFORMANCE OPTIMIZATION

### Code Splitting
```jsx
import { lazy, Suspense } from 'react'

const Dashboard = lazy(() => import('./pages/Dashboard'))

<Suspense fallback={<Loading />}>
  <Dashboard />
</Suspense>
```

### Memoization
```jsx
import { memo } from 'react'

const MetricCard = memo(({ icon, title, value }) => {
  return (
    // Component JSX
  )
})
```

### Virtual Lists (for large tables)
```jsx
import { FixedSizeList } from 'react-window'

<FixedSizeList height={600} itemCount={leads.length} itemSize={56}>
  {({ index, style }) => (
    <div style={style}>
      <LeadRow lead={leads[index]} />
    </div>
  )}
</FixedSizeList>
```

---

## 15. TESTING

### Component Testing
```jsx
import { render, screen } from '@testing-library/react'
import { Button } from './components/atoms/Button'

test('renders button with text', () => {
  render(<Button>Click me</Button>)
  expect(screen.getByText('Click me')).toBeInTheDocument()
})
```

### Accessibility Testing
```jsx
test('button is keyboard accessible', () => {
  render(<Button>Click</Button>)
  const button = screen.getByRole('button')
  button.focus()
  expect(button).toHaveFocus()
})
```

---

## 16. BUILD AND DEPLOYMENT

### Optimize for Production
```bash
npm run build
```

### CSS Purging
The design system uses CSS variables, which are preserved in production. No need for PurgeCSS.

### Image Optimization
Place icons in `src/assets/` and import:
```jsx
import { ReactComponent as DashboardIcon } from './assets/icons/dashboard.svg'
```

---

## 17. ADDITIONAL RESOURCES

- **Design Tokens**: See `src/design/tokens.js`
- **Design System Guide**: See `DESIGN_SYSTEM.md`
- **Component Examples**: See component files in `src/components/`
- **CSS Variables**: See `src/styles/design-system.css`

---

## 18. CHECKLIST FOR IMPLEMENTATION

- [ ] Import `design-system.css` in main entry point
- [ ] Set up ThemeContext for dark mode
- [ ] Create Sidebar component with navigation
- [ ] Create Header component with user menu
- [ ] Implement Dashboard page with metrics
- [ ] Implement Leads page with table
- [ ] Implement Analytics page with charts
- [ ] Add responsive styles to all pages
- [ ] Test dark mode functionality
- [ ] Test on mobile, tablet, desktop
- [ ] Optimize images and assets
- [ ] Test accessibility with screen reader
- [ ] Set up error boundaries
- [ ] Configure lazy loading for routes
- [ ] Test performance metrics

---

**Last Updated**: 2024
**Version**: 1.0
