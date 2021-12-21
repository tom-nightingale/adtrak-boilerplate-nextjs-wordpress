export default function Container({ extraClasses, children }) {
    return(
        <div className={`w-full max-w-4xl px-6 mx-auto 4xl:px-0 ${extraClasses}`}>
            {children}
        </div>
    )
}