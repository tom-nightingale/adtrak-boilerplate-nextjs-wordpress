import { createContext, useContext } from 'react'
import { getGlobalOptions, getPrimaryNavigation } from '@/lib/api'

const GlobalContext = createContext()

export function useGlobalContext() {
  return useContext(GlobalContext);
}

function GlobalProvider({ children }) {
    return(
        <GlobalContext.Provider value={something}>
            {children}
        </GlobalContext.Provider>
    )
 }

export async function getInitialProps() {
  //Get our WordPress data and Site Options
  const globalData = await getGlobalOptions();

  // Get our primary navigation items
  const primaryNavigation = await getPrimaryNavigation();

  return {
    props: {
      something: 'something',
      globalData: { 
        something: 'something',
        globalOptions:  globalData.allSettings,
        siteOptions: globalData.siteOptions.siteOptions,
        primaryNav: primaryNavigation.menuItems,
      },
    }
  }

}


//  GlobalProvider.getInitialProps = async () => {
//    // Get our WordPress data and Site Options
//     const globalData = await getGlobalOptions();

//     // Get our primary navigation items
//     const primaryNavigation = await getPrimaryNavigation();

//     return {
//         globalData: { 
//           something: 'something',
//           globalOptions:  globalData.allSettings,
//           siteOptions: globalData.siteOptions.siteOptions,
//           primaryNav: primaryNavigation.menuItems,
//         },
//     }
//  }

export default GlobalProvider;