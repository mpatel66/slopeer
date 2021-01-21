const { getIntrospectionQuery } = require('graphql');
const fetch = require('node-fetch');
const fs = require('fs');

fetch('http://localhost:4000/graphql', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    variables: {},
    query: getIntrospectionQuery({ descriptions: false })
  })
})
  .then(result => result.json())
  .then(({ data }) => {
    fs.writeFile('./schema.json', JSON.stringify(data), err => {
      if (err) {
        console.error('Writing failed:', err);
        return;
      }
      console.log('Schema written!');
    });
  });
