import "./RunPanel.css"

function RunPanel(){
    return(
        <div id="run-panel" className="flex-col">
             <div>
                <button className="run-btn flex ">
                    <div id="run" className="block">
                        Run
                    </div>
                    <span className="material-symbols-outlined">
                        play_arrow
                        </span>
                </button>
            </div>
            <div id="io-textarea">
                <div className="flex flex-col">
                    <p className="p">Input :</p>
                    <textarea name="" id="" cols="30" rows="10"></textarea>
                </div>
                <div className="flex flex-col">
                    <p className="p">Output : </p>
                    <textarea name="" id="" cols="30" rows="10"></textarea>
                </div>
            </div>
        </div>
    )
}
export default RunPanel