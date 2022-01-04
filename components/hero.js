import Image from 'next/image'
import Container from '@/components/container'

export default function Hero({ image, heading }) {
    return (
        <div className="relative w-full overflow-hidden min-h-50">
            {image && 
                <Image 
                    src={image}
                    alt={heading}
                    layout="fill"
                    objectFit="cover"
                    className=""
                />
            }
        </div>   
    )
}