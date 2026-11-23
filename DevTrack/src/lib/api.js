const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';

async function request(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  });
  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(body.message ?? `Request gagal (${response.status})`);
  }
  return response.status === 204 ? null : response.json();
}

export const projectsApi = {
  list: () => request('/projects'),
  create: (project) => request('/projects', { method: 'POST', body: JSON.stringify(project) }),
  update: (id, project) => request(`/projects/${id}`, { method: 'PATCH', body: JSON.stringify(project) }),
  remove: (id) => request(`/projects/${id}`, { method: 'DELETE' }),
};
