
const API_ROOT_URI = 'http://localhost:3000/api/v1';
const PROJECTS_API_URI = `${API_ROOT_URI}/projects`;

async function BadBackendResponseError(resp) {
  const errmsg = (await resp.json()).message;
  const err = Error(`Backend returned error ${resp.status} (message: ${errmsg || 'none'})`);    
  return err;
}

async function fetchBackend(URI, options) {
  if (!options) options = {};
  if (!options.headers) options.headers = {};

  options.headers['Accept'] = 'application/json';
  options.headers['Content-Type'] = 'application/json';

  const response = await fetch(URI, options);
  if (!response.ok) {
    throw BadBackendResponseError(response);
  }
  return await response.json();
}

/**
 * Send a request expecting no content in response to backend.
 * @param {*} URI 
 * @param {*} options 
 */
async function pushToBackend(URI, options) {
  if (!options.headers) options.headers = {};
  options.headers['Content-Type'] = 'application/json';

  const response = await fetch(URI, options);
  if (!response.ok) {
    throw BadBackendResponseError(response);
  }
  return response;
}

export async function getProjectsList() {
  return fetchBackend(PROJECTS_API_URI);
}

export async function getProjectDetails(projectId) {
  const ENDPOINT_URI = `${PROJECTS_API_URI}/${projectId}`;
  return fetchBackend(ENDPOINT_URI);
}

export async function createProject(projectContent) {
  const ENDPOINT_URI = `${PROJECTS_API_URI}/create`;
  return (await fetchBackend(ENDPOINT_URI, {
    method: 'POST',
    body: JSON.stringify(projectContent)
  })).id;
}

export async function updateProject(projectId, projectFieldsToUpdate) {
  const ENDPOINT_URI = `${PROJECTS_API_URI}/${projectId}`;
  return pushToBackend(ENDPOINT_URI, {
    method: 'PATCH',
    body: JSON.stringify(projectFieldsToUpdate)
  });
}

export async function deleteProject(projectId) {
  const ENDPOINT_URI = `${PROJECTS_API_URI}/${projectId}`;
  return pushToBackend(ENDPOINT_URI, {
    method: 'DELETE',
  });
}