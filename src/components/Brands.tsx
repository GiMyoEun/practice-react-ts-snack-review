import ItemBox from '../UI/ItemBox';
import { BrandType } from '../UI/SelectBox';
import ItemList from '../UI/ItemList';

const Brands: React.FC<{
    onClickBtn: (type: string, brandId?: string) => void;
    items: BrandType[];
    type: string;
}> = (props) => {
    if (!props.items) {
        return <p>브랜드 리스트가 존재하지 않습니다.</p>;
    }

    return (
        <div>
            <ItemList>
                {props.items.map((item: BrandType) => (
                    <ItemBox
                        key={item.id}
                        id={item!.id!}
                        name={item!.name!}
                        onClickBtn={props.onClickBtn}
                        type={props.type}
                    />
                ))}
            </ItemList>
        </div>
    );
};

export default Brands;
