import { getAllPosts, getHomepageData } from '@/lib/api'
import Layout from '@/components/core/layout'
import Seo from '@/components/core/seo'
import Header from '@/components/core/header'
import Container from '@/components/container'
import Hero from '@/components/hero'
import Footer from '@/components/core/footer'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Aside from '@/components/aside'
import { CorporateContactJsonLd } from 'next-seo'


export default function Page({ page, posts }) {

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
            heading="Latest News"
          />         

          <Container>

            <div className="flex flex-col my-8 lg:flex-row lg:my-16 lg:space-x-12">

              <main className="lg:w-2/3">

                {posts.posts.length > 0 && 
                    <div className="flex flex-wrap">
                        {posts.posts.map((post, index) => {
                            return (
                              <div className="p-4">
                                <Link href={post.uri} key={index} >
                                  <a className="p-4 rounded-sm shadow-lg">
                                      {post.title}
                                  </a>
                                </Link>
                              </div>
                            )
                        })}                    
                    </div>
                }

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

  const posts = await getAllPosts();
  const page = await getHomepageData(preview);

  return {
    props: {
      page,
      preview,
      posts
    },
    revalidate: 10, // In seconds
  }
}