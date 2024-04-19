import { useLoaderData } from 'react-router-dom';
import { createProject, getProjectDetails, updateProject } from '../../backend_service';
import { Box, Button, Stack, TextField } from '@mui/material';
import { useState } from 'react';
import { Form } from 'react-router-dom';

import SaveIcon from '@mui/icons-material/Save';
import { redirect } from 'react-router-dom';
import DynamicTextfieldList, { unpackFormResults } from '../../components/dynamic_textfield_list';
import Project from '../../components/project';

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

  const keywords = unpackFormResults(formData, 'keyword', MAX_KEYWORDS_NUM);
  const illust_img = unpackFormResults(formData, 'illust_img', MAX_ILLUST_NUM);

  const projectData = {
    'title': formData.get('title'),
    'intro': formData.get('intro'),
    'description': formData.get('description'),
    'thumbnail_url': formData.get('thumbnail_url'),
    'keywords': keywords,
    'illustration_urls': illust_img,
  };

  console.log(JSON.stringify(projectData));

  if (method == 'POST') { /* Creating a new project */
    const newProjectId = await createProject(projectData);
    return redirect(`/project/${newProjectId}`);
  } else { /* Updating existing project */
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
    'intro': '',
    'description': '',
    'thumbnail_url': '',
    'keywords': [],
    'illustration_urls': []
  };
}

export default function ProjectEditionPage() {
  const { creating, projectDetails } = useLoaderData();
  const prj = unpackProjectDetails(creating, projectDetails);

  const [title, setTitle] = useState(prj.title);
  const [intro, setIntro] = useState(prj.intro);
  const [fullDescription, setFullDescription] = useState(prj.description);
  const [thumbnail, setThumbnail] = useState(prj.thumbnail_url);
  const [keywords, setKeywords] = useState(prj.keywords);
  const [illustrations, setIllustrations] = useState(prj.illustration_urls ?? []);

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
            label='URL de la miniature du projet'
            name='thumbnail_url'
            value={thumbnail}
            onChange={(e) => setThumbnail(e.target.value)}
          />

          <TextField
            required
            fullWidth
            multiline
            margin='dense'
            variant='filled'
            label='Description complète du project'
            name='description'
            value={fullDescription}
            error={!!fullDescriptionError()}
            helperText={fullDescriptionError()}
            onChange={(e) => setFullDescription(e.target.value)}
          />

          <DynamicTextfieldList
            itemList={keywords}
            setItemList={setKeywords}
            itemName='Mot-clé'
            collectionName='Mots-clés du project'
            collectionFormPrefix='keyword'
            addItemButtonLabel='Ajouter un mot-clé'
            maxItemsCount={MAX_KEYWORDS_NUM}
            maxItemLength={MAX_KEYWORD_LENGTH}
          />

          <DynamicTextfieldList
            itemList={illustrations}
            setItemList={setIllustrations}
            itemName="URL de l'image"
            collectionName="Images d'illustration"
            collectionFormPrefix='illust_img'
            addItemButtonLabel="Ajouter une image d'illustration"
            maxItemsCount={MAX_ILLUST_NUM}
            maxItemLength={-1}
            initialArrayContents={prj.illustration_urls ?? []}
          />

          <br />
          <Button
            type='submit'
            variant='contained'
            sx={{ marginBottom: 2 }}
            startIcon={<SaveIcon />}
          >
            {creating ? 'Enregister le projet'
              : 'Mettre à jour le projet'
            }
          </Button>
        </Stack>
      </Form>

      <hr width='85%'/>
      <h1 style={{textAlign: 'center'}}>Aperçu en direct:</h1>
      <hr width='60%'/>
      <Project
        title={title}
        intro={intro}
        thumbnail={thumbnail}
        description={fullDescription}
        keywords={keywords}
        illustrations={illustrations}
      />
    </Box>
  );
}