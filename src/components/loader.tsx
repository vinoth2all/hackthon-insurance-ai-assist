
export const Loader = () => {
    //return <span className="loader"></span>
    return <div className="absolute bg-black opacity-75 z-50 h-[calc(100%_-_48px)] w-full flex items-center justify-center">
        <div className="items-center justify-center">
            <div id="spinner-container" className="space-y-10">
                <div className="flex justify-center">
                    <div className="border-gray-300 h-18 w-18 animate-spin rounded-full border-6 border-t-[#48A5DA]">
                    </div>
                </div>
            </div>
        </div>
    </div>
}