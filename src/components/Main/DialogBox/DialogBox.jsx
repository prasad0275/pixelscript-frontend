import { useState, useEffect, Children } from "react";
import Modal from 'react-modal';
import "./DialogBox.css";

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#212121',
        borderRadius: '20px',
    },
};

function DialogBox({ children, open, title }) {
    const [openModel, setOpenModel] = useState(open)
    const handleCloseModal = () => {
        // setShowDialogBox(false);
        // setShowErrorConsole(false);
        setOpenModel(prev => prev = !prev)
    }
    return (
        <>
            <Modal
                isOpen={openModel}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <div >
                    <h2 className="inline">{title}</h2>
                    <span id="close-button" className="material-symbols-outlined cursor-pointer"
                        onClick={handleCloseModal}>
                        cancel
                    </span>
                </div>

                {/* <button onClick={closeModal}>close</button> */}
                <div className="my-10">
                    {children}
                </div>


            </Modal>
        </>
    )
}

export default DialogBox;