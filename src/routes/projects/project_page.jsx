import { useLoaderData } from 'react-router-dom';

import { getProjectDetails } from '../../backend_service';
import Project from '../../components/project';

export async function loader({ params }) {
  const project = await getProjectDetails(params.id);
  return { project };
}

export default function ProjectPage() {
  const { project } = useLoaderData();
  return (
    <Project
      title={project.title}
      intro={project.intro}
      thumbnail={project.thumbnail_url}
      description={project.description}
      keywords={project.keywords}
      illustrations={project.illustration_urls}
    />
  );
}