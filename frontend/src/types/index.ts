export interface TechItem {
  name: string;
  icon: string;
  color: string;
}

export interface Project {
  title: string;
  desc: string;
  tags: string[];
  github: string;
  live: string;
  gradient: string;
  number: string;
}

export interface ContactField {
  icon: string;
  label: string;
  value: string;
  href: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
}
