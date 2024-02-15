import SnackStar from '../components/SnackStar';
const ItemDetail: React.FC<{
    name: string;
    image: string;
    starAver: number;
}> = (props) => {
    return (
        <div className="basic-N38">
            <div className="contents-inner">
                <div className="contents-container container-md">
                    <div className="textset">
                        <h2 className="textset-tit-snack">{props.name}</h2>
                        <h2 className="textset-tit-snack">
                            <SnackStar onChangeValue={() => {}} value={props.starAver} showRating={true} />
                        </h2>
                    </div>
                    <div className="contents-img-div">
                        <img src={props.image} className="contents-img" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItemDetail;
