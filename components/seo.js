import { NextSeo } from "next-seo"

export default function SEO({ seo }) {
    return(
        <NextSeo
            title={seo.title}
            description={seo.metaDesc}
            canonical={seo.canonical}
        />
    )
}
