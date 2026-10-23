const statusClasses = {
  Planning: 'planning',
  'In Progress': 'progress',
  Completed: 'completed',
  'On Hold': 'hold',
};

const dateFormatter = new Intl.DateTimeFormat('id-ID', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
});

function formatDeadline(deadline) {
  if (!deadline) return 'Belum ditentukan';

  const date = new Date(`${deadline}T00:00:00`);
  return Number.isNaN(date.getTime()) ? 'Belum ditentukan' : dateFormatter.format(date);
}

export default function ProjectCard({ project, onDelete, onEdit }) {
  const technologies = Array.isArray(project.technologies)
    ? project.technologies
    : [];
  const progress = Math.min(100, Math.max(0, Number(project.progress) || 0));

  return (
    <article className="project-card">
      <div className="card-top">
        <span className="project-id">{project.id}</span>
        <button
          type="button"
          className="dots"
          onClick={() => onEdit(project)}
          title="Edit proyek"
          aria-label={`Edit ${project.name}`}
        >
          •••
        </button>
      </div>

      <div className="project-title">
        <div className="project-icon" aria-hidden="true">⌘</div>
        <div>
          <h3>{project.name}</h3>
          <small>{project.category}</small>
        </div>
      </div>

      <p className="description">{project.description}</p>

      <div className="tags">
        {technologies.length > 0 ? (
          technologies.map((technology) => (
            <span key={technology}>{technology}</span>
          ))
        ) : (
          <span>Belum ada teknologi</span>
        )}
      </div>

      <div className="progress-label">
        <span>Progress</span>
        <b>{progress}%</b>
      </div>
      <div className="track">
        <span style={{ width: `${progress}%` }} />
      </div>

      <div className="card-footer">
        <span className={`status ${statusClasses[project.status] ?? ''}`}>
          {project.status}
        </span>
        <small>◷ {formatDeadline(project.deadline)}</small>
      </div>

      <div className="card-actions">
        {project.githubUrl && (
          <a href={project.githubUrl} target="_blank" rel="noreferrer">
            Repository ↗
          </a>
        )}
        <button type="button" onClick={() => onDelete(project.id)}>
          Hapus
        </button>
      </div>
    </article>
  );
}
