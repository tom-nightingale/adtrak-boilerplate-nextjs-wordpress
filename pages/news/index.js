import { getAllPosts, getHomepageData } from '@/lib/api'
import Layout from '@/components/layout'
import Seo from '@/components/seo'
import Header from '@/components/header'
import Container from '@/components/container'
import Hero from '@/components/hero'
import Footer from '@/components/footer'
import { motion } from 'framer-motion'
import Link from 'next/link'


export default function Page({ page, posts }) {
    console.log(posts);

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
            heading="Latest News"
          />         

          <Container>

            <div className="flex flex-col my-8 lg:flex-row lg:my-16 lg:space-x-12">

              <main className="lg:w-2/3">

                {posts.posts.length > 0 && 
                    <div>
                        {posts.posts.map((post, index) => {
                            return (
                                <Link href={post.uri} key={index}>
                                <a>
                                    {post.title}
                                </a>
                                </Link>
                            )
                        })}                    
                    </div>
                }

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

  const posts = await getAllPosts();

  const page = await getHomepageData(preview);

  return {
    props: {
      page,
      preview,
      posts
    },
  }
}