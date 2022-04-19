import { useGlobalContext } from '@/pages/_app'
import { FaFacebook,  FaInstagram, FaLinkedin, FaPinterest, FaTwitter, FaYoutube} from "react-icons/fa";

export default function SocialLinks({ linkClasses }) {
    const globalData = useGlobalContext();

    const socialPlatforms = {
        facebook: {
            name: 'facebook',
            icon: <FaFacebook />,
        }, 
        instagram: {
            name: 'instagram',
            icon: <FaInstagram />,
        }, 
        linkedin: {
            name: 'linkedin',
            icon: <FaLinkedin />,
        }, 
        pinterest: {
            name: 'pinterest',
            icon: <FaPinterest />,
        }, 
        twitter: {
            name: 'twitter',
            icon: <FaTwitter />,
        }, 
        youtube: {
            name: 'youtube',
            icon: <FaYoutube />,
        }, 
    }

    return (
        <>
            {Object.entries(socialPlatforms).map(([key, platform]) => {
                return (
                    <a className={linkClasses} href={globalData.siteOptions[key]}>
                        {platform.icon}
                    </a>
                )
            })}
        </>
    )
}