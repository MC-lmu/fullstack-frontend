import { useRouteError } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError();
  console.error('Error: ');
  console.error(error);

  var errmsg;
  if (error.status && error.statusText) {
    errmsg = `${error.status} - ${error.statusText}`;
  } else {
    errmsg = error.message;
  }

  return (
    <div id='error-page'>
      <h1>Something went wrong...</h1>
      <h2><i>{errmsg}</i></h2>
    </div>
  );
}