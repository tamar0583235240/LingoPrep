export interface PublicProfile {
  first_name: string;
  last_name: string;
  image_url?: string;
  location?: string;
  external_links?: Record<string, string>;
  status?: string;
  preferred_job_type?: string;
  education: {
    institution_name: string;
    type: string;
    title: string;
    field_of_study: string;
    start_date: string;
    end_date: string;
    description: string;
  }[];
  expertise: {
    category: string;
    name: string;
    level: string;
  }[];
  personal_projects: {
    title: string;
    description: string;
    demo_url?: string;
    code_url?: string;
    thumbnail_url?: string;
    tags?: string[];
    status?: string;
  }[];
  work_experience: {
    company_name: string;
    position: string;
    description: string;
    start_date: string;
    end_date: string;
  }[];
}
