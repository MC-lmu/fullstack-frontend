import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';
import MUITheme from './mui-theme';

/* Material UI */
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import Root from './routes/root';
import ProjectEditionPage, { loader as projectEditLoader, action as projectEditAction } from './routes/projects/project_edition';
import ProjectsListPage, { loader as projectsListLoader } from './routes/projects/projects_list';
import ProjectPage, { loader as projectLoader } from './routes/projects/project';
import LandingPage from './routes/landing';
import ErrorPage from './error-page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <LandingPage /> },
          {
            path: '/projects',
            element: <ProjectsListPage />,
            loader: projectsListLoader,
          },
          {
            path: '/project/edit/:id',
            element: <ProjectEditionPage />,
            loader: projectEditLoader,
            action: projectEditAction
          },
          {
            path: '/project/:id',
            element: <ProjectPage />,
            loader: projectLoader
          },
        ]
      }
    ]
  }
]
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={MUITheme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>,
);
