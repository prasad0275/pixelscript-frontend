
function Header() {
    return (
        
        <header className="flex">
            <div className="flex gap-10 mx-10">
                <div>
                    <b>PS</b>
                </div>
                <nav className="flex">
                    <div>
                        File
                    </div>
                    <div>
                        Edit
                    </div>
                </nav>
            </div>
            <div className="flex">
                <h1 className="block" id="nav-title">PixelScript</h1>
            </div>
            <div className="flex gap-10 mx-10">

                <div>
                    <span className="material-symbols-outlined">
                        sound_sampler
                    </span>
                </div>
                <div>
                    <span className="material-symbols-outlined">
                        save
                    </span>
                </div>
            </div>

        </header>
    )
}
export default Header