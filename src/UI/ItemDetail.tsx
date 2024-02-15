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
                    <div>
                        <img src={props.image} className="contents-img" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItemDetail;
