import { renderToString } from 'react-dom/server';
import { extractCritical } from 'emotion-server';
import { getDataFromTree } from 'react-apollo';
// eslint-disable-next-line
import template from 'server/template';
import injectStyles from 'styles/inject';

export default async (req, res) => {
  const { app, client, stylesheets = [], assets = {} } = res.locals;

  try {
    injectStyles();

    await getDataFromTree(app);
  } catch (e) {
    // eslint-disable-next-line
    console.log(e);
  }

  const state = client.cache.extract();

  res.status(200);

  const { html, ids, css } = extractCritical(renderToString(app));

  const response = template({
    html,
    ids,
    css,
    helmet: res.locals.helmetContext.helmet,
    stylesheets,
    state,
    assets,
  });

  res.send(response);
};
