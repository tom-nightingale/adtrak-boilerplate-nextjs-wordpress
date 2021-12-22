import { getHomepageData } from '@/lib/api'
import Layout from '@/components/layout'
import Seo from '@/components/seo'
import Header from '@/components/header'
import Container from '@/components/container'
import Hero from '@/components/hero'
import Footer from '@/components/footer'
import { motion } from 'framer-motion'


export default function Home({ page }) {
  
  const createFullPostMarkup = () => {
      return { __html: `<h1>${page.title}</h1>${ page.content }` }
  }
  
  return (
    <>
    
    <Seo seo={page.seo} />    
    
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

              <aside className="bg-gray-100 lg:w-1/3">
                
              </aside>

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
