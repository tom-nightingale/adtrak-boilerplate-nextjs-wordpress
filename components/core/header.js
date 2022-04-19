import { useGlobalContext } from '@/pages/_app'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { FiChevronDown } from "react-icons/fi";
import Container from '@/components/container'
import MobileTopBar from '@/components/mobileTopBar'
import PhoneNumber from '@/components/phoneNumber'


export default function Header({  }) {
    const router = useRouter();
    const globalData = useGlobalContext();

    return (
        <>
            <MobileTopBar globalData={globalData} />

            <header className="pt-8 bg-white border-t-4 border-secondary lg:border-none lg:pt-0">

                <div className="hidden bg-primary top-bar lg:block">

                    <Container>

                        <nav id="menu-secondary" className="container hidden menu lg:block" aria-labelledby="secondary-navigation">
                            <span className="sr-only" id="secondary-navigation">Secondary Navigation</span>
                            <ul className="flex flex-wrap justify-center w-full menu-secondary">
                                {globalData.secondaryMenu.map((item, key) => {
                                    if(!item.node.parentId) {
                                        return(
                                            <li key={key} className="">
                                                <Link href={`${item.node.path}`}>
                                                    <a className="relative block p-4 text-gray-500 hover:text-black focus:text-black">
                                                        {item.node.label}
                                                        {item.node.childItems.edges.length > 0 && 
                                                            <span className="absolute bottom-0 transform -translate-x-1/2 left-1/2">
                                                                <FiChevronDown />
                                                            </span>
                                                        }
                                                    </a>
                                                </Link>
                                                {item.node.childItems.edges.length > 0 && 
                                                    <ul className="sub-menu">
                                                        {item.node.childItems.edges.map((child, childKey) => {
                                                            return (
                                                            <li key={childKey} className="">
                                                                <Link href={`${child.node.path}`}>
                                                                    <a className="block p-4 text-gray-500 hover:text-black focus:text-black">
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

                <Container>
                    <div className="flex flex-wrap items-center">
                        <Link href="/">
                            <a className="block py-8 mx-auto lg:m-0">
                                <img src={globalData.siteOptions.siteLogo.mediaItemUrl} alt={`${globalData.globalOptions.generalSettingsTitle} Logo`} className="w-full max-w-40" />
                            </a>
                        </Link>
                        <div className="hidden ml-auto text-xl text-primary lg:block">
                            <PhoneNumber 
                                showPrefix
                                showLocation
                                prefixClasses="hidden mr-2 lg:inline"
                                locationClasses="inline-block mr-2"
                                numberClasses="inline-block font-bold hover:text-secondary focus:text-secondary"
                            />
                        </div>
                    </div>
                </Container>

                <div className="hidden border-t border-gray-300 lg:block">
                    <Container>
                        <nav id="menu-primary" role="navigation" className="xl:ml-auto xl:pl-8 md:w-full xl:flex-1 menu-primary" aria-label="Site Main Navigation">
                            <ul className="flex flex-wrap items-center lg:justify-between xl:justify-end">
                                {globalData.primaryMenu.map((item, key) => {
                                    if(!item.node.parentId) {
                                        return(
                                            <li className="" key={key}>    
                                                <Link href={`${item.node.path}`}>
                                                    <a className={`block px-5 py-5 text-sm lg:text-base xl:text-lg hover:text-secondary focus:text-secondary text-black ${ item.node.path !== '/' && `${router.asPath}/`.includes(`${item.node.path}`) ? 'bg-green-500' : ''} ${item.node.path == `${router.asPath}` ? 'bg-green-500' : '' }`}>
                                                        {item.node.label}
                                                        {item.node.childItems.edges.length > 0 && 
                                                            <span className="absolute text-sm -translate-x-1/2 bottom-2 left-1/2">
                                                                <FiChevronDown />
                                                            </span>
                                                        }
                                                    </a>
                                                </Link>
                                                {item.node.childItems.edges.length > 0 && 
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