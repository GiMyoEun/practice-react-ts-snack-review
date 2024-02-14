import Button from './Button';
import classes from './ItemBox.module.css';
export type ItemBoxType = {
    name: string;
    id: string;
    onClickBtn: (type: string, id: string) => void;
    type: string;
};

const ItemBox: React.FC<ItemBoxType> = (props) => {
    return (
        <div className="contents-cardset">
            <a
                className="cardset cardset-inner cardset-hover cardset-border"
                onClick={() => props.onClickBtn(props.type, props.id)}
            >
                <div className="cardset-cont">
                    <h2 className="cardset-tit">{props.name}</h2>
                </div>
            </a>
        </div>
    );
};

export default ItemBox;
