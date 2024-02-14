type InputType = {
    label: string;
    id: string;
    type: string;
    name: string;
    value: string;
    onChange: (value: string, type: string) => void;
    required?: boolean;
};

const Input: React.FC<InputType> = ({ label, ...props }) => {
    return (
        <div className="inputset inputset-line inputset-lg inputset-label">
            <label htmlFor={props.id}>
                <h6 className="inputset-tit">
                    {label}
                    <span>*</span>
                </h6>

                <input
                    className="inputset-input form-control"
                    {...props}
                    onChange={(event) => {
                        props.onChange(event.currentTarget.value, props.name);
                    }}
                />
            </label>
        </div>
    );
};

export default Input;
