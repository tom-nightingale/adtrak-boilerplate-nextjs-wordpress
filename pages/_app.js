import '@/styles/main.css'
import { AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/router'
import { createContext, useContext } from 'react'
import { getGlobalOptions, getPrimaryNavigation } from '@/lib/api'

export const GlobalContext = createContext();

export function useGlobalContext() {
  return useContext(GlobalContext);
}

export default function App({ Component, pageProps, globalData }) {
    const router = useRouter()
    
    return (
        <GlobalContext.Provider value={globalData}>
            <AnimatePresence exitBeforeEnter>
                <Component {...pageProps} key={router.asPath} />
            </AnimatePresence>
        </GlobalContext.Provider>
    )
}

App.getInitialProps = async () => {
    // Get our WordPress data and Site Options
    const globalData = await getGlobalOptions();

    // Get our primary navigation items
    const primaryNavigation = await getPrimaryNavigation();

    return {
        globalData: { 
            globalOptions:  globalData.allSettings,
            siteOptions: globalData.siteOptions.siteOptions,
            primaryNav: primaryNavigation.menuItems,
        },
    }
}