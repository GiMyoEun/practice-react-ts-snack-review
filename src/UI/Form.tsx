const Form: React.FC<{ children: any }> = (props) => {
    return (
        <div className="basic-N37">
            <div className="contents-inner">
                <div className="contents-container container-md">
                    <div className="form-group form-line">{props.children}</div>
                </div>
            </div>
        </div>
    );
};
export default Form;
