import "./Editor.css"
function Editor() {
   return ( 
   <div id="code-editor">
        <div class="board">
            <div class="numbers" id="numbers">
                <div class="num">1</div>
                <div class="num">2</div>
            </div>
            <div class="editor" id="editor" contenteditable="true">
                <div class="line">#include</div>
                <div class="line">void main(){ }</div>
            </div>
        </div>
    </div>
   )
}
export default Editor;