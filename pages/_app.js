import '@/styles/main.css'
import { AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/router'
import { createContext, useContext } from 'react'
import { getGlobalOptions, getAllMenus } from '@/lib/api'

export const GlobalContext = createContext();
export function useGlobalContext() {
  return useContext(GlobalContext);
}

export default function App({ Component, pageProps, globalData }) {
    const router = useRouter();
    
    return (
        <GlobalContext.Provider value={globalData}>
            <AnimatePresence exitBeforeEnter>
                <Component {...pageProps} key={router.asPath} />
            </AnimatePresence>
        </GlobalContext.Provider>
    )
}

App.getInitialProps = async () => {
    // Get our WordPress data, siteOptions and Marketing options
    const globalData = await getGlobalOptions();

    // Get our primary and secondary navigation objedcts
    const globalMenus = await getAllMenus();

    return {
        globalData: { 
            globalOptions:  globalData.allSettings,
            siteOptions: globalData.siteOptions.siteOptions,
            marketing: globalData.marketing.marketing,
            primaryMenu: globalMenus.primaryMenu.edges[0].node.menuItems.edges,
            secondaryMenu: globalMenus.secondaryMenu.edges[0].node.menuItems.edges,
        },
    }
}