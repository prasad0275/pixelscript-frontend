import { useSelector } from "react-redux";
import { PDFDownloadLink, Document, Page, Text, PDFViewer } from '@react-pdf/renderer';
import { useEffect, useState } from "react";


function DocumentationGenerator() {
    const selectedFile = useSelector(state => state.fileSlice.selectedFile)
    const [codeBlock, setCodeBlock] = useState(selectedFile.code);
    const [pdfBlobUrl, setPdfBlobUrl] = useState(null);
    const [pdfContent, setPdfContent] = useState(null);

    useEffect(() => {
        generatePDFContent()
    }, [selectedFile.code, codeBlock, setCodeBlock])


    const generatePDFContent = () => {
        const codeWithComments = selectedFile.code
        setCodeBlock(codeWithComments)
        const lines = codeWithComments.split('\n');
        let currentComment = '';
        const codeBlocks = [];

        // Iterate through lines to group comments with code blocks
        lines.forEach(line => {
            if (line.includes('//') || line.includes("/*") || line.includes('*/')) {
                codeBlocks.push({ content: line.trim().substring(2).padStart(5, " "), type: 'comment' })
            }
            else if (line.includes('*')) {
                codeBlocks.push({ content: line.substring(1).padStart(5, " "), type: 'comment' })
            }
            else {
                codeBlocks.push({ content: line.padStart(7, " "), type: 'code' })
            }
        });


        setPdfContent(
            <Document>
                <Page style={{ margin: '20px 40px', marginRight: 40 }}>
                    <Text style={{ fontSize: 20, textAlign: 'center', fontWeight: 'bold' }}>
                        PixelScript Documentation
                    </Text>
                    <Text style={{ fontSize: 15, marginTop: 10, marginBottom: 10, textDecoration: 'underline', fontWeight: 'bold' }}>
                        {selectedFile.filename}.{selectedFile.extension}
                    </Text>
                    {codeBlocks.map((block, index) => (
                        block.type === 'comment' ? (
                            <Text style={{ fontSize: 12, marginTop: 10, marginBottom: 2, color: 'blue', fontWeight: 'bold' }} key={index}>
                                {block.content}
                            </Text>
                        ) : (
                            <Text style={{ fontSize: 10, backgroundColor: 'black', color: 'white' }} key={index}>
                                {block.content}
                            </Text>
                        )


                    ))
                    }
                </Page>

            </Document>
        );
    }

    return (
        <>
            {/* {!pdfContent &&
                <span onClick={generatePDFContent} class="material-symbols-outlined cursor-pointer">
                    receipt_long
                </span>
            } */}
            {pdfContent && (
                <PDFDownloadLink
                    document={pdfContent}
                    fileName="code_with_comments.pdf"
                >
                    {({ blob, url, loading, error }) =>
                        loading ? (<span class="material-symbols-outlined">sync</span>) 
                        : (<span class="material-symbols-outlined cursor-pointer a">file_save</span>)
                    }
                </PDFDownloadLink>
            )}

        </>
    )
}
export default DocumentationGenerator;