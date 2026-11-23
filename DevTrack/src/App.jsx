import { useEffect, useMemo, useState } from 'react';
import DashboardSummary from './components/DashboardSummary.jsx';
import ProjectFilter from './components/ProjectFilter.jsx';
import ProjectForm from './components/ProjectForm.jsx';
import ProjectList from './components/ProjectList.jsx';
import Navbar from './components/Navbar.jsx';
import { projectsApi } from './lib/api.js';
import { categories, initialProjects } from './data/projects.js';

const demoModeMessage = 'Backend belum aktif, menggunakan data demo.';

export default function App() {
  const [projects, setProjects] = useState(initialProjects);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('All');
  const [category, setCategory] = useState('All');
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [apiError, setApiError] = useState('');

  useEffect(() => {
    projectsApi.list().then(setProjects).catch(() => setApiError(demoModeMessage));
  }, []);

  const filteredProjects = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return projects.filter((project) => {
      const technologies = Array.isArray(project.technologies)
        ? project.technologies.join(' ')
        : project.technologies ?? '';
      const searchableText = [
        project.name,
        project.description,
        technologies,
        project.category,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();

      return (
        searchableText.includes(normalizedQuery) &&
        (status === 'All' || project.status === status) &&
        (category === 'All' || project.category === category)
      );
    });
  }, [projects, query, status, category]);

  async function saveProject(project) {
    const payload = { ...project };
    delete payload.id;
    delete payload.createdAt;
    try {
      const saved = editingProject
        ? await projectsApi.update(editingProject.id, payload)
        : await projectsApi.create(payload);
      setProjects((currentProjects) => editingProject
        ? currentProjects.map((item) => item.id === saved.id ? saved : item)
        : [saved, ...currentProjects]);
      setApiError('');
    } catch (error) {
      setApiError(error.message);
    }
  }

  async function deleteProject(projectId) {
    if (!window.confirm('Yakin ingin menghapus proyek ini?')) return;
    try {
      await projectsApi.remove(projectId);
      setProjects((currentProjects) => currentProjects.filter((project) => project.id !== projectId));
      setApiError('');
    } catch (error) {
      setApiError(error.message);
    }
  }

  function closeForm() {
    setShowForm(false);
    setEditingProject(null);
  }

  function openCreateForm() {
    setEditingProject(null);
    setShowForm(true);
  }

  function openEditForm(project) {
    setEditingProject(project);
    setShowForm(true);
  }

  return (
    <>
      <Navbar />
      <main className="container dashboard">
        <section className="welcome">
          <div>
            <div className="eyebrow">
              <i />
              YOUR PROJECT OVERVIEW
            </div>
            <h1>
              Good work starts
              <br />
              with <span>good tracking.</span>
            </h1>
            <p>Semua proyek, terorganisasi dalam satu tempat.</p>
          </div>

          <button className="btn primary add" onClick={openCreateForm}>
            ＋ Tambah proyek
          </button>
        </section>

        {apiError && <p className="error" role="status">{apiError}</p>}
        <DashboardSummary projects={projects} />
        <ProjectFilter
          query={query}
          onQueryChange={setQuery}
          status={status}
          onStatusChange={setStatus}
          category={category}
          onCategoryChange={setCategory}
          categories={categories}
          total={filteredProjects.length}
        />
        <ProjectList
          projects={filteredProjects}
          onDelete={deleteProject}
          onEdit={openEditForm}
        />

        <footer className="footer">
          <span>
            ● DevTrack <em>· Personal workspace</em>
          </span>
          <span>Built to keep your progress moving.</span>
        </footer>
      </main>

      {showForm && (
        <ProjectForm
          key={editingProject?.id ?? 'new'}
          initialProject={editingProject}
          onAdd={saveProject}
          onClose={closeForm}
        />
      )}
    </>
  );
}
