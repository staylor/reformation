const fetch = require('isomorphic-fetch');
const path = require('path');
const fs = require('fs');

const gqlHost = process.env.GQL_HOST || 'http://localhost:8084';
fetch(`${gqlHost}/graphql`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    variables: {},
    query: `
      {
        __schema {
          types {
            kind
            name
            possibleTypes {
              name
            }
          }
        }
      }
    `,
  }),
})
  .then(result => result.json())
  .then(result => {
    const possibleTypes = {};

    // eslint-disable-next-line
    result.data.__schema.types.forEach(supertype => {
      if (supertype.possibleTypes) {
        possibleTypes[supertype.name] = supertype.possibleTypes.map(subtype => subtype.name);
      }
    });

    const typesFile = path.join(__dirname, '..', 'src/apollo/possibleTypes.json');
    fs.writeFile(typesFile, JSON.stringify(possibleTypes), err => {
      if (err) {
        console.error('Error writing possibleTypes.json', err);
      } else {
        console.log('Fragment types successfully extracted!');
      }
    });
  });
