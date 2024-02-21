import Modal from './Modal';
import { PiCheckCircleBold } from 'react-icons/pi';
import { GoCheck } from 'react-icons/go';

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
                    <GoCheck />
                </button>
            </Modal>
        </>
    );
};

export default AlertModal;
