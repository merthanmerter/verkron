import { type BaseContent, ContentService } from '@/lib/content';

export interface Project extends BaseContent {
  logo: string;
  title: string;
  projectType: string;
  industry: string;
  featured: boolean;
  description: string;
}

export const projectsService = new ContentService<Project>('projects');
