import Modal from './Modal';

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

                <button type="button" onClick={props.onCloseConfirm} className="btnset-save">
                    취소
                </button>
                <button type="button" onClick={props.onConfirm} className="btnset-save">
                    확인
                </button>
            </Modal>
        </>
    );
};

export default Confirm;
