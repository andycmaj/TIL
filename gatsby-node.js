const _ = require(`lodash`);
const Promise = require(`bluebird`);
const path = require(`path`);
const slash = require(`slash`);

// Implement the Gatsby API “createPages”. This is
// called after the Gatsby bootstrap is finished so you have
// access to any information necessary to programmatically
// create pages.
exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  const tilTemplate = path.resolve('./src/templates/TIL.js');
  return graphql(
    `
      {
        allContentfulTil {
          edges {
            node {
              slug
            }
          }
        }
      }
    `
  ).then(result => {
    if (result.errors) {
      console.error(result.errors);
      reject(result.errors);
    }

    const tils = result.data.allContentfulTil.edges;
    tils.forEach((til, index) => {
      createPage({
        path: `/til/${til.node.slug}`,
        component: tilTemplate,
        context: {
          slug: til.node.slug,
        },
      });
    });
  });
};

exports.onCreateNode = ({ node }) => {
  console.log(node.internal.type);
};
