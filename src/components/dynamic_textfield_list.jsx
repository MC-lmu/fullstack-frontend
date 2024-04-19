import { useState } from 'react';
import { Box, Button, IconButton, Stack, TextField, Typography } from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';

import PropTypes from 'prop-types';

export default function DynamicTextfieldList({
  itemName,
  collectionName,
  addItemButtonLabel,
  itemFormPrefix,
  maxItemLength,
  maxItemsCount,
  initialArrayContents
}) {
  const [itemList, setItemList] = useState(initialArrayContents);

  const assertLen = (s) =>
    (maxItemLength !== -1 && s.length > maxItemLength)
      ? `Ce champ ne peut dépasser ${maxItemLength} caractères.`
      : null;

  const addBlankItem = () =>
    setItemList(itemList.concat(['']));

  const updateItem = (index, newValue) =>
    setItemList(itemList.map(
      (existingValue, i) => (i === index)
        ? newValue
        : existingValue
    ));

  const removeItem = (index) =>
    setItemList(itemList.filter(
      (_, i) => i !== index
    ));

  return (
    <Box sx={{ border: '1px dashed' }}>
      <Stack>
        <Typography variant='h5'>
          {collectionName}
        </Typography>
        {itemList.map((itemValue, itemIndex) =>
          <Box key={`dsl_item_${itemIndex}`}>
            <TextField
              required
              margin='dense'
              variant='standard'
              style={{ width: '85%'}}
              label={`${itemName} ${itemIndex+1}`}
              name={`${itemFormPrefix}_${itemIndex}`}
              value={itemValue}
              onChange={(e) => updateItem(itemIndex, e.target.value)}
              error={!!assertLen(itemValue)}
              helperText={assertLen(itemValue)}
            />
            <IconButton onClick={() => removeItem(itemIndex)}>
              <DeleteIcon />
            </IconButton>
          </Box>
        )}
        <Button
          disabled={itemList.length >= maxItemsCount}
          onClick={addBlankItem}
        >
          {`${addItemButtonLabel} (max. ${maxItemsCount})`}
        </Button>
      </Stack>
    </Box>
  );
}

DynamicTextfieldList.propTypes = {
  itemName: PropTypes.string,
  collectionName: PropTypes.string,
  addItemButtonLabel: PropTypes.string,
  itemFormPrefix: PropTypes.string,
  maxItemLength: PropTypes.number,
  maxItemsCount: PropTypes.number,
  initialArrayContents: PropTypes.arrayOf(PropTypes.string)
};