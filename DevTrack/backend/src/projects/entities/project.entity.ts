export class Project {
  id: string;
  name: string;
  description: string;
  category: string;
  technologies: string[];
  status: string;
  progress: number;
  deadline?: string;
  githubUrl?: string;
  createdAt: string;
}
