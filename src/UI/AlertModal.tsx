import Modal from './Modal';
import { PiCheckCircleBold } from 'react-icons/pi';

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
                <button type="button" onClick={props.onCloseAlert} className="btnset-save-border-none">
                    <PiCheckCircleBold />
                </button>
            </Modal>
        </>
    );
};

export default AlertModal;
