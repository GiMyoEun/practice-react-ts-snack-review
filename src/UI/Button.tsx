type ButtonType = {
    onClick?: (event?: React.FormEvent) => void;
    label: string;
    type: string;
    disabled?: boolean;
};

const Button: React.FC<ButtonType> = (props) => {
    let disabled = props.disabled;
    if (!props.disabled) {
        disabled = false;
    }

    return (
        <button className="button" onClick={props.onClick} disabled={disabled}>
            {props.label}
        </button>
    );
};
export default Button;
