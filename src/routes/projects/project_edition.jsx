import { useLoaderData } from 'react-router-dom';
import { createProject, getProjectDetails, updateProject } from '../../backend_service';
import { Box, Button, IconButton, Stack, TextField } from '@mui/material';
import { useState } from 'react';
import { Form } from 'react-router-dom';

import SaveIcon from '@mui/icons-material/Save';
import { redirect } from 'react-router-dom';
import DynamicTextfieldList from '../../components/dynamic_textfield_list';

const MAX_TITLE_LENGTH = 65; //characters
const MAX_INTRO_LENGTH = 80; //characters
const MAX_DESCRIPTION_LENGTH = 250; //words
const MAX_KEYWORDS_NUM = 10;
const MAX_KEYWORD_LENGTH = 35; //characters
const MAX_ILLUST_NUM = 5;

export async function loader({ params }) {
  const { id } = params;

  var creating = (id === 'new');
  var projectDetails = null;
  if (!creating) {
    try {
      projectDetails = await getProjectDetails(id);
    } catch (e) {
      //Catch error if trying to edit a non-existent project
      if (e?.status === 404) {
        creating = true;
      } else {
        throw e;
      }
    }
  }
  return { creating, projectDetails };
}

export async function action({ request, params }) {
  const method = request.method;
  const formData = await request.formData();

  const keywords = [];
  for (let i = 0; i < MAX_KEYWORDS_NUM; i++) {
    const kw = formData.get(`keyword_${i}`);
    if (!kw)
      break;
    keywords.push(kw);    
  }

  const projectData = {
    'title': formData.get('title'),
    'short_description': formData.get('intro'),
    'full_description': formData.get('full_description'),
    'keywords': keywords
  };

  if (method == 'POST') { /* Creating a new project */
    const newProjectId = await createProject(projectData);
    return redirect(`/project/${newProjectId}`);
  } else { /* Updating existing project */
    console.log('updating project ' + params.id);
    await updateProject(params.id, projectData);  
    return redirect(`/project/${params.id}`);
  }
}

/**
 * Helper function returning empty project details if creating,
 * to avoid having two different code pathes all around.
 * @param {*} creating 
 * @param {*} projectDetails 
 * @returns 
 */
function unpackProjectDetails(creating, projectDetails) {
  if (!creating)
    return projectDetails;
  
  return {
    'title': '',
    'short_description': '',
    'full_description': '',
    'keywords': []
  };
}

export default function ProjectEditionPage() {
  const { creating, projectDetails } = useLoaderData();
  const prj = unpackProjectDetails(creating, projectDetails);

  const [title, setTitle] = useState(prj.title);
  const [intro, setIntro] = useState(prj.short_description);
  const [fullDescription, setFullDescription] = useState(prj.full_description);
  const [keywords, setKeywords] = useState(prj.keywords);

  //TODO: prompt user before leaving page,
  //in order to avoid data losses
  function chkStr(s, maxChrCnt) {
    return (s.length > maxChrCnt)
      ? `Ce champ ne peut dépasser ${maxChrCnt} caractères.`
      : null;
  }

  function fullDescriptionError() {
    return (fullDescription.split(' ').length > MAX_DESCRIPTION_LENGTH)
      ? `Ce champ ne peut contenir plus de ${MAX_DESCRIPTION_LENGTH} mots.`
      : null;
  }

  return (
    <Box>
      <Form
        method={creating ? 'POST' : 'PATCH'}
        style={{ margin: 'auto', width: '80%', textAlign: 'center'}}
      >
        <Stack>
          <TextField
            required
            fullWidth
            margin='dense'
            variant='filled'
            label='Titre du projet'
            name='title'
            value={title}
            error={!!chkStr(title, MAX_TITLE_LENGTH)}
            helperText={chkStr(title, MAX_TITLE_LENGTH)}
            onChange={(e) => setTitle(e.target.value)}
          />

          <TextField
            required
            fullWidth
            margin='dense'
            variant='filled'
            label='Courte description du projet'
            name='intro'
            value={intro}
            error={!!chkStr(intro, MAX_INTRO_LENGTH)}
            helperText={chkStr(intro, MAX_INTRO_LENGTH)}
            onChange={(e) => setIntro(e.target.value)}
          />

          <TextField
            required
            fullWidth
            margin='dense'
            variant='filled'
            label='Description complète du project'
            name='full_description'
            value={fullDescription}
            error={!!fullDescriptionError()}
            helperText={fullDescriptionError()}
            onChange={(e) => setFullDescription(e.target.value)}
          />

          <DynamicTextfieldList 
            itemName='Mot-clé'
            collectionName='Mots-clés du project'
            addItemButtonLabel='Ajouter un mot-clé'
            itemFormPrefix='keyword'
            maxItemLength={MAX_KEYWORD_LENGTH}
            maxItemsCount={MAX_KEYWORDS_NUM}
            initialArrayContents={prj.keywords}
          />

          <DynamicTextfieldList
            itemName="URL de l'image"
            collectionName="Images d'illustration"
            addItemButtonLabel="Ajouter une image d'illustration"
            maxItemsCount={MAX_ILLUST_NUM}
            maxItemLength={-1}
            initialArrayContents={[]}
          />

          <br />
          <Button variant='contained' type='submit' startIcon={<SaveIcon />}>
            {creating ? 'Enregister le projet'
              : 'Mettre à jour le projet'
            }
          </Button>
        </Stack>
      </Form>
      <br />

      <hr width='0%' />
      <h1 style={{textAlign: 'center'}}>Aperçu en direct:</h1>
      <hr width='60%' />
      <Box>
        <h1 style={{textAlign: 'center'}}>{title}</h1>
        <h2 style={{textAlign: 'center'}}><i>{intro}</i></h2>
        <p>{fullDescription}</p>
      </Box>
    </Box>
  );
}