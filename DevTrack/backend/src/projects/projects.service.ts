import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';

@Injectable()
export class ProjectsService {
  private readonly projects: Project[] = [
    {
      id: 'PRJ-001', name: 'DevTrack Dashboard',
      description: 'Dashboard untuk mengelola proyek dan progres pengembangan software.',
      category: 'Web Development', technologies: ['React', 'Vite', 'CSS'],
      status: 'In Progress', progress: 65, deadline: '2026-11-15',
      githubUrl: 'https://github.com/', createdAt: new Date().toISOString(),
    },
  ];

  findAll() { return this.projects; }

  findOne(id: string) {
    const project = this.projects.find((item) => item.id === id);
    if (!project) throw new NotFoundException(`Project ${id} tidak ditemukan`);
    return project;
  }

  create(dto: CreateProjectDto) {
    if (this.projects.some((item) => item.name.toLowerCase() === dto.name.toLowerCase())) {
      throw new ConflictException('Nama project sudah digunakan');
    }
    const project = { ...dto, id: `PRJ-${randomUUID().slice(0, 6).toUpperCase()}`, createdAt: new Date().toISOString() };
    this.projects.unshift(project);
    return project;
  }

  update(id: string, dto: UpdateProjectDto) {
    const project = this.findOne(id);
    if (dto.name) {
      const duplicate = this.projects.some(
        (item) => item.id !== id && item.name.toLowerCase() === dto.name!.toLowerCase(),
      );
      if (duplicate) throw new ConflictException('Nama project sudah digunakan');
    }
    Object.assign(project, dto);
    return project;
  }

  remove(id: string) {
    const index = this.projects.findIndex((item) => item.id === id);
    if (index < 0) throw new NotFoundException(`Project ${id} tidak ditemukan`);
    return this.projects.splice(index, 1)[0];
  }
}
