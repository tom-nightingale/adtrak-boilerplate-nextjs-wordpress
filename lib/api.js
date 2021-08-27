const API_URL = process.env.WORDPRESS_API_URL

async function fetchAPI(query, { variables } = {}) {
  const headers = { 'Content-Type': 'application/json' }

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
    throw new Error('Failed to fetch API')
  }
  return json.data
}



// Get global site information
export async function getGlobalOptions() {
  const data = await fetchAPI(`
  {
    allSettings {
      generalSettingsTitle
    }
    siteOptions{
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
    page(id: "28", idType: DATABASE_ID) {
      title
      content(format: RENDERED)
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
  return data;
}

export async function getPageData(id) {
  const data = await fetchAPI(`
    query getPageData($id: ID!) {
      page(id: $id, idType: URI) {
        title
        content
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


// Get all pages
export async function getAllPagesBySlug() {
  const data = await fetchAPI(`
    { 
      pages(first: 10000) {
        edges {
          node {
            slug
            children {
              edges {
                node {
                  slug
                }
              }
            }
          }
        }
      }
    }
  `)
  return data?.pages;
}

// Get all menu items
export async function getPrimaryNavigation() {
  const data = await fetchAPI(`
    {
      menu(id: "3", idType: DATABASE_ID) {
      id
      menuItems {
        edges {
          node {
            path
            label
            childItems {
              edges {
                node {
                  path
                  label
                }
              }
            }
          }
        }
      }
      }
    }
  `)
  return data?.menu
}

export async function getPreviewPost(id, idType = 'DATABASE_ID') {
  const data = await fetchAPI(
    `
    query PreviewPost($id: ID!, $idType: PostIdType!) {
      post(id: $id, idType: $idType) {
        databaseId
        slug
        status
      }
    }`,
    {
      variables: { id, idType },
    }
  )
  return data.post
}

export async function getAllPostsWithSlug() {
  const data = await fetchAPI(`
    {
      posts(first: 10000) {
        edges {
          node {
            slug
          }
        }
      }
    }
  `)
  return data?.posts
}

export async function getAllPostsForHome(preview) {
  const data = await fetchAPI(
    `
    query AllPosts {
      posts(first: 20, where: { orderby: { field: DATE, order: DESC } }) {
        edges {
          node {
            title
            excerpt
            slug
            date
            featuredImage {
              node {
                sourceUrl
              }
            }
            author {
              node {
                name
                firstName
                lastName
                avatar {
                  url
                }
              }
            }
          }
        }
      }
    }
  `,
    {
      variables: {
        onlyEnabled: !preview,
        preview,
      },
    }
  )

  return data?.posts
}

export async function getPostAndMorePosts(slug, preview, previewData) {
  const postPreview = preview && previewData?.post
  // The slug may be the id of an unpublished post
  const isId = Number.isInteger(Number(slug))
  const isSamePost = isId
    ? Number(slug) === postPreview.id
    : slug === postPreview.slug
  const isDraft = isSamePost && postPreview?.status === 'draft'
  const isRevision = isSamePost && postPreview?.status === 'publish'
  const data = await fetchAPI(
    `
    fragment AuthorFields on User {
      name
      firstName
      lastName
      avatar {
        url
      }
    }
    fragment PostFields on Post {
      title
      excerpt
      slug
      date
      featuredImage {
        node {
          sourceUrl
        }
      }
      author {
        node {
          ...AuthorFields
        }
      }
      categories {
        edges {
          node {
            name
          }
        }
      }
      tags {
        edges {
          node {
            name
          }
        }
      }
    }
    query PostBySlug($id: ID!, $idType: PostIdType!) {
      post(id: $id, idType: $idType) {
        ...PostFields
        content
        ${
          // Only some of the fields of a revision are considered as there are some inconsistencies
          isRevision
            ? `
        revisions(first: 1, where: { orderby: { field: MODIFIED, order: DESC } }) {
          edges {
            node {
              title
              excerpt
              content
              author {
                node {
                  ...AuthorFields
                }
              }
            }
          }
        }
        `
            : ''
        }
      }
      posts(first: 3, where: { orderby: { field: DATE, order: DESC } }) {
        edges {
          node {
            ...PostFields
          }
        }
      }
    }
  `,
    {
      variables: {
        id: isDraft ? postPreview.id : slug,
        idType: isDraft ? 'DATABASE_ID' : 'SLUG',
      },
    }
  )

  // Draft posts may not have an slug
  if (isDraft) data.post.slug = postPreview.id
  // Apply a revision (changes in a published post)
  if (isRevision && data.post.revisions) {
    const revision = data.post.revisions.edges[0]?.node

    if (revision) Object.assign(data.post, revision)
    delete data.post.revisions
  }

  // Filter out the main post
  data.posts.edges = data.posts.edges.filter(({ node }) => node.slug !== slug)
  // If there are still 3 posts, remove the last one
  if (data.posts.edges.length > 2) data.posts.edges.pop()

  return data
}
