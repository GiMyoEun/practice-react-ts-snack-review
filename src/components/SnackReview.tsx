import useHttp from '../hooks/useHttps';
import Star from './SnackStar';
import { useState } from 'react';
import Confirm from '../UI/Comfirm';
import { HiArchiveBoxArrowDown } from 'react-icons/hi2';

const requestConfigSubmit = {
    method: 'DELETE',
    headers: {
        'Content-Type': 'text/plain',
        withCredentials: true,
    },
};

type SnackReviewType = {
    id: string;
    snackId: string;
    comment: string;
    isSending: boolean;
    star: number;
};

const SnackReview: React.FC<SnackReviewType> = (props) => {
    const [showConfirm, setShowConfirm] = useState(false);
    const [confirmMessage, setConfirmMessage] = useState('');

    const {
        data: submitResData,
        isLoading: isSending,
        error: errorSubmitForm,
        sendRequest,
        clearData,
    } = useHttp(
        `${process.env.REACT_APP_FIREBASE_URL}reviews/${props.snackId}/${props.id}.json`,
        requestConfigSubmit,
        []
    );

    const deleteHandler = () => {
        setShowConfirm(true);
        setConfirmMessage('삭제하시겠습니까?');
    };

    const deleteSnackHandler = () => {
        setShowConfirm(false);
        setConfirmMessage('');
        // sendRequest();
    };

    const denySubmitHandler = () => {
        setShowConfirm(false);
        setConfirmMessage('');
        return;
    };

    let actions = <p></p>;
    if (isSending) {
        actions = <p>삭제중...</p>;
    }
    if (errorSubmitForm) {
        actions = <p>삭제에 실패하였습니다</p>;
    }
    if (submitResData && submitResData['message'] && !errorSubmitForm) {
        actions = <p>삭제 성공하였습니다</p>;
    }

    return (
        <>
            <Confirm
                showConfirm={showConfirm}
                message={confirmMessage}
                onConfirm={deleteSnackHandler}
                onCloseConfirm={denySubmitHandler}
            />

            <div className="comment-grid">
                <div className="grid-container-left">
                    <h6 className="inputset-tit">{props.comment}</h6>
                </div>

                {actions}
                <div className="grid-container">
                    <Star onChangeValue={() => {}} value={props.star} showRating={true} small={true} />
                </div>
                <div className="grid-container">
                    <button
                        type="button"
                        disabled={props.isSending || isSending}
                        className="delete-btn"
                        onClick={deleteHandler}
                    >
                        <HiArchiveBoxArrowDown />
                    </button>
                </div>
            </div>
        </>
    );
};

export default SnackReview;
