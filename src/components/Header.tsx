import Button from '../UI/Button';
import { useContext } from 'react';
import { ModalContext, ModalType } from '../store/ModalContext';

export default function Header() {
    const modalCtx = useContext<ModalType>(ModalContext);

    const handleShowModal = () => {
        modalCtx.showModal();
    };

    return (
        <>
            <div className="basic-N1">
                <div className="header-inner">
                    <div className="header-container container-lg">
                        <h1 className="header-title">SnackReview</h1>
                        <div className="header-right">
                            <div className="header-lang">
                                <button className="header-langbtn" type="button" onClick={handleShowModal}>
                                    ADD NEW SNACK
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
