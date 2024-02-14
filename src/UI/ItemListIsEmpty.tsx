const ItemListIsEmpty: React.FC<{
    message: string;
    onClickBtn: (type: string, brandId?: string) => void;
    type: string;
}> = (props) => {
    return (
        <div className="basic-N9">
            <div className="contents-inner">
                <div className="contents-container">
                    <div className="contents-bottom container-md">
                        <div className="contents-cardset">
                            <p>{props.message}</p>
                        </div>
                        <div className="contents-btn">
                            <div className="contents-control">
                                <div
                                    className="swiper-button-prev"
                                    onClick={() => props.onClickBtn(props.type, '')}
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItemListIsEmpty;
