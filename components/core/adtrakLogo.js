export default function AdtrakLogo({ color, type }) {
    return (
        <a className="block mx-auto max-w-32" href="https://www.adtrak.co.uk/website-referral/" rel="noreferrer noopener" target="_blank">
            <img src={`/images/adtrak-${color ? color : 'navy'}-${type ? type : 'logo'}.svg`} alt="Adtrak Logo" />
        </a>
    )
}