import { useEffect, useState } from 'react';
import { ImCool } from 'react-icons/im';
import { ImCool2 } from 'react-icons/im';
import { ImCrying } from 'react-icons/im';
import { ImCrying2 } from 'react-icons/im';
import useHttp from '../hooks/useHttps';
import { AppDispatch } from '../store';
import { useDispatch } from 'react-redux';
import { fetchSnacksData, setInitSnackReviews } from '../store/snacks-actions';
import { ItemDetailType } from '../UI/ItemDetail';

const updateConfig: {} = {
    method: 'PUT',
    headers: {
        'Content-Type': 'text/plain',
        withCredentials: true,
    },
};

const Emogi: React.FC<{ item: ItemDetailType }> = (props) => {
    const [goodCount, setGoodCount] = useState(props.item.good);
    const [badCount, setBadCount] = useState(props.item.bad);
    const [clickSmile, setClickSmile] = useState(false);
    const [clickSad, setClickSad] = useState(false);
    const dispatch = useDispatch<AppDispatch>();

    const {
        data: submitResData,
        isLoading: isSending,
        error: errorSubmitForm,
        sendRequest,
        clearData,
    } = useHttp(`${process.env.REACT_APP_FIREBASE_URL}snacks/${props.item.id}.json`, updateConfig, []);

    useEffect(() => {
        if (submitResData && submitResData['message'] && !errorSubmitForm) {
            clearData();
            if (clickSmile) {
                setClickSmile(false);
            }
            if (clickSad) {
                setClickSad(false);
            }

            setClickSad(false);
            dispatch(fetchSnacksData());
        }
    }, [submitResData, errorSubmitForm]);

    const onClickSmileBtn = () => {
        if (clickSad) return;
        setClickSmile(true);
        setGoodCount((prev) => prev + 1);
        sendRequest(
            JSON.stringify({
                brand: props.item.brand,
                name: props.item.name,
                image: props.item.image,
                bad: props.item.bad,
                good: goodCount + 1,
            })
        );
    };

    const onClickSadBtn = () => {
        if (clickSmile) return;
        setClickSad(true);
        setBadCount((prev) => prev + 1);
        sendRequest(
            JSON.stringify({
                brand: props.item.brand,
                name: props.item.name,
                image: props.item.image,
                bad: badCount + 1,
                good: props.item.good,
            })
        );
    };

    return (
        <>
            <div className="contents-btn-div">
                <>
                    {(clickSmile && (
                        <button className="contents-btn" onClick={onClickSmileBtn} disabled>
                            <ImCool2 className="contents-btn-emogi" />
                            <p className="contents-btn-p">{goodCount}</p>
                        </button>
                    )) || (
                        <button className="contents-btn" onClick={onClickSmileBtn}>
                            <ImCool className="contents-btn-emogi" />
                            <p className="contents-btn-p">{goodCount}</p>
                        </button>
                    )}
                    {(clickSad && (
                        <button className="contents-btn" onClick={onClickSadBtn} disabled>
                            <ImCrying2 className="contents-btn-emogi" />
                            <p className="contents-btn-p">{badCount}</p>
                        </button>
                    )) || (
                        <button className="contents-btn" onClick={onClickSadBtn}>
                            <ImCrying className="contents-btn-emogi" />
                            <p className="contents-btn-p">{badCount}</p>
                        </button>
                    )}
                </>
            </div>
        </>
    );
};

export default Emogi;
