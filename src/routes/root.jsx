import Container from '@mui/material/Container';
import { Outlet } from 'react-router-dom';
import Topbar from '../components/topbar';

export default function Root(props) {
  return (
    <Container disableGutters>
      <Topbar {...props}/>
      <Outlet />
    </Container>
  );
}