import Container from './container'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Header({ navItems, logoUrl }) {
    const router = useRouter();

    return (
        <header className="pt-8 bg-white border-t-4 border-secondary lg:border-none lg:pt-0">
            <Container>
                <div className="flex flex-wrap items-center">
                    <Link href="/">
                        <a className="block py-8">
                            <img src={logoUrl} alt="Company Name" className="w-full max-w-40" />
                        </a>
                    </Link>
                    <a className="block ml-auto text-xl text-primary hover:text-secondary focus:text-secondary" href="#"><span className="hidden lg:inline">Call <span className="font-bold">Location</span> On </span><span className="font-bold">0800 000 0000</span></a>
                </div>
            </Container>

            <div className="hidden border-t border-gray-300 lg:block">
                <Container>
                    <nav id="menu-primary" role="navigation" className="xl:ml-auto xl:pl-8 md:w-full xl:flex-1 menu-primary" aria-label="Site Main Navigation">
                        <ul className="flex flex-wrap items-center xl:justify-end menu-primary-js">
                            {navItems.menuItems.edges.map((item, key) => {
                                return(
                                    <li className="" key={key}>
                                        <Link href={`${item.node.path}`}>
                                            <a className={`block px-5 py-5 pl-0 text-sm lg:text-base xl:text-lg hover:text-secondary focus:text-secondary wp-classes text-black ${item.node.path == `${router.asPath}/` ? 'text-red-500' : 'text-blue-500' }`}>
                                                {item.node.label}
                                            </a>
                                        </Link>

                                        {item.node.childItems &&
                                            <ul className="sub-nav">
                                                {item.node.childItems.edges.map((child, key) => {
                                                    return(
                                                        <li className="" key={key}>
                                                            <Link href={`${child.node.path}`}>
                                                                <a className={`block px-5 py-5 pl-0 text-sm lg:text-base xl:text-lg hover:text-secondary focus:text-secondary wp-classes text-black ${child.node.path == `${router.asPath}/` ? 'text-red-500' : 'text-blue-500' }`}>
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
                            })}
                        </ul>
                    </nav>
               </Container>
            </div>
        </header>
    )
}