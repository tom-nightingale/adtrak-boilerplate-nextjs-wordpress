export const seoFragment = `
    fragment seoFragment on seo {
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
`