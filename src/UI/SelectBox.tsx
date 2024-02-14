type SelectType = {
    id: string;
    name: string;
    data: {}[];
    value: string;
    onChange: (value: string, type: string) => void;
};

export type BrandType = {
    id?: string;
    name?: string;
};

const SelectBox: React.FC<SelectType> = (props) => {
    return (
        <select
            className="inputset-input form-control"
            id={props.id}
            name={props.name}
            value={props.value}
            onChange={(event) => props.onChange(event.currentTarget.value, props.name)}
        >
            <option value="">선택</option>
            {props.data.map((item: BrandType) => (
                <option key={item.id} value={item.id}>
                    {item.name}
                </option>
            ))}
        </select>
    );
};
export default SelectBox;
