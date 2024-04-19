
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';

import MenuBookIcon from '@mui/icons-material/MenuBook';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import { deleteProject, getProjectsList } from '../../backend_service';
import { Link, useLoaderData } from 'react-router-dom';
import theme from '../../mui-theme';

export async function loader() {
  const projects = await getProjectsList();
  return { projects };
}

export default function ProjectList() {
  const { projects } = useLoaderData();
  return (
    <>
      <Button
        component={Link}
        variant='contained'
        to='/project/edit/new'
        sx={{ display: 'block', width:'60%', margin:'auto', textAlign: 'center' }}
      >
        Créer un nouveau projet
      </Button>
      {projects.length ? (
        <Stack>
          {projects.map((project) => (
            <Card
              key={`project_${project.id}`}
              sx={{ display: 'flex', width: '100%' }}
            >
              <CardMedia
                component='img'
                sx={{ maxWidth: 256, maxHeight: 100,  }}
                image={project.thumbnail_url}
                alt={`Photo du projet '${project.title}'`}
              />
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent>
                  <Typography style={theme.typography.h5}>
                    {project.title}
                  </Typography>
                  <Typography style={theme.typography.h7}>
                    {project.intro}
                  </Typography>
                </CardContent>
              </Box>
              <Box sx={{ ml: 'auto', alignContent: 'center' }}>
                <IconButton component={Link} to={`/project/${project.id}`}>
                  <MenuBookIcon />
                </IconButton>

                {/* TODO: these should be shown only when logged in */}
                <IconButton component={Link} to={`/project/edit/${project.id}`}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => {
                  if (window.confirm(
                    `Êtes-vous sûr de vouloir supprimer le projet ${project.title} ?`
                  )) {
                    deleteProject(project.id).then(window.location.reload());
                  }
                }}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Card>
          ))}
        </Stack>
      ) : (
        <p>Aucun projet dans la base de données.</p>
      )}
    </>
  );
}