import Head from 'next/head'
import Script from 'next/script'
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
            <Script
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: globalData.marketing.schema,
                }}
            />
            <Script
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: globalData.marketing.googleAnalytics,
                }}
            />
            {globalData.marketing.metaTags}
            <link rel='dns-prefetch' href='//s.w.org' />
        </Head>
    )
}
