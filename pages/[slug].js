import Head from 'next/head'
import { CMS_NAME } from '../lib/constants'
import { getAllPagesBySlug, getPrimaryNavigation } from '../lib/api'
import Layout from '../components/layout'
import Header from '../components/header'
import Footer from '../components/footer'
import Container from '../components/container'
import FancyLink from '../components/fancyLink'
import { motion } from 'framer-motion'

export default function Home({ fullMenu }) {
  // console.log(fullMenu);

  return (

    <Layout>

        <Head>
            <link rel="icon" href="/favicon.ico" />
            <title>{CMS_NAME}</title>
            <meta
            name="description"
            content="nextJS boilerplate"
            />
            <meta name="og:title" content="Website Title" />
            <meta name="twitter:card" content="summary_large_image" />
        </Head>

        <Header />

        <motion.div 
          key="homepage"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{duration: .25}}
        >
          <p>Internal page</p>

        </motion.div>

        <Container>

          <FancyLink destination="/" a11yText="Aria Label" extraClasses="bg-red-500" label="Go to something page" />

        </Container>

        <Footer />

    </Layout>

  )
}

export async function getStaticProps({ preview = false }) {
  const fullMenu = await getPrimaryNavigation(preview)
  return {
    props: {fullMenu, preview},
  }
}

export async function getStaticPaths() {
  const allPages = await getAllPagesBySlug()

  return {
    paths: allPages.edges.map(({ node }) => `/${node.slug}`) || [],
    fallback: true,
  }
}
