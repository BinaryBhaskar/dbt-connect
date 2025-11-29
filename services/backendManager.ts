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
  return Promise.resolve({ schemes: 156, beneficiaries: '2.4M', centers: 1250 });
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
