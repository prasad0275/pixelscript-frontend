import "./Header.css"
function Header({handleShowRunPanel}) {
    return (
        
        <header className="flex align-items-center">
            <div className="flex gap-10 mx-10">
                <div>
                    <b>PS</b>
                </div>
                <nav className="flex">
                    <div>
                        <div className="nav-item">File</div>
                        <div className="item-content">
                            <ul>
                                <li>New File</li>
                                <li>Rename File</li>
                                <li>New Workspace</li>
                                <li>Exit</li>
                            </ul>
                        </div>
                    </div>
                    <div>
                    <div className="nav-item">Edit</div>
                        <div className="item-content">
                            <ul>
                                <li>Find</li>
                                <li>Replace</li>
                                <li>Font</li>
                                <li>Font Size</li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
            <div className="flex">
                <h1 className="block" id="nav-title">PixelScript</h1>
            </div>
            <div className="flex gap-10 mx-10">

                <div>
                    <span className="material-symbols-outlined cursor-pointer" onClick={handleShowRunPanel}>
                        sound_sampler
                    </span>
                </div>
                <div>
                    <span className="material-symbols-outlined cursor-pointer">
                        save
                    </span>
                </div>
            </div>

        </header>
    )
}
export default Header