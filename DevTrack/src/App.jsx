import { useMemo, useState } from 'react';
import DashboardSummary from './components/DashboardSummary.jsx';
import ProjectFilter from './components/ProjectFilter.jsx';
import ProjectForm from './components/ProjectForm.jsx';
import ProjectList from './components/ProjectList.jsx';
import Navbar from './components/navbar.jsx';
import { categories, initialProjects } from './data/projects.js';

export default function App() {
  const [projects, setProjects] = useState(initialProjects);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('All');
  const [category, setCategory] = useState('All');
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

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

  function saveProject(project) {
    if (editingProject) {
      setProjects((currentProjects) =>
        currentProjects.map((currentProject) =>
          currentProject.id === editingProject.id
            ? { ...project, id: editingProject.id, createdAt: editingProject.createdAt }
            : currentProject,
        ),
      );
    } else {
      setProjects((currentProjects) => [project, ...currentProjects]);
    }

  }

  function deleteProject(projectId) {
    if (!window.confirm('Yakin ingin menghapus proyek ini?')) return;

    setProjects((currentProjects) =>
      currentProjects.filter((project) => project.id !== projectId),
    );
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
