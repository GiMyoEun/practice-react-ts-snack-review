import { useEffect, useState } from 'react';
import { FcLikePlaceholder } from 'react-icons/fc';
import { FcLike } from 'react-icons/fc';
import { LuHeartOff } from 'react-icons/lu';
import { SnackReviewType } from './SnackReview';
import useHttp from '../hooks/useHttps';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { fetchSnackReviewData } from '../store/snacks-actions';

type GoodIconsType = {
    item: SnackReviewType;
    rating: number;
    comment: string;
};

const updateConfig: {} = {
    method: 'PUT',
    headers: {
        'Content-Type': 'text/plain',
        withCredentials: true,
    },
};

const GoodIcons: React.FC<GoodIconsType> = (props) => {
    const [isClicked, setIsClicked] = useState(false);
    const [good, setGood] = useState(props.item.good);
    const dispatch = useDispatch<AppDispatch>();

    const {
        data: submitUpdateData,
        isLoading: isUpdating,
        error,
        sendRequest: sendUptReq,
        clearData: clearUpdateData,
    } = useHttp(
        `${process.env.REACT_APP_FIREBASE_URL}reviews/${props.item.snackId}/${props.item.id}.json`,
        updateConfig,
        []
    );

    useEffect(() => {
        if (error) {
            clearUpdateData();
            setGood((prev) => prev - 1);
            setIsClicked(false);
        }

        if (submitUpdateData && submitUpdateData['message'] && !error) {
            clearUpdateData();
            dispatch(fetchSnackReviewData(props.item.snackId));
            setIsClicked(false);
        }
    }, [submitUpdateData, error]);

    const onClickBtn = () => {
        setIsClicked(true);
        setGood((prev) => prev + 1);
        sendUptReq(
            JSON.stringify({
                comment: props.comment,
                star: props.rating,
                good: good + 1,
            })
        );
    };

    return (
        <>
            {(isClicked && (
                <>
                    <button className="delete-btn" disabled>
                        <FcLike />
                        <p>{good}</p>
                    </button>
                </>
            )) || (
                <>
                    <button className="delete-btn" onClick={onClickBtn}>
                        <FcLikePlaceholder />
                        <p>{good}</p>
                    </button>
                </>
            )}
        </>
    );
};

export default GoodIcons;
