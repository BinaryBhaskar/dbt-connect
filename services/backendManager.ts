// Types for Explore and Scholarships screens
export type Center = {
  id: number;
  name: string;
  type: string;
  status: string;
  address: string;
  distance: string;
  phone: string;
  hours: string;
  latitude: number;
  longitude: number;
};

export type Scholarship = {
  id: number;
  name: string;
  type: string;
  state: string;
  amount: string;
  audience: string;
  deadline: string;
  status: string;
  description?: string;
};

// For DBT status check
export type DBTStatusResult = {
  aadhaarLinked: boolean;
  dbtEnabled: boolean;
  message: string;
};

export async function fetchCenters(): Promise<Center[]> {
  return Promise.resolve([
    {
      id: 1,
      name: 'CSC Center - Rajendra Nagar',
      type: 'CSC',
      status: 'Open',
      address: 'Shop 12, Main Market, Rajendra Nagar',
      distance: '1.2 km away',
      phone: '98765 43210',
      hours: '9:00 AM - 6:00 PM',
      latitude: 28.6139,
      longitude: 77.209,
    },
    {
      id: 2,
      name: 'State Bank of India - Main Branch',
      type: 'Bank',
      status: 'Open',
      address: 'Civil Lines, Near District Court',
      distance: '2.5 km away',
      phone: '98765 43212',
      hours: '10:00 AM - 4:00 PM',
      latitude: 28.6145,
      longitude: 77.205,
    },
    {
      id: 3,
      name: 'DBT Help Desk - Block Office',
      type: 'Government',
      status: 'Open',
      address: 'Block Development Office, Sadar Bazar',
      distance: '3.1 km away',
      phone: '98765 43222',
      hours: '10:00 AM - 4:00 PM',
      latitude: 28.612,
      longitude: 77.208,
    },
    {
      id: 4,
      name: 'Punjab National Bank',
      type: 'Bank',
      status: 'Closed',
      address: 'Gandhi Chowk, Railway Road',
      distance: '4.2 km away',
      phone: '98765 43225',
      hours: '10:00 AM - 4:00 PM',
      latitude: 28.615,
      longitude: 77.211,
    },
  ]);
}

export async function fetchScholarships(): Promise<Scholarship[]> {
  return Promise.resolve([
    {
      id: 1,
      name: 'Pre Matric Scholarship for SC Students',
      type: 'Central',
      state: '',
      amount: '₹6,000 - ₹18,000',
      audience: 'Class 1-10, SC category, Income < 1.2L',
      deadline: '15 Dec 2025',
      status: 'Open',
      description: 'Financial assistance for SC students in classes 1-10 to support school education and reduce dropout rates. Covers tuition, books and related expenses.',
    },
    {
      id: 2,
      name: 'Post Matric Scholarship for OBC',
      type: 'Central',
      state: '',
      amount: '₹8,000 - ₹24,000',
      audience: 'Class 11-12, OBC category, Income < 2L',
      deadline: '18 Dec 2025',
      status: 'Open',
      description: 'Support for OBC students pursuing post-matric studies; covers tuition fees and maintenance for eligible candidates.',
    },
    {
      id: 3,
      name: 'National Means-cum Merit Scholarship',
      type: 'Central',
      state: '',
      amount: '₹12,000',
      audience: 'Class 9-12, all categories, 55% marks',
      deadline: '30 Nov 2025',
      status: 'Closing Soon',
      description: 'Merit-cum-means scholarship for students with good academic performance and limited family income, aimed at reducing dropouts.',
    },
    {
      id: 4,
      name: 'State Merit Scholarship',
      type: 'State',
      state: 'UP',
      amount: '₹6,000 - ₹10,000',
      audience: 'Graduation, 60% in 12th, Income < 1L',
      deadline: '15 Jan 2026',
      status: 'Open',
      description: 'State-level merit scholarship for high-performing students to aid in higher education expenses.',
    },
    {
      id: 5,
      name: 'Pre Matric Scholarship for Minorities',
      type: 'Central',
      state: '',
      amount: '₹6,000',
      audience: 'Class 1-10, Minority community',
      deadline: '20 Dec 2025',
      status: 'Open',
      description: 'Provides support to students from minority communities to ensure continued primary and secondary education.',
    },
    {
      id: 6,
      name: 'Girl Child Education Scholarship',
      type: 'State',
      state: 'MP',
      amount: '₹8,000 - ₹20,000',
      audience: 'Female students, Class 1-12, Income < 2L',
      deadline: '10 Dec 2025',
      status: 'Open',
      description: 'Scholarship promoting education of girl children by providing financial assistance for schooling and related needs.',
    },
  ]);
}

export async function checkDBTStatus(aadhaar: string, account: string): Promise<DBTStatusResult> {
  // For now, return a dummy result based on input
  if (aadhaar && account) {
    return Promise.resolve({
      aadhaarLinked: true,
      dbtEnabled: true,
      message: 'Your account is Aadhaar-linked and DBT-enabled.',
    });
  }
  return Promise.resolve({
    aadhaarLinked: false,
    dbtEnabled: false,
    message: 'Please enter valid Aadhaar and account numbers.',
  });
}
// Simple backend manager that returns default data for now.
// Later this file can be updated to fetch from a real backend.

export type StatData = {
  schemes: number;
  beneficiaries: string;
  centers: number;
};

export type UpdateItem = {
  color: string;
  text: string;
  badge?: string;
  time: string;
};

export type NavItem = {
  key: string;
  label: string;
  // The UI imports an Svg component for icons; we keep it optional here.
  Svg?: any;
};

export async function fetchHomeStats(): Promise<StatData> {
  // Simulate async work; return default values for now.
  return Promise.resolve({ schemes: 159, beneficiaries: '2.4M', centers: 1250 });
}

export async function fetchUpdates(): Promise<UpdateItem[]> {
  return Promise.resolve([
    { color: '#22c55e', text: 'New Pre-Matric Scholarship announced for SC/ST students', badge: 'New', time: '2 days ago' },
    { color: '#3b82f6', text: 'DBT seeding deadline extended to Dec 31', time: '5 days ago' },
    { color: '#f97316', text: '500+ new help centers added across rural areas', time: '1 week ago' },
  ]);
}

export async function fetchNavItems(defaults?: NavItem[]): Promise<NavItem[]> {
  // If UI wants to supply Svg components, it can pass them in as `defaults`.
  if (defaults && defaults.length) return Promise.resolve(defaults);

  // Minimal default structure (icons should be supplied by the UI component by key)
  return Promise.resolve([
    { key: 'index', label: 'Home' },
    { key: 'dbt', label: 'DBT Check' },
    { key: 'scholarships', label: 'Scholarships' },
    { key: 'explore', label: 'Explore' },
  ]);
}

export async function fetchResources(): Promise<{ posters: number; videos: number }>{
  return Promise.resolve({ posters: 12, videos: 8 });
}
