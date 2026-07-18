/**
 * Sample leads dataset conforming to the CRM schemas.
 * Includes Indian names, varied statuses, sources, deal values, owners, and timestamps.
 * 
 * Varied statuses: 2 New, 1 Contacted, 1 Won, 1 Lost, 1 Meeting Scheduled
 */
export const sampleLeads = [
  {
    id: 'lead_001',
    name: 'Amit Sharma',
    company: 'Tata Consultancy Services',
    email: 'amit.sharma@tcs.com',
    phone: '+91 98765 43210',
    status: 'Won',
    source: 'Referral',
    value: 120000,
    createdAt: '2026-01-10T10:00:00Z',
    contactedAt: '2026-01-12T14:30:00Z',
    meetingAt: '2026-01-15T11:00:00Z',
    proposalAt: '2026-01-20T16:00:00Z',
    wonAt: '2026-01-25T12:00:00Z',
    lastContact: '2026-01-25T12:00:00Z',
    owner: 'Sarah'
  },
  {
    id: 'lead_002',
    name: 'Priya Patel',
    company: 'Reliance Industries',
    email: 'priya.patel@ril.com',
    phone: '+91 87654 32109',
    status: 'Meeting Scheduled',
    source: 'LinkedIn',
    value: 85000,
    createdAt: '2026-03-12T11:00:00Z',
    contactedAt: '2026-03-14T09:15:00Z',
    meetingAt: '2026-03-18T15:00:00Z',
    lastContact: '2026-03-18T15:00:00Z',
    owner: 'Alex'
  },
  {
    id: 'lead_003',
    name: 'Rohan Mehta',
    company: 'Infosys Limited',
    email: 'rohan.mehta@infosys.com',
    phone: '+91 76543 21098',
    status: 'New',
    source: 'Website',
    value: 50000,
    createdAt: '2026-06-22T09:30:00Z',
    lastContact: '2026-06-22T09:30:00Z',
    owner: 'David'
  },
  {
    id: 'lead_004',
    name: 'Ananya Iyer',
    company: 'Wipro Technologies',
    email: 'ananya.iyer@wipro.com',
    phone: '+91 65432 10987',
    status: 'New',
    source: 'Other',
    value: 40000,
    createdAt: '2026-06-23T14:00:00Z',
    lastContact: '2026-06-23T14:00:00Z',
    owner: 'Sarah'
  },
  {
    id: 'lead_005',
    name: 'Vikram Singh',
    company: 'HDFC Bank',
    email: 'vikram.singh@hdfcbank.com',
    phone: '+91 99887 76655',
    status: 'Contacted',
    source: 'Cold Call',
    value: 95000,
    createdAt: '2026-04-05T16:45:00Z',
    contactedAt: '2026-04-10T11:00:00Z',
    lastContact: '2026-04-10T11:00:00Z',
    owner: 'Alex'
  },
  {
    id: 'lead_006',
    name: 'Sneha Reddy',
    company: 'Zomato',
    email: 'sneha.reddy@zomato.com',
    phone: '+91 88776 65544',
    status: 'Lost',
    source: 'Email Campaign',
    value: 30000,
    createdAt: '2026-02-18T12:00:00Z',
    contactedAt: '2026-02-20T15:30:00Z',
    lastContact: '2026-02-25T17:30:00Z',
    owner: 'David'
  }
];

export default sampleLeads;
