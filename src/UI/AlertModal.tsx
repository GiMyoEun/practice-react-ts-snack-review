import Modal from './Modal';

type AlertType = {
    showAlert: boolean;
    message: string;
    onCloseAlert: () => void;
};

const AlertModal: React.FC<AlertType> = (props) => {
    return (
        <>
            <Modal open={props.showAlert} onClose={props.onCloseAlert}>
                <section>{props.message}</section>
                <button type="button" onClick={props.onCloseAlert} className="btnset-save">
                    확인
                </button>
            </Modal>
        </>
    );
};

export default AlertModal;
