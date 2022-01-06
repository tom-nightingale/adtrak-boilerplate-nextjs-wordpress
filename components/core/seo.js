import Head from "next/head"
import { useGlobalContext } from '@/pages/_app'

export default function SEO({ page }) {
    const globalData = useGlobalContext();

    return (
        <Head>
            <meta charSet="UTF-8" />
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name='robots' content='index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' />
            <title>{page.seo.title}</title>
            <meta name="description" content={page.seo.metaDesc} />
            <link rel="canonical" href={page.seo.canonical} />
            <meta property="og:locale" content="en_GB" />
            <meta property="og:type" content="website" />
            <meta property="og:title" content={page.seo.opengraphTitle} />
            <meta property="og:description" content={page.seo.openGraphDescription} />
            <meta property="og:url" content={page.seo.opengraphUrl} />
            <meta property="og:site_name" content={page.seo.opengraphSiteName} />
            {page.seo.opengraphImage &&
                <meta name="twitter:card" content={page.seo.opengraphImage.sourceUrl} />
            }
            <script>{globalData.marketing.schema}</script>
            <script>{globalData.marketing.metaTags}</script>
            <script>{globalData.marketing.googleAnalytics}</script>
            {/* <script type="application/ld+json">{"@context":"https://schema.org","@graph":[{"@type":"WebSite","@id":"http://adtrak-next.vm/#website","url":"http://adtrak-next.vm/","name":"Adtrak Next","description":"Adtrak Next Boilerplate","potentialAction":[{"@type":"SearchAction","target":{"@type":"EntryPoint","urlTemplate":"http://adtrak-next.vm/?s={search_term_string}"},"query-input":"required name=search_term_string"}],"inLanguage":"en-GB"},{"@type":"CollectionPage","@id":"http://adtrak-next.vm/#webpage","url":"http://adtrak-next.vm/","name":"Adtrak Next - Adtrak Next Boilerplate","isPartOf":{"@id":"http://adtrak-next.vm/#website"},"description":"Adtrak Next Boilerplate","breadcrumb":{"@id":"http://adtrak-next.vm/#breadcrumb"},"inLanguage":"en-GB","potentialAction":[{"@type":"ReadAction","target":["http://adtrak-next.vm/"]}]},{"@type":"BreadcrumbList","@id":"http://adtrak-next.vm/#breadcrumb","itemListElement":[{"@type":"ListItem","position":1,"name":"Home"}]}]}</script> */}
            <link rel='dns-prefetch' href='//s.w.org' />
        </Head>
    )
}
