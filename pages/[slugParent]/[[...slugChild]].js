import { getPageByUri, getAllPagesBySlug } from '@/lib/api'

import Seo from '@/components/seo'
import Layout from '@/components/layout'
import Header from '@/components/header'
import Footer from '@/components/footer'
import Container from '@/components/container'

import { motion } from 'framer-motion'

export default function Page({ page }) {
  
  const createFullPostMarkup = () => {
      return { __html: `<h1>${page.title}</h1>${ page.content }` }
  }

  return (

    <Layout>

      <Seo seo={page.seo} />
      
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

export async function getStaticProps({params}) {

  const { slugParent, slugChild } = params;

  // We can use the URI to look up our page and subsequently its ID, so
  // we can first contruct our URI from the page params
  let pageUri = `/${slugParent}/`;

  // We only want to apply deeper paths to the URI if we actually have
  // existing children
  if (Array.isArray(slugChild) && slugChild.length > 0) {
    pageUri = `${pageUri}${slugChild.join('/')}/`;
  }

  const { page } = await getPageByUri(pageUri);

  return {
    props: {
      page,
    },
  };
}

export async function getStaticPaths() {

  const allPages = await getAllPagesBySlug();
  
  const paths = allPages
    .filter(({ uri }) => typeof uri === 'string')
    .map(({ uri }) => {

      const segments = uri.split('/').filter((seg) => seg !== '/');
      return {
        params: {
          slugParent: segments.shift(),
          slugChild: segments,
        },
      };
  });

  return {
    paths,
    fallback: true,
  };
}
