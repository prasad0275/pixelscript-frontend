import "./ErrorConsole.css"
function ErrorConsole() {
    return (
        <div id="error-console">
            <div id="title" className="flex">
                <div><b>Errors</b></div>
                <div>
                    <span class="material-symbols-outlined">
                        refresh
                    </span>
                </div>
            </div>

        </div>
    )
}
export default ErrorConsole