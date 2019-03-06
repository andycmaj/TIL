const path = require(`path`);

const indexEntry = (index, tag, entry) => {
  if (!index[tag]) {
    index[tag] = [];
  }

  index[tag].push(entry);
};

// Implement the Gatsby API “createPages”. This is
// called after the Gatsby bootstrap is finished so you have
// access to any information necessary to programmatically
// create pages.
exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  const tilTemplate = path.resolve('./src/templates/TIL.js');
  const tagIndexTemplate = path.resolve('./src/templates/tagIndex.js');

  return graphql(
    `
      {
        allContentfulTil {
          edges {
            node {
              slug
              tags
            }
          }
        }
      }
    `
  ).then(result => {
    if (result.errors) {
      console.error(result.errors);
      throw new Error(result.errors[0]);
    }

    const entries = result.data.allContentfulTil.edges;
    const tagIndex = {};
    entries.forEach((entry, index) => {
      // Add this page to the tag index
      entry.node.tags.forEach(tag => {
        indexEntry(tagIndex, tag, entry.node);
      });

      // Create the actual entry page
      createPage({
        path: `/til/${entry.node.slug}`,
        component: tilTemplate,
        context: {
          slug: entry.node.slug,
        },
      });
    });

    Object.keys(tagIndex).forEach(tag => {
      createPage({
        path: `/tag/${tag}`,
        component: tagIndexTemplate,
        context: {
          tag: tag,
          pages: tagIndex[tag],
        },
      });
    });
  });
};

exports.onCreateNode = ({ node }) => {
  console.log(node.internal.type);
};
