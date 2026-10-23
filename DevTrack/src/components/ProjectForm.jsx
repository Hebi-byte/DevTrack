import { useState } from 'react';
import { categories, statuses } from '../data/projects.js';

const empty = {
  name: '',
  description: '',
  category: 'Web Development',
  technologies: '',
  status: 'Planning',
  progress: 0,
  deadline: '',
  githubUrl: '',
};

function normalizeProject(project) {
  if (!project) return empty;

  return {
    ...empty,
    ...project,
    technologies: Array.isArray(project.technologies)
      ? project.technologies.join(', ')
      : (project.technologies ?? ''),
  };
}

export default function ProjectForm({ initialProject, onAdd, onClose }) {
  const [form, setForm] = useState(() => normalizeProject(initialProject));
  const [error, setError] = useState('');

  const update = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === 'progress' ? Number(value || 0) : value,
    }));
  };

  function submit(e) {
    e.preventDefault();

    if (!form.name.trim() || !form.description.trim()) {
      setError('Nama dan deskripsi proyek wajib diisi.');
      return;
    }

    if (form.githubUrl && !/^https?:\/\/.+/i.test(form.githubUrl)) {
      setError('URL repository harus diawali http:// atau https://.');
      return;
    }

    const nextProject = {
      ...form,
      id: initialProject?.id ?? `PRJ-${Date.now().toString().slice(-6)}`,
      name: form.name.trim(),
      description: form.description.trim(),
      technologies: form.technologies
        .split(',')
        .map((x) => x.trim())
        .filter(Boolean),
      progress: Math.min(100, Math.max(0, Number(form.progress) || 0)),
      createdAt: initialProject?.createdAt ?? new Date().toISOString(),
    };

    onAdd(nextProject);
    onClose();
  }

  const title = initialProject ? 'Edit proyek' : 'Tambah proyek baru';

  return (
    <div className="backdrop" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <section className="modal">
        <div className="modal-head">
          <div>
            <small>PROJECT MANAGEMENT</small>
            <h2>{title}</h2>
          </div>
          <button className="close" onClick={onClose}>×</button>
        </div>

        <form onSubmit={submit} className="form">
          <label>
            Nama proyek *
            <input name="name" value={form.name} onChange={update} required placeholder="Website Portfolio" />
          </label>

          <label>
            Deskripsi *
            <textarea name="description" value={form.description} onChange={update} required rows="3" placeholder="Jelaskan tujuan proyek..." />
          </label>

          <div className="form-row">
            <label>
              Kategori
              <select name="category" value={form.category} onChange={update}>
                {categories.map((x) => <option key={x}>{x}</option>)}
              </select>
            </label>

            <label>
              Status
              <select name="status" value={form.status} onChange={update}>
                {statuses.map((x) => <option key={x}>{x}</option>)}
              </select>
            </label>
          </div>

          <label>
            Teknologi
            <input name="technologies" value={form.technologies} onChange={update} placeholder="React, CSS, Node.js" />
          </label>

          <div className="form-row">
            <label>
              Deadline
              <input type="date" name="deadline" value={form.deadline} onChange={update} />
            </label>

            <label>
              Progress (%)
              <input type="number" name="progress" min="0" max="100" value={form.progress} onChange={update} />
            </label>
          </div>

          <label>
            GitHub repository
            <input name="githubUrl" value={form.githubUrl} onChange={update} placeholder="https://github.com/user/repo" />
          </label>

          {error && <p className="error">{error}</p>}

          <div className="form-actions">
            <button type="button" className="btn ghost" onClick={onClose}>Batal</button>
            <button className="btn primary">{initialProject ? 'Perbarui proyek' : 'Simpan proyek'} ↗</button>
          </div>
        </form>
      </section>
    </div>
  );
}
