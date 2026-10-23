const cards = [
  { key: 'all', label: 'Total Projects', icon: '▦' },
  { key: 'In Progress', label: 'In Progress', icon: '◷' },
  { key: 'Completed', label: 'Completed', icon: '✓' },
  { key: 'Planning', label: 'Planning', icon: '⌁' },
];

export default function DashboardSummary({ projects }) {
  return (
    <section className="summary-grid">
      {cards.map(({ key, label, icon }) => {
        const count =
          key === 'all'
            ? projects.length
            : projects.filter((project) => project.status === key).length;

        return (
          <article className="summary-card" key={key}>
            <div className="summary-top">
              <span>{label}</span>
              <span className="summary-icon">{icon}</span>
            </div>
            <strong>{String(count).padStart(2, '0')}</strong>
            <small>{key === 'all' ? 'All tracked projects' : 'Current projects'}</small>
          </article>
        );
      })}
    </section>
  );
}
