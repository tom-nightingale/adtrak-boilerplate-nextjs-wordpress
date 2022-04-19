import { useState } from "react";
import Link from "next/link";
import PhoneNumber from "@/components/phoneNumber";
import { FiMenu, FiX, FiChevronDown, FiChevronUp } from "react-icons/fi";

export default function MobileTopBar({ globalData }) {

    const [isMenuOpen, setMenuOpen] = useState(false);
    
    const toggleSubMenu = (e) => {
        e.preventDefault();
        var element = e.target;
        element.nextSibling.classList.toggle('hidden');
    }

    return (
        <>
            <div className="fixed z-50 flex flex-wrap w-full bg-primary lg:hidden">
                {/* <a className="w-1/2 p-2 text-center bg-secondary" href={`tel:${globalData.siteOptions.defaultPhoneNumber}`}>
                    {globalData.siteOptions.defaultPhoneNumber}
                </a> */}

                <PhoneNumber
                    numberClasses="w-1/2 p-2 text-center bg-secondary"
                />

                <button onClick={() => setMenuOpen(!isMenuOpen)} title="Toggle Mobile Menu" className="flex items-center justify-center w-1/2 p-2 text-center bg-primary" data-mobile-menu-toggle>
                    <FiMenu />
                    <span className="ml-2">Menu</span>
                </button>
            </div>

            <div className={`fixed top-0 right-0 duration-500 z-50 transform w-1/2 h-full bg-gray-100 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                
                <button onClick={() => setMenuOpen(!isMenuOpen)} className={`absolute z-50 p-4 text-lg text-white transform -translate-y-1/2 bg-red-500 -left-12 top-1/2 ${isMenuOpen ? 'block' : 'hidden'}`}><FiX /></button>

                <p className="p-4 text-sm text-center text-white bg-gray-900">Menu</p>
                
                <ul className="w-full text-sm mobile-menu">
                    {globalData.primaryMenu.map((item, key) => {
                        if(!item.node.parentId) {
                            return(
                                <li key={key} className="relative">
                                    <Link href={`${item.node.path}`}>
                                        <a className="relative block p-4 border-b border-white/10 hover:text-black focus:text-black">
                                            {item.node.label}
                                        </a>
                                    </Link>
                                    {item.node.childItems.edges.length > 0 && 
                                        <button className="absolute top-0 right-0 z-50 flex items-center justify-center px-4 py-4 text-white bg-gray-700 sub-arrow" onClick={toggleSubMenu}>
                                            
                                        </button>
                                    }
                                    {item.node.childItems.edges && 
                                        <ul className="hidden text-white bg-gray-700 sub-menu">
                                            {item.node.childItems.edges.map((child, childKey) => {
                                                return (
                                                <li key={childKey} className="">
                                                    <Link href={`${child.node.path}`}>
                                                        <a className="block p-4 border-b hover:text-black focus:text-black border-white/10">
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
                    {globalData.secondaryMenu.map((item, key) => {
                        if(!item.node.parentId) {
                            return(
                                <li key={key} className="">
                                    <Link href={`${item.node.path}`}>
                                        <a className="relative block p-4 border-b border-white/10 hover:text-black focus:text-black">
                                            {item.node.label}
                                        </a>
                                    </Link>
                                    {item.node.childItems.edges.length > 0 && 
                                        <ul className="sub-menu">
                                            {item.node.childItems.edges.map((child, childKey) => {
                                                return (
                                                <li key={childKey} className="">
                                                    <Link href={`${child.node.path}`}>
                                                        <a className="block p-4 hover:text-black focus:text-black bg-primary-dark">
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
            </div>
        </>
    )
}