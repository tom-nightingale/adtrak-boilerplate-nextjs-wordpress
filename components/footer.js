import { useGlobalContext } from '../pages/_app'

import Link from 'next/link'

import Container from '@/components/container'

export default function Footer({  }) {
    const globalData = useGlobalContext();

    return (
        <>
            <footer className="p-4 text-center bg-primary md:p-8 lg:px-0 lg:text-left">

                <Container>

                    <div className="flex-wrap lg:flex">

                        <div className="w-full mb-8 lg:w-3/12">
                            <Link href="/">
                                <a aria-label="Go to homepage" className="block lg:inline-block">
                                    <img className="w-full mx-auto max-w-40" src={globalData.siteOptions.siteLogo.mediaItemUrl} alt="Logo"/>
                                </a>
                            </Link>
                        </div>

                        <div className="w-full mb-8 lg:w-3/12">
                            <h6>Explore</h6>
                            <ul>
                                {globalData.primaryNav.edges.map((item, i) => {
                                    if(!item.node.parentId) {
                                        return(
                                            <li key={i}>
                                                <Link href={`${item.node.path}`}>
                                                    <a className="">
                                                        {item.node.label}
                                                    </a>
                                                </Link>
                                            </li>
                                        )
                                    }
                                })}                         
                            </ul>
                        </div>

                        <div className="w-full lg:w-1/2">
                            <p>Address: 
                                {globalData.siteOptions.siteAddress.map((line, i) => {
                                    return(
                                        <span className="block" key={i}>{line.addressLine}</span>
                                    )
                                })}
                            </p>
                            <p>Email: <a href={`mailto:${globalData.siteOptions.siteEmailAddress}`}>{globalData.siteOptions.siteEmailAddress}</a>
                            </p>
                            <p>{globalData.globalOptions.generalSettingsTitle} is a registered company in England.</p>

                                <p>Registered Number: {globalData.siteOptions.registrationNumber}</p>
                            
                                <p>VAT Number: {globalData.siteOptions.vatNumber}</p>

                            <p>&copy; {globalData.globalOptions.generalSettingsTitle} {new Date().getFullYear()}. All Rights Reserved</p>

                            <a className="block mx-auto max-w-32 adtrak" href="https://www.adtrak.co.uk/website-referral/" target="_blank" rel="noreferrer noopener">ADTRAK LOGO</a>
                        </div>

                    </div>

                </Container>

            </footer>

            <a id="back-top" className="fixed bottom-0 right-0 z-50 p-2 -mb-20 text-center transition-all duration-1000 bg-gray-500 opacity-0 rounded-xl hover:bg-gray-600" href="">
                <span className="text-sm text-black no-underline">
                    
                    <span className="block text-lg uppercase">Top</span>
                </span>
            </a>

            <div id="pixel-to-watch"></div>
        </>

    )
}