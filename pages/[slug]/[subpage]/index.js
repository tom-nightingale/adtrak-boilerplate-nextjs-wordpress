import { getPageData, getAllPagesBySlug } from '@/lib/api'
import Seo from '@/components/seo'
import Layout from '@/components/Layout'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Container from '@/components/Container'

import { motion } from 'framer-motion'

export default function Page({ globalOptions, primaryMenu, page, params }) {
  
  const pageData = page.page;
  const createFullPostMarkup = () => {
      return { __html: `<h1>${pageData.title}</h1>${ pageData.content }` }
  }

  return (

    <Layout>
      
      <Seo seo={pageData.seo} />

      Child dynamic page

        <Header />

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

                aside
                
              </aside>

            </div>

          </Container>

        </motion.div>

        <Footer />

    </Layout>

  )
}

export async function getStaticProps({ params }) {
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
