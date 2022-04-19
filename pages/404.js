import Head from 'next/head'

import Layout from '@/components/core/layout'
import Header from '@/components/core/header'
import Footer from '@/components/core/footer'
import Container from '@/components/container'
import FancyLink from '@/components/fancyLink'

import { motion } from 'framer-motion'

export default function ErrorPage() {

  return (

    <Layout>

      <Head>
          <link rel="icon" href="/favicon.ico" />
          <title>Nextjs boilerplate</title>
          <meta
          name="description"
          content="nextJS boilerplate"
          />
          <meta name="og:title" content="Website Title" />
          <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <Container>

        <h1>Error 404.</h1>

        <p>This page does not exist</p>

        <FancyLink destination="/" a11yText="Return to homepage" label="Return to homepage" extraClasses="" />

      </Container>
      
      {/* <Footer /> */}

    </Layout>
  )
}
