import { useState } from 'react';
import { FcLikePlaceholder } from 'react-icons/fc';
import { FcLike } from 'react-icons/fc';
import { LuHeartOff } from 'react-icons/lu';

type GoodIconsType = {};

const GoodIcons: React.FC<GoodIconsType> = () => {
    const [isClicked, setIsClicked] = useState(false);

    const onClickBtn = () => {
        setIsClicked(true);
    };

    return (
        <>
            <div className="contents-btn-div">
                {(isClicked && (
                    <>
                        <button className="contents-btn" disabled>
                            <FcLike />
                        </button>
                    </>
                )) || (
                    <>
                        <button className="contents-btn" onClick={onClickBtn}>
                            <FcLikePlaceholder />
                        </button>{' '}
                    </>
                )}
            </div>
        </>
    );
};

export default GoodIcons;
