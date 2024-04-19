
import { Box, Chip, ImageList, ImageListItem, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';

export default function Project({
  title,
  intro,
  thumbnail,
  description,
  keywords,
  illustrations
}) {

  return (
    <Box>
      <Typography variant='h2' sx={{ textAlign: 'center' }}>{title}</Typography>
      <Typography variant='h4' sx={{ textAlign: 'center' }}><i>{intro}</i></Typography>
      <Box sx={{ textAlign: 'center' }}>
        <img src={thumbnail} width='80%' />
      </Box>
      {/* TODO: split paragraph on newlines */}
      <Typography variant='body1'>{description}</Typography>
      {illustrations.length > 0 &&
        <ImageList cols={illustrations.length}>
          {illustrations.map((illustrationURL, idx) =>
            <ImageListItem key={`img_${idx}`}>
              <img src={illustrationURL} />
            </ImageListItem>
          )}
        </ImageList>
      }
      {keywords.length > 0 &&
        <Stack direction='row'>
          <Typography>Mots-clés: </Typography>
          {
            keywords.map((kw, idx) => 
              <Chip
                variant='outlined'
                key={`kw_${idx}`}
                label={kw}
              />
            )
          }
        </Stack>
      }
    </Box>
  );
}

Project.propTypes = {
  title: PropTypes.string,
  intro: PropTypes.string,
  thumbnail: PropTypes.string,
  description: PropTypes.string,
  keywords: PropTypes.arrayOf(PropTypes.string),
  illustrations: PropTypes.arrayOf(PropTypes.string)
};