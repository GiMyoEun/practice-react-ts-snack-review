import useHttp from '../hooks/useHttps';
import { useEffect, useState } from 'react';

import { IRootState } from '../store';
import { useSelector } from 'react-redux';
import { AppDispatch } from '../store';
import { useDispatch } from 'react-redux';
import { fetchSnackReviewData, deleteSnackReview } from '../store/snacks-actions';
import SnackReview from './SnackReview';

const requestConfigSubmit = {
    method: 'POST',
    headers: {
        'Content-Type': 'text/plain',
    },
};

export type snackReviewType = {
    id: string;
    snackId: string;
    comment: string;
};

const SnackReviews: React.FC<{
    id: string;
}> = (props) => {
    const [firstRandering, setFirstRendring] = useState(true);
    const dispatch = useDispatch<AppDispatch>();
    const [comment, setComment] = useState<string>('');
    const snackReviewItems: snackReviewType[] = useSelector((state: IRootState) => state.snacks.reviews);

    const {
        data: submitResData,
        isLoading: isSending,
        error: errorSubmitForm,
        sendRequest,
        clearData,
    } = useHttp(`${process.env.REACT_APP_FIREBASE_URL}reviews/${props.id}.json`, requestConfigSubmit, []);

    useEffect(() => {
        if (firstRandering || (submitResData && submitResData['message'] && !errorSubmitForm)) {
            setFirstRendring(false);
            dispatch(fetchSnackReviewData(props.id));
            setComment('');
        }
    }, [submitResData, errorSubmitForm, dispatch]);

    const submitHandler = () => {
        sendRequest(
            JSON.stringify({
                comment,
                snackId: props.id,
            })
        );
    };

    const changeFormDataHandler = (value: string) => {
        setComment(value);
    };

    let actions = <p></p>;
    if (isSending) {
        actions = <p>저장중...</p>;
    }
    if (errorSubmitForm) {
        actions = <p>저장에 실패하였습니다</p>;
    }

    // if (submitResData && submitResData['message'] && !errorSubmitForm) {
    //     actions = <p>정보 저장에 성공하였습니다</p>;
    // }

    return (
        <>
            <div className="form-group form-line">
                <div className="inputset inputset-line inputset-lg inputset-label">
                    <label>
                        <div className="comment">
                            <input
                                type="text"
                                className="inputset-input form-control"
                                placeholder="댓글을 입력해주세요."
                                id="comment"
                                name="comment"
                                value={comment}
                                onChange={(event) => changeFormDataHandler(event.currentTarget.value)}
                            />

                            <button type="button" disabled={isSending} onClick={submitHandler} className="reply-btn">
                                ↗
                            </button>
                            {actions}
                        </div>

                        {snackReviewItems &&
                            snackReviewItems.map((item) => (
                                <SnackReview
                                    key={item.id}
                                    id={item.id}
                                    snackId={props.id}
                                    comment={item.comment}
                                    isSending={isSending}
                                />
                            ))}
                    </label>
                </div>
            </div>
        </>
    );
};

export default SnackReviews;
