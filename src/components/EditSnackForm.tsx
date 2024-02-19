import Modal from '../UI/Modal';
import { formDataType } from './NewReviewForm';
import { useState } from 'react';
import Form from '../UI/Form';
import SelectBox from '../UI/SelectBox';
import { IRootState } from '../store';
import { useSelector } from 'react-redux';
import Input from '../UI/Input';
import Confirm from '../UI/Comfirm';
import useHttp from '../hooks/useHttps';
import { PiShareFatFill } from 'react-icons/pi';

import { PiXCircleFill } from 'react-icons/pi';

type EditSnackFormType = {
    isEditing: boolean;
    brandName: string;
    name: string;
    image: string;
    brand: string;
    id: string;
    cancelEditing: () => void;
    onSuccessEditing: (item: formDataType) => void;
};

const updateConfig: {} = {
    method: 'PUT',
    headers: {
        'Content-Type': 'text/plain',
        withCredentials: true,
    },
};

const EditSnackForm: React.FC<EditSnackFormType> = (props) => {
    const [formIsValid, setFormIsValid] = useState<boolean | undefined>();
    const brandsItems: {}[] = useSelector((state: IRootState) => state.brands.items);
    const [showConfirm, setShowConfirm] = useState(false);
    const [confirmMessage, setConfirmMessage] = useState('');
    const [formData, setFormData] = useState<formDataType>({
        brand: props.brand,
        name: props.name,
        image: props.image,
    });

    const changeFormDataHandler = (value: string, type: string) => {
        setFormData((prevFormData) => {
            return { ...prevFormData, [type]: value };
        });
    };

    const {
        data: submitResData,
        isLoading: isSending,
        error: errorSubmitForm,
        sendRequest,
        clearData,
    } = useHttp(`${process.env.REACT_APP_FIREBASE_URL}snacks/${props.id}.json`, updateConfig, []);

    let actions = <p className="modal-actions"></p>;
    if (isSending) {
        actions = <p className="modal-actions">저장중...</p>;
    }
    if (errorSubmitForm) {
        actions = <p className="modal-actions">저장에 실패하였습니다</p>;
    }
    if (!formIsValid && formIsValid !== undefined) {
        actions = <p className="modal-actions">모든 정보를 입력해주세요</p>;
    }
    if (submitResData && submitResData['message'] && !errorSubmitForm) {
        props.onSuccessEditing({ name: formData.name, image: formData.image, brand: formData.brand });
        setTimeout(() => {
            clearData();
        }, 1000);
    }

    const submitHandler = () => {
        //event.preventDefault();

        if (!formData['brand'] || !formData['name'] || !formData['image']) {
            setFormIsValid(false);
            return;
        } else {
            setFormIsValid(true);
            setShowConfirm(true);
            setConfirmMessage('저장하시겠습니까?');
        }
    };
    const handleClose = () => {
        clearData();
        setFormData({
            brand: props.brand,
            name: props.name,
            image: props.image,
        });
        setFormIsValid(undefined);

        props.cancelEditing();
    };

    const saveSnackHandler = () => {
        setShowConfirm(false);
        setConfirmMessage('');
        sendRequest(
            JSON.stringify({
                brand: formData.brand,
                name: formData.name,
                image: formData.image,
            })
        );
    };

    const denySubmitHandler = () => {
        setShowConfirm(false);
        setConfirmMessage('');
        return;
    };

    return (
        <>
            <Confirm
                showConfirm={showConfirm}
                message={confirmMessage}
                onConfirm={saveSnackHandler}
                onCloseConfirm={denySubmitHandler}
            />
            <Modal open={props.isEditing} onClose={handleClose}>
                <Form>
                    <h2>New Snack!</h2>
                    <p>아래 양식을 입력하세요</p>

                    <div className="inputset inputset-line inputset-lg inputset-label">
                        <label htmlFor="brand">
                            <h6 className="inputset-tit">
                                브랜드
                                <span>*</span>
                            </h6>
                            <SelectBox
                                id="brand"
                                name="brand"
                                data={brandsItems}
                                value={formData.brand}
                                onChange={changeFormDataHandler}
                            />
                        </label>
                    </div>

                    <Input
                        label="과자이름"
                        id="name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={changeFormDataHandler}
                    />

                    <Input
                        label="이미지링크"
                        id="image"
                        type="url"
                        name="image"
                        value={formData.image}
                        onChange={changeFormDataHandler}
                    />

                    {actions}

                    <button type="button" onClick={handleClose} disabled={isSending} className="btnset-save">
                        <PiXCircleFill />
                    </button>
                    <button type="button" onClick={submitHandler} disabled={isSending} className="btnset-save">
                        <PiShareFatFill />
                    </button>
                </Form>
            </Modal>
        </>
    );
};

export default EditSnackForm;
