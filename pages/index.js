import { getHomepageData } from '@/lib/api'
import Layout from '@/components/core/layout'
import Seo from '@/components/core/seo'
import Header from '@/components/core/header'
import Container from '@/components/container'
import Hero from '@/components/hero'
import Aside from '@/components/aside'
import Footer from '@/components/core/footer'
import { motion } from 'framer-motion'

export default function Home({ page }) {  
  
  const createFullPostMarkup = () => {
      return { __html: `<h1>${page.title}</h1>${ page.content }` }
  }
  
  return (
    <>
    
    <Seo page={page} />
    
    <Layout> 

        <Header />

        <motion.div 
          key="homepage"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{duration: .25}}
        >

          <Hero 
            image={page.featuredImage.node.sourceUrl}
            heading={page.title}
          />         

          <Container>

            <div className="flex flex-col my-8 lg:flex-row lg:my-16 lg:space-x-12">

              <main className="lg:w-2/3">

                <article className="content" dangerouslySetInnerHTML={createFullPostMarkup()} />

              </main>

              <Aside />

            </div>

          </Container>

          <Footer />

        </motion.div>

    </Layout>

    </>

  )
}

export async function getStaticProps({ preview = false }) {
  
  const page = await getHomepageData(preview);

  return {
    props: {
      page,
      preview
    },
  }
}
