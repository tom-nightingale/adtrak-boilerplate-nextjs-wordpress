import '@/styles/main.css'
import { AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { createContext, useContext } from 'react'
import { getGlobalOptions, getAllMenus } from '@/lib/api'
import * as gtag from '@/lib/gtag'
import * as fbq from '@/lib/fpixel'

import Script from 'next/script'

export const GlobalContext = createContext();
export function useGlobalContext() {
  return useContext(GlobalContext);
}

export default function App({ Component, pageProps, globalData }) {
    const router = useRouter();

    // Detect page view changes and log with Google Analytics
    useEffect(() => {
        fbq.pageview() // Needed for the first page load

        const handleRouteChange = (url) => {
            gtag.pageview(url);
            fbq.pageview();
        }
        router.events.on('routeChangeComplete', handleRouteChange)
        return () => {
            router.events.off('routeChangeComplete', handleRouteChange)
        }
    }, [router.events])
    
    return (
        <GlobalContext.Provider value={globalData}>
            <AnimatePresence exitBeforeEnter>
                <Component {...pageProps} key={router.asPath} />
            </AnimatePresence>
            {/* Global Site Script (gtag.js) - Google Analytics */}
                <Script
                    strategy="afterInteractive"
                    src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
                />
                <Script
                    key="gtag"
                    id="gtag-init"
                    strategy="afterInteractive"
                    dangerouslySetInnerHTML={{
                    __html: `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', '${gtag.GA_TRACKING_ID}', {
                        page_path: window.location.pathname,
                        });
                    `,
                    }}
                />

                {/* Global Site Script - Facebook Pixel */}
                <Script
                    key="fbPixel"
                    strategy="afterInteractive"
                    dangerouslySetInnerHTML={{
                    __html: `
                        !function(f,b,e,v,n,t,s)
                        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                        n.queue=[];t=b.createElement(e);t.async=!0;
                        t.src=v;s=b.getElementsByTagName(e)[0];
                        s.parentNode.insertBefore(t,s)}(window, document,'script',
                        'https://connect.facebook.net/en_US/fbevents.js');
                        fbq('init', ${fbq.FB_PIXEL_ID});
                    `,
                    }}
                />

                {/* Global Site Script - CTM Script */}
                <Script
                    key="ctm"
                    strategy="afterInteractive"
                    id="ctm-js"
                    src="https://377715.tctm.co/t.js"
                />
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