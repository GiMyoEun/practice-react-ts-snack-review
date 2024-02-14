import ItemBox from '../UI/ItemBox';
import { snackType } from './AllList';
import ItemList from '../UI/ItemList';
import ItemListIsEmpty from '../UI/ItemListIsEmpty';

const Snacks: React.FC<{
    onClickBtn: (type: string, brandId?: string) => void;
    items: snackType[];
    type: string;
    brand: string;
}> = (props) => {
    let filteredItems: snackType[] = [];

    if (props.items) {
        filteredItems = props.items.filter((item: snackType) => item.brand === props.brand);
        if (!filteredItems || filteredItems.length === 0) {
            return <ItemListIsEmpty message="스낵 리스트가 없습니다" onClickBtn={props.onClickBtn} type="brands" />;
        }
    }

    return (
        <>
            <ItemList>
                {filteredItems.map((item: snackType) => (
                    <ItemBox
                        key={item.id}
                        id={item!.id!}
                        name={item!.name!}
                        onClickBtn={props.onClickBtn}
                        type={props.type}
                    />
                ))}

                <div className="contents-btn">
                    <div className="contents-control">
                        <div className="swiper-button-prev" onClick={() => props.onClickBtn('brands', '')}></div>
                    </div>
                </div>
            </ItemList>
        </>
    );
};

export default Snacks;
