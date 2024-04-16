import { Link, useLoaderData } from 'react-router-dom';

import { getProjectDetails } from '../../backend_service';

export async function loader({ params }) {
  const project = await getProjectDetails(params.id);
  return { project };
}

export default function Project() {
  const { project } = useLoaderData();
  return (
    <>
      <img src="/gcph1024.png" width='256' />
      <h1>{project.title}</h1>
      <p>{project.full_description}</p>
    </>
  );
}