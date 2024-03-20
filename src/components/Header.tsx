import Button from '../UI/Button';
import { useContext } from 'react';
import { ModalContext, ModalType } from '../store/ModalContext';
import snacckImg from '../resources/icons/apple-touch-icon.png'


export default function Header() {
    const modalCtx = useContext<ModalType>(ModalContext);

    const handleShowModal = () => {
        modalCtx.showModal();
    };

    return (
        <>
            <header className="basic-N1" data-bid="XwlSbFQoYC">
                <div className="basic-N1">
                    <div className="header-inner">
                        <div className="header-container container-lg">
                            <h1 className="header-title">Snack Review<img src={snacckImg}></img></h1>
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
            </header>
        </>
    );
}
