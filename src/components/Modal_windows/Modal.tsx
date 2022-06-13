import React from 'react';
import './Modal.css'

interface IModal {
    show: boolean;
    setShow: (showDel: boolean) => void;
    children: React.ReactNode
}

const Modal: React.FC<IModal> = ({show, setShow, children}) => {
    return (
        <div className={show ? 'modal active' : 'modal'} onClick={() => setShow(false)}>
            <div className={show ? 'modal__content active' : 'modal__content'}
                 onClick={event => event.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default Modal;