import { getGlobalOptions, getPrimaryNavigation, getPageData, getAllPagesBySlug } from '@/lib/api'
import Layout from '@/components/layout'
import Header from '@/components/header'
import Footer from '@/components/footer'
import Container from '@/components/container'
import Seo from '@/components/seo'
import { motion } from 'framer-motion'

export default function Page({ globalOptions, primaryMenu, page, params }) {
  console.log(params);
  console.log(page);
  
  const pageData = page.page;
  const createFullPostMarkup = () => {
      return { __html: `<h1>${pageData.title}</h1>${ pageData.content }` }
  }

  return (

    <>

      <Seo seo={pageData.seo} />

      <Layout>

        Child dynamic page

          <Header navItems={primaryMenu} logoUrl={globalOptions.siteOptions.siteOptions.siteLogo.mediaItemUrl} />

          <motion.div 
            key="homepage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{duration: .25}}
          >

            <Container>

              <div className="flex flex-col my-8 lg:flex-row lg:my-16 lg:space-x-12">

                <main className="lg:w-2/3">

                  <article className="content" dangerouslySetInnerHTML={createFullPostMarkup()} />

                </main>

                <aside className="bg-gray-100 lg:w-1/3">

                  
                  
                </aside>

              </div>

            </Container>

          </motion.div>

          <Footer globalOptions={globalOptions} navItems={primaryMenu} />

      </Layout>

    </>

  )
}

export async function getStaticProps({ params }) {
  const globalOptions = await getGlobalOptions()
  const primaryMenu = await getPrimaryNavigation()
  const page = await getPageData(`${params.slug}/${params.subpage}`);

  return {
    props: {globalOptions, primaryMenu, page, params},
  }
}

export async function getStaticPaths() {
  const allPages = await getAllPagesBySlug();
  return {
    paths: allPages.edges.map(({ node }) => `/${node.slug}/${node.children.edges.slug}`) || [],
    fallback: true,
  }
}
