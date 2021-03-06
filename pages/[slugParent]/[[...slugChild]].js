import { getPageByUri, getAllPages } from '@/lib/api'

import Seo from '@/components/core/seo'
import Layout from '@/components/core/layout'
import Header from '@/components/core/header'
import Footer from '@/components/core/footer'
import Container from '@/components/container'
import Aside from '@/components/aside'

import { motion } from 'framer-motion'

export default function Page({ page }) {
  
  const createFullPostMarkup = () => {
      return { __html: `<h1>${page.title}</h1>${ page.content }` }
  }

  return (

    <Layout>

        <Seo page={page} />
      
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
                
                {page.content &&
                  <article className="content" dangerouslySetInnerHTML={createFullPostMarkup()} />
                }

              </main>

              <Aside />

            </div>

          </Container>

        </motion.div>

        <Footer />

    </Layout>

  )
}

export async function getStaticProps({ params = {} } = {}) {

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
  const { pages } = await getAllPages();

  // Take all the pages and create path params. The slugParent will always be
  // the top level parent page, where the slugChild will be an array of the
  // remaining segments to make up the path or URI

  const paths = pages
  .filter(({ uri }) => typeof uri === 'string')
  .map(({ uri }) => {
    const segments = uri.split('/').filter((seg) => seg !== '');

    return {
      params: {
        slugParent: segments.shift(),
        slugChild: segments,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
}
