const ItemDetail: React.FC<{
    name: string;
    image: string;
}> = (props) => {
    return (
        <div className="basic-N38">
            <div className="contents-inner">
                <div className="contents-container container-md">
                    <div className="textset">
                        <h2 className="textset-tit-snack">{props.name}</h2>
                    </div>
                    <div className="contents-img">
                        <img src={props.image} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItemDetail;
