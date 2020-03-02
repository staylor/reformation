export default function template({
  html,
  css,
  ids = [],
  helmet,
  stylesheets = [],
  state = {},
  mainJSBundle,
  runtimeJSBundle,
  bundles,
  clientAssets,
}) {
  return `<!DOCTYPE html>
<html ${helmet.htmlAttributes.toString()}>
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
${helmet.title.toString()}${helmet.script.toString()}${helmet.meta.toString()}${helmet.link.toString()}
<link rel="stylesheet" href="https://use.typekit.net/tts4dcv.css" />
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.min.css" />
${stylesheets.map(sheet => `<link rel="stylesheet" href="${sheet}" />`).join('')}
${css && `<style data-lights-css="${JSON.stringify(ids)}">${css}</style>`}
${(bundles.styles || []).map(e => `<link rel="stylesheet" href="${e}">`).join('\n')}
</head>
<body ${helmet.bodyAttributes.toString()}>
  <main id="main">${html}</main>
  <script>window.__APOLLO_STATE__ = ${JSON.stringify(state).replace(/</g, '\\u003c')};</script>
${runtimeJSBundle ? `<script defer src="${runtimeJSBundle}"></script>` : ''}
${clientAssets['vendor.js'] ? `<script defer src="${clientAssets['vendor.js']}"></script>` : ''}
${bundles.scripts.map(e => `<script defer src="${e}"></script>`).join('\n')}
${mainJSBundle ? `<script defer src="${mainJSBundle}"></script>` : ''}
</body>
</html>`;
}
