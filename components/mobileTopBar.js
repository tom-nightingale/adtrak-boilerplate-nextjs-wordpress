export default function MobileTopBar({  }) {
    return (
        <div className="fixed z-50 flex flex-wrap w-full bg-primary lg:hidden">
            <div data-ld-toggle="ld-mobile-top" className="w-1/2 p-2 text-center bg-secondary">
                {/* {% do action('ld_mobile_top', "Call us today") %} */}
            </div>

            <div id="ld-mobile-top" className="absolute left-0 z-10 hidden w-full p-4 bg-secondary top-full">
                {/* {% do action('ld_default', true) %} */}
                {/* {% do action('ld_list', false, "inline") %} */}
            </div>

            <button title="Toggle Mobile Menu" className="flex items-center justify-center w-1/2 p-2 text-center bg-primary" data-mobile-menu-toggle>
                {/* {{ function('icon', 'bars') }} */}
                <span className="ml-2">Menu</span>
            </button>
        </div>
    )
}