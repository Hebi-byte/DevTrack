export default function ProjectFilter({
  query,
  onQueryChange,
  status,
  onStatusChange,
  category,
  onCategoryChange,
  categories,
  total,
}) {
  return (
    <div className="toolbar">
      <div>
        <h2>
          All Projects <span className="count">{total}</span>
        </h2>
        <p>Kelola dan pantau semua proyek.</p>
      </div>

      <div className="filters">
        <input
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="⌕  Cari proyek..."
          aria-label="Cari proyek"
        />
        <select
          value={status}
          onChange={(event) => onStatusChange(event.target.value)}
          aria-label="Filter berdasarkan status"
        >
          <option value="All">Semua status</option>
          <option>Planning</option>
          <option>In Progress</option>
          <option>Completed</option>
          <option>On Hold</option>
        </select>
        <select
          value={category}
          onChange={(event) => onCategoryChange(event.target.value)}
          aria-label="Filter berdasarkan kategori"
        >
          <option value="All">Semua kategori</option>
          {categories.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
