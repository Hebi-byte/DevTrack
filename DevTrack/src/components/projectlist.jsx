import ProjectCard from './ProjectCard.jsx';

export default function ProjectList({ projects, onDelete, onEdit }) {
  if (projects.length === 0) {
    return (
      <div className="empty">
        <div>▦</div>
        <h3>Belum ada data proyek</h3>
        <p>Tambahkan proyek baru atau ubah pencarian dan filter.</p>
      </div>
    );
  }

  return (
    <div className="project-grid">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}
