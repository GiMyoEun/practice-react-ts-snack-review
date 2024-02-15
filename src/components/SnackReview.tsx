import useHttp from '../hooks/useHttps';
import Star from './SnackStar';
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
        sendRequest();
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
        <div className="comment">
            <h6 className="inputset-tit">{props.comment}</h6>
            <div className="star-rating">
                <Star onChangeValue={() => {}} value={props.star} showRating={true} small={true} />
            </div>
            {actions}
            {/* <button
                type="button"
                disabled={props.isSending || isSending}
                className="delete-btn"
                onClick={deleteHandler}
            >
                삭제
            </button> */}
        </div>
    );
};

export default SnackReview;
