// @flow
type Template = {
  html: string,
  css: string,
  ids: string[],
  helmet: any,
  stylesheets: string[],
  state: {},
  assets: {
    manifestJSBundle?: string,
    vendorJSBundle?: string,
    mainJSBundle?: string,
  },
};

export default function template({
  html,
  css,
  ids = [],
  helmet,
  stylesheets = [],
  state = {},
  assets = {},
}: Template): string {
  return `<!DOCTYPE html>
<html ${helmet.htmlAttributes.toString()}>
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
${helmet.title.toString()}${helmet.script.toString()}${helmet.meta.toString()}${helmet.link.toString()}
<link rel="stylesheet" href="https://use.typekit.net/tts4dcv.css" />
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.min.css" />
${stylesheets.map(sheet => `<link rel="stylesheet" href="${sheet}" />`).join('')}
${css && `<style>${css}</style>`}
<script>window.__emotion = ${JSON.stringify(ids)};</script>
</head>
<body ${helmet.bodyAttributes.toString()}>
  <main id="main">${html}</main>
  <script>window.__APOLLO_STATE__ = ${JSON.stringify(state).replace(/</g, '\\u003c')};</script>
${assets.manifestJSBundle ? `<script defer src="${assets.manifestJSBundle}"></script>` : ''}
${assets.vendorJSBundle ? `<script defer src="${assets.vendorJSBundle}"></script>` : ''}
${assets.mainJSBundle ? `<script defer src="${assets.mainJSBundle}"></script>` : ''}
</body>
</html>`;
}
