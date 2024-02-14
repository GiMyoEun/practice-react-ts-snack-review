import { useState, createContext } from 'react';

export type ModalType = {
    progress: boolean;
    showModal: () => void;
    hideModal: () => void;
};

export const ModalContext = createContext<ModalType>({
    progress: false,
    showModal: () => {},
    hideModal: () => {},
});

const ModalContextProvider: React.FC<{ children: React.ReactNode }> = (props) => {
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

    function showModal() {
        setModalIsOpen(true);
    }
    function hideModal() {
        setModalIsOpen(false);
    }

    const modalCtx: ModalType = {
        progress: modalIsOpen,
        showModal,
        hideModal,
    };

    return <ModalContext.Provider value={modalCtx}>{props.children}</ModalContext.Provider>;
};

export default ModalContextProvider;
