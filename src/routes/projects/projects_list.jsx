
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Typography,

  Button
} from '@mui/material';

import MenuBookIcon from '@mui/icons-material/MenuBook';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import { getProjectsList } from '../../backend_service';
import { Link, useLoaderData } from 'react-router-dom';
import theme from '../../mui-theme';

export async function loader() {
  const projects = await getProjectsList();
  return { projects };
}

export default function ProjectList() {
  const { projects } = useLoaderData();
  return projects.length ? (
    <Grid container>
      <Button component={Link} to='/project/edit/new'>
        DEBUG: create project
      </Button>
      {projects.map((project) => (
        <Card
          key={`project_${project.id}`}
          sx={{ display: 'flex', width: '100%' }}
        >
          <CardMedia
            component='img'
            sx={{ maxWidth: 256, maxHeight: 100,  }}
            image="/gcph1024.png"
            alt={`Photo du projet '${project.title}'`}
          />
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <CardContent>
              <Typography style={theme.typography.h5}>
                {project.title}
              </Typography>
              <Typography style={theme.typography.h7}>
                {project.short_description}
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
            <IconButton onClick={(e) => alert(e)}>
              <DeleteIcon />
            </IconButton>
          </Box>
        </Card>
      ))}
    </Grid>
  ) : (
    <p>Aucun projet dans la base de données.</p>
  );
}