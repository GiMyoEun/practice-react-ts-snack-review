type Error = {
    title: string;
    message: string;
};

const Error: React.FC<Error> = (props) => {
    return (
        <div className="error">
            <h2>{props.title}</h2>
            <p>{props.message}</p>
        </div>
    );
};

export default Error;
