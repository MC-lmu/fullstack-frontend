
const API_ROOT_URI = 'http://localhost:3000/api/v1';
const API_PROJECTS_URI = `${API_ROOT_URI}/projects/`;

async function getAtURI(URI) {
  return (await fetch(URI)).json();
}

export async function getProjectsList() {
  return getAtURI(API_PROJECTS_URI);
}

export async function getProjectDetails(projectId) {
  if (!projectId) {
    console.error('NO PROJECT ID!!');
  }
  return getAtURI(`${API_PROJECTS_URI}/${projectId}`);
}