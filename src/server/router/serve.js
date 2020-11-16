import { renderToString } from 'react-dom/server';
import { extractCritical } from 'pretty-lights/server';
import { getDataFromTree } from 'react-apollo';
import { getBundles } from 'kyt-runtime/server';
import template from 'server/template';
import 'styles/inject';

export default async (req, res) => {
  const {
    app,
    client,
    stylesheets = [],
    mainJSBundle,
    runtimeJSBundle,
    modules = [],
    clientAssets,
  } = res.locals;

  try {
    await getDataFromTree(app);
  } catch (e) {
    // eslint-disable-next-line
    console.log(e);
  }

  const state = client.cache.extract();

  res.status(200);

  const { html, ids, css } = extractCritical(renderToString(app));

  const bundles = getBundles({ modules });
  bundles.scripts = bundles.scripts.filter(
    b => ![clientAssets['main.js'], clientAssets['admin.js'], clientAssets['login.js']].includes(b)
  );

  const response = template({
    html,
    ids,
    css,
    helmet: res.locals.helmetContext.helmet,
    stylesheets,
    state,
    mainJSBundle,
    runtimeJSBundle,
    clientAssets,
    bundles,
  });

  res.send(response);
};
