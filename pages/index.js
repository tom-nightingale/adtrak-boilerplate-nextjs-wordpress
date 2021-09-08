import { getHomepageData } from '@/lib/api'
import Layout from '@/components/Layout'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Container from '@/components/Container'
import Seo from '@/components/seo'
import Image from 'next/image'
import { motion } from 'framer-motion'


export default function Home({ page }) {  
  
  const pageData = page.page;
  const createFullPostMarkup = () => {
      return { __html: `<h1>${pageData.title}</h1>${ pageData.content }` }
  }
  
  return (
    
    <Layout>
        
        <Seo seo={pageData.seo} />

        <Header />

        <motion.div 
          key="homepage"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{duration: .25}}
        >

          <div className="relative w-full overflow-hidden min-h-75">
            <Image 
              src={pageData.featuredImage.node.sourceUrl}
              alt={pageData.title}
              layout="fill"
              objectFit="cover"
              className=""
            />
          </div>            

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

        <Footer />

    </Layout>

  )
}

export async function getStaticProps({ preview = false }) {
  const page = await getHomepageData(preview)

  return {
    props: {
      page,
      preview 
    },
  }
}
