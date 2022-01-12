import { getPostByUri, getAllPosts } from '@/lib/api'
import Layout from '@/components/core/layout'
import Seo from '@/components/core/seo'
import Header from '@/components/core/header'
import Container from '@/components/container'
import Hero from '@/components/hero'
import Footer from '@/components/core/footer'
import { motion } from 'framer-motion'
import Link from 'next/link'


export default function Page({ post }) {

  const createFullPostMarkup = () => {
      return { __html: `<h1>${post.title}</h1>${ post.content }` }
  }

  return (
    <>

    <Seo page={post} />    

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
            image={post.featuredImage ? post.featuredImage.node.sourceUrl : null }
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


export async function getStaticProps({ params = {} } = {}) {

  const post = await getPostByUri(`/news/${params.slug}`);

  return {
    props: {
      post
    },
  }
}

export async function getStaticPaths() {
  const posts = await getAllPosts();

  return {
    paths: posts.posts.map((post) => post.uri),
    fallback: false,
  };
}