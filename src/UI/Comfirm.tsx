import Modal from './Modal';
import { PiXCircleFill } from 'react-icons/pi';
import { PiShareFatFill } from 'react-icons/pi';
import { GoCheck } from 'react-icons/go';
import { GoX } from 'react-icons/go';

type ConfirmType = {
    showConfirm: boolean;
    message: string;
    onConfirm: () => void;
    onCloseConfirm: () => void;
};

const Confirm: React.FC<ConfirmType> = (props) => {
    return (
        <>
            <Modal open={props.showConfirm} onClose={props.onCloseConfirm}>
                <section>{props.message}</section>
                <button type="button" onClick={props.onConfirm} className="btnset-save">
                    <GoCheck />
                </button>
                <button type="button" onClick={props.onCloseConfirm} className="btnset-save">
                    <GoX />
                </button>
            </Modal>
        </>
    );
};

export default Confirm;
