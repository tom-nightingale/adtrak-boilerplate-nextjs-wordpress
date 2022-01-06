const API_URL = process.env.WORDPRESS_API_URL

export async function fetchAPI(query, { variables } = {}) {
  
  const headers = { 
    'Content-Type': 'application/json',
  }

  if (process.env.WORDPRESS_AUTH_REFRESH_TOKEN) {
    headers[
      'Authorization'
    ] = `Bearer ${process.env.WORDPRESS_AUTH_REFRESH_TOKEN}`
  }

  const res = await fetch(API_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      query,
      variables,
    }),
  })

  const json = await res.json()
  if (json.errors) {
    console.error(json.errors)
    throw new Error(json.errors)
  }
  return json.data
}

// async function fetchALD(query, { variables } = {}) {
//   const headers = { 'Content-Type': 'application/json' }

//   const res = await fetch('url goes here', {
//     method: 'POST',
//     headers,
//     body: JSON.stringify({
//       query,
//       variables,
//     }),
//   })

//   const json = await res.json()
//   if(json.errors) {
//     console.error(json.errors)
//     throw new Error('Failed to fetch ALD');
//   }
//   return json.data;
// }


export function mapPageData(page = {}) {
  const data = { ...page };

  if (data.featuredImage) {
    data.featuredImage = data.featuredImage.node;
  }

  if (data.parent) {
    data.parent = data.parent.node;
  }

  if (data.children) {
    data.children = data.children.edges.map(({ node }) => node);
  }

  return data;
}


// Get global site information
export async function getGlobalOptions() {
  const data = await fetchAPI(`
  {
    allSettings {
      generalSettingsTitle
      generalSettingsUrl
    }
    siteOptions {
      siteOptions {
        siteLogo {
          mediaItemUrl
          altText
        }
        siteEmailAddress
        siteAddress {
          addressLine
        }
        sitePostcode
        vatNumber
        registrationNumber
        defaultLocation
        prefixPhoneNumber
        defaultPhoneNumber
      }
    }
    marketing {
      marketing {
        schema
        metaTags
        googleAnalytics
      }
    }
  }  
  `)
  return data;
}

// Get Homepage Data
export async function getHomepageData() {
  const data = await fetchAPI(`
  {
    page(id: "64", idType: DATABASE_ID) {
      title
      content
      featuredImage {
        node {
          sourceUrl
        }
      }
      seo {
        title
        breadcrumbs {
            text
            url
        }
        canonical
        focuskw
        metaDesc
        metaKeywords
        metaRobotsNofollow
        metaRobotsNoindex
        opengraphAuthor
        opengraphDescription
        opengraphImage {
            sourceUrl
            altText
        }
        opengraphSiteName
        opengraphTitle
        opengraphUrl
      }
    }
  }
  `)
  return data.page;
}

// Get Page By uri (used for parent/child pages)
export async function getPageByUri(id) {
  const data = await fetchAPI(`
    query getPageData($id: ID!) {
      page(id: $id, idType: URI) {
        title
        content
        featuredImage {
          node {
            sourceUrl
          }
        }
        seo {
          breadcrumbs {
            text
            url
          }
          canonical
          focuskw
          metaDesc
          metaKeywords
          metaRobotsNofollow
          metaRobotsNoindex
          opengraphAuthor
          opengraphDescription
          opengraphImage {
            sourceUrl
          }
          opengraphSiteName
          opengraphTitle
          opengraphUrl
          title
          twitterDescription
          twitterImage {
            sourceUrl
          }
        }    
      }
    }`,
    {
      variables: { id },
    }
  )
  return data;
}

export async function getPostByUri(id) {
  const data = await fetchAPI(`
    query getPostData($id: ID!) {
      post(id: $id, idType: URI) {
        title
        content
        featuredImage {
          node {
            sourceUrl
          }
        }
        seo {
          breadcrumbs {
            text
            url
          }
          canonical
          focuskw
          metaDesc
          metaKeywords
          metaRobotsNofollow
          metaRobotsNoindex
          opengraphAuthor
          opengraphDescription
          opengraphImage {
            sourceUrl
          }
          opengraphSiteName
          opengraphTitle
          opengraphUrl
          title
          twitterDescription
          twitterImage {
            sourceUrl
          }
        }    
      }
    }`,
    {
      variables: { id },
    }
  )
  return data?.post;
}


// Get all Menus
export async function getAllMenus() {
  const data = await fetchAPI(
    `{
    primaryMenu: menus(where: {slug: "primary-menu"}) {
      edges {
        node {
          name
          slug
          menuItems {
            edges {
              node {
                path
                label
                parentId
                childItems {
                  edges {
                    node {
                      path
                      label
                      parentId
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    secondaryMenu: menus(where: {slug: "secondary-menu"}) {
      edges {
        node {
          name
          slug
          menuItems {
            edges {
              node {
                path
                label
                parentId
                childItems {
                  edges {
                    node {
                      path
                      label
                      parentId
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }`
  )
  return data;
}

// Get all Pages
export async function getAllPages() {
  const data = await fetchAPI(`
  {
    pages(first: 10000) {
      edges {
        node {
          children {
            edges {
              node {
                id
                slug
                uri
                ... on Page {
                  id
                  title
                }
              }
            }
          }
          content
          featuredImage {
            node {
              altText
              caption
              id
              sizes
              sourceUrl
              srcSet
            }
          }
          id
          menuOrder
          parent {
            node {
              id
              slug
              uri
              ... on Page {
                title
              }
            }
          }
          slug
          title
          uri
        }
      }
    }
  }
  `)
  const pages = data?.pages.edges.map(({ node = {} }) => node).map(mapPageData);

  return {
    pages,
  };
}

// Get all news posts
export async function getAllPosts() {
  const data = await fetchAPI(`
  {
    posts(first: 10000) {
      edges {
        node {
          content
          featuredImage {
            node {
              altText
              caption
              id
              sizes
              sourceUrl
              srcSet
            }
          }
          id
          slug
          title
          uri
        }
      }
    }
  }
  `)
  const posts = data?.posts.edges.map(({ node = {} }) => node).map(mapPageData);

  return {
    posts,
  };
}
