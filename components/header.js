import { useGlobalContext } from '../pages/_app'

import { useRouter } from 'next/router'
import Link from 'next/link'

import Container from '@/components/Container'
import MobileTopBar from '@/components/MobileTopBar'


export default function Header({  }) {
    const router = useRouter();
    const globalData = useGlobalContext();

    return (
        <>
            <MobileTopBar />

            <header className="pt-8 bg-white border-t-4 border-secondary lg:border-none lg:pt-0">

                <Container>
                    <div className="flex flex-wrap items-center">
                        <Link href="/">
                            <a className="block py-8">
                                <img src={globalData.siteOptions.siteLogo.mediaItemUrl} alt="Company Name" className="w-full max-w-40" />
                            </a>
                        </Link>
                        <a className="block ml-auto text-xl text-primary hover:text-secondary focus:text-secondary" href="#"><span className="hidden lg:inline">Call <span className="font-bold">Location</span> On </span><span className="font-bold">0800 000 0000</span></a>
                    </div>
                </Container>

                <div className="hidden border-t border-gray-300 lg:block">
                    <Container>
                        <nav id="menu-primary" role="navigation" className="xl:ml-auto xl:pl-8 md:w-full xl:flex-1 menu-primary" aria-label="Site Main Navigation">
                            <ul className="flex flex-wrap items-center xl:justify-end menu-primary-js">
                                {globalData.primaryNav.edges.map((item, key) => {
                                    if(!item.node.parentId) {
                                        return(
                                            <li className="" key={key}>    
                                                <Link href={`${item.node.path}`}>
                                                    <a className={`block px-5 py-5 text-sm lg:text-base xl:text-lg hover:text-secondary focus:text-secondary text-black ${ item.node.path !== '/' && `${router.asPath}/`.includes(`${item.node.path}`) ? 'bg-green-500' : ''} ${item.node.path == `${router.asPath}` ? 'bg-green-500' : '' }`}>
                                                        {item.node.label}
                                                    </a>
                                                </Link>
                                                {item.node.childItems.edges && 
                                                    <ul className="sub-menu">
                                                        {item.node.childItems.edges.map((child, childKey) => {
                                                            return(
                                                                <li className="" key={childKey}>
                                                                    <Link href={`${child.node.path}`}>
                                                                        <a className={`block px-5 py-5 text-sm lg:text-base xl:text-lg hover:text-secondary focus:text-secondary text-black ${`${child.node.path}` == `${router.asPath}/` ? 'bg-red-500' : '' }`}>
                                                                            {child.node.label}
                                                                        </a>
                                                                    </Link>
                                                                </li>
                                                            )
                                                        })}
                                                    </ul>
                                                }
                                            </li>
                                        )
                                    }
                                })}
                            </ul>
                        </nav>
                </Container>
                </div>
            </header>

        </>
    )
}