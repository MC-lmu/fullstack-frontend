import { Card, CardContent, CardMedia, Grid, IconButton, Tooltip, Typography } from '@mui/material';

import EmailIcon from '@mui/icons-material/Mail';
import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <Grid container sx={{ mt: '1%', ml: '2%', mr: '2%' }}>
      <Grid item xs={4}>
        <Card>
          <CardMedia component='img' image='/mch.jpg' height='250' />
          <CardContent sx={{ textAlign: 'center' }}>
            <Tooltip title='Envoyer un e-mail'>
              <IconButton
                component={Link}
                to='mailto:mathieu.choplain.etu@univ-lemans.fr'>
                <EmailIcon />
              </IconButton>
            </Tooltip>
            { /* TODO: bouton LinkedIn par exemple */ }
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={8}>
        <Typography variant='h5'>
          Bonjour !
          Je m&apos;appelle Mathieu CHOPLAIN.
        </Typography>
        <Typography>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Commodo ullamcorper a lacus vestibulum sed. Consectetur a erat nam at. Morbi tempus iaculis urna id volutpat lacus laoreet non curabitur. Accumsan tortor posuere ac ut consequat semper viverra nam. Diam vulputate ut pharetra sit amet aliquam id diam maecenas. Pharetra sit amet aliquam id diam maecenas ultricies mi. Proin sagittis nisl rhoncus mattis. Mauris pellentesque pulvinar pellentesque habitant.
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography>
          Eu scelerisque felis imperdiet proin. Venenatis a condimentum vitae sapien pellentesque habitant morbi tristique. Arcu risus quis varius quam quisque id diam. Nisl tincidunt eget nullam non nisi est sit amet. Viverra orci sagittis eu volutpat odio. Ut sem viverra aliquet eget sit amet tellus. Ac auctor augue mauris augue neque. Nulla aliquet enim tortor at auctor urna. Quam adipiscing vitae proin sagittis nisl rhoncus mattis. Eros donec ac odio tempor orci dapibus ultrices in iaculis. Sit amet nisl suscipit adipiscing bibendum. Tellus integer feugiat scelerisque varius morbi. Tristique nulla aliquet enim tortor at. Risus sed vulputate odio ut enim blandit volutpat.
          Habitant morbi tristique senectus et netus. Aliquet bibendum enim facilisis gravida. Quisque non tellus orci ac auctor augue. Viverra mauris in aliquam sem fringilla ut morbi tincidunt augue. Accumsan tortor posuere ac ut consequat semper viverra. Sit amet tellus cras adipiscing enim eu turpis. Felis imperdiet proin fermentum leo vel orci porta non pulvinar. Elementum curabitur vitae nunc sed velit dignissim sodales ut eu. At urna condimentum mattis pellentesque id nibh tortor id aliquet. Molestie a iaculis at erat. Egestas sed tempus urna et pharetra pharetra massa massa. At ultrices mi tempus imperdiet nulla malesuada. Sollicitudin nibh sit amet commodo nulla facilisi nullam. Morbi tincidunt augue interdum velit. Libero id faucibus nisl tincidunt eget nullam non. Ultrices tincidunt arcu non sodales neque. Orci nulla pellentesque dignissim enim. Tortor vitae purus faucibus ornare suspendisse. Est placerat in egestas erat imperdiet sed.
          Ut sem viverra aliquet eget sit amet tellus. Diam volutpat commodo sed egestas egestas fringilla. Habitasse platea dictumst quisque sagittis purus sit amet volutpat consequat. Mauris pellentesque pulvinar pellentesque habitant morbi tristique senectus. Felis eget velit aliquet sagittis id consectetur purus ut faucibus. Semper auctor neque vitae tempus quam. Nunc mi ipsum faucibus vitae aliquet. Nulla facilisi cras fermentum odio eu feugiat pretium. Turpis massa sed elementum tempus egestas sed sed risus pretium. Lorem donec massa sapien faucibus et molestie ac feugiat. Cursus vitae congue mauris rhoncus. Habitasse platea dictumst quisque sagittis purus. At elementum eu facilisis sed odio morbi quis commodo. Elementum facilisis leo vel fringilla est.
          Scelerisque felis imperdiet proin fermentum leo vel orci porta. In aliquam sem fringilla ut morbi tincidunt augue. Sapien pellentesque habitant morbi tristique senectus et netus et malesuada. Gravida neque convallis a cras. Adipiscing elit pellentesque habitant morbi tristique senectus et netus. Arcu bibendum at varius vel pharetra. At ultrices mi tempus imperdiet nulla malesuada. Hendrerit gravida rutrum quisque non tellus orci ac. Amet mattis vulputate enim nulla aliquet porttitor lacus luctus. Mi sit amet mauris commodo quis imperdiet massa tincidunt. Enim blandit volutpat maecenas volutpat blandit aliquam etiam erat velit. Orci porta non pulvinar neque. Auctor eu augue ut lectus arcu. Mi sit amet mauris commodo quis imperdiet massa. Sollicitudin aliquam ultrices sagittis orci.
        </Typography>
      </Grid>
    </Grid>
  );
}
