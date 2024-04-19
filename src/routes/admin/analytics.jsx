
import { useLoaderData } from 'react-router-dom';
import { getProjectDetails, getProjectsList } from '../../backend_service';
import { List, ListItem, ListItemText } from '@mui/material';

export async function loader() {
  //TODO: this is very yucky! (analysis should be done server-side?)
  const projectsList = await getProjectsList();
  const projectsContent = [];

  for (let i = 0; i < projectsList.length; i++) {
    const details = await getProjectDetails(projectsList[i].id);
    projectsContent.push(details);
  }

  /* Compute analytics to return */
  const numberOfProjects = projectsList.length;
  const averageIntroLength = projectsList.reduce(
    (prev, cur) =>
      prev + cur.intro.length, 0
  ) / numberOfProjects;
  
  const averageDescriptionLength = projectsContent.reduce(
    (prev, cur) =>
      prev + cur.description.split(' ').length, 0
  ) / numberOfProjects;
  
  return { numberOfProjects, averageIntroLength, averageDescriptionLength };
}

export default function AnalyticsPage() {
  const { numberOfProjects,
    averageIntroLength, averageDescriptionLength
  } = useLoaderData();

  return (
    <List>
      <ListItem>
        <ListItemText>
          {numberOfProjects} projets dans la base de données
        </ListItemText>  
      </ListItem>
      <ListItem>
        <ListItemText>
          Moyenne de {averageIntroLength} caractères dans une introduction
        </ListItemText>  
      </ListItem>
      <ListItem>
        <ListItemText>
          Moyenne de {averageDescriptionLength} mots dans une description
        </ListItemText>  
      </ListItem>
    </List>
  );
}