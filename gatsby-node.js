const path = require(`path`);

const addTagMapping = (map, tag, page) => {
  if (!map[tag]) {
    map[tag] = [];
  }

  map[tag].push(page);
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
              title
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

    const tils = result.data.allContentfulTil.edges;
    const tagMap = {};
    tils.forEach((til, index) => {
      til.node.tags.forEach(tag => {
        addTagMapping(tagMap, tag, til.node);
      });

      createPage({
        path: `/til/${til.node.slug}`,
        component: tilTemplate,
        context: {
          slug: til.node.slug,
        },
      });
    });

    Object.keys(tagMap).forEach(tag => {
      createPage({
        path: `/tag/${tag}`,
        component: tagIndexTemplate,
        context: {
          tag: tag,
          pages: tagMap[tag],
        },
      });
    });
  });
};

exports.onCreateNode = ({ node }) => {
  console.log(node.internal.type);
};
