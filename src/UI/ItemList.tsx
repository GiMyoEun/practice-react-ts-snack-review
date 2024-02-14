const ItemList: React.FC<{ children: any; onClickBtn?: (type: string, brandId?: string) => void }> = (props) => {
    return (
        <>
            <div className="basic-N9">
                <div className="contents-inner">
                    <div className="contents-container">
                        <div className="contents-bottom container-md">{props.children}</div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ItemList;
