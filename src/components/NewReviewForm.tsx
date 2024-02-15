import { useState, useContext } from 'react';
import { ModalContext, ModalType } from '../store/ModalContext';
import { IRootState } from '../store';
import { useSelector } from 'react-redux';
import useHttp from '../hooks/useHttps';
import Button from '../UI/Button';
import Input from '../UI/Input';
import SelectBox from '../UI/SelectBox';
import Modal from '../UI/Modal';
import Form from '../UI/Form';
import SnackStar from './SnackStar';

const requestConfigSubmit = {
    method: 'POST',
    headers: {
        'Content-Type': 'text/plain',
    },
};

type formDataType = {
    brand: string;
    name: string;
    image: string;
};

export default function NewReviewForm() {
    const brandsItems: {}[] = useSelector((state: IRootState) => state.brands.items);
    const modalCtx = useContext<ModalType>(ModalContext);
    const [formIsValid, setFormIsValid] = useState<boolean | undefined>();
    const [formData, setFormData] = useState<formDataType>({
        brand: '',
        name: '',
        image: '',
    });

    const {
        data: submitResData,
        isLoading: isSending,
        error: errorSubmitForm,
        sendRequest,
        clearData,
    } = useHttp(`${process.env.REACT_APP_FIREBASE_URL}snacks.json`, requestConfigSubmit, []);

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
        actions = <p className="modal-actions">정보 저장에 성공하였습니다</p>;
        setTimeout(() => {
            handleClose();
        }, 1000);
    }

    const handleClose = () => {
        clearData();
        setFormData({
            brand: '',
            name: '',
            image: '',
        });
        setFormIsValid(undefined);

        modalCtx.hideModal();
    };

    const submitHandler = () => {
        //event.preventDefault();

        if (!formData['brand'] || !formData['name'] || !formData['image']) {
            setFormIsValid(false);
            return;
        } else {
            setFormIsValid(true);
        }

        sendRequest(JSON.stringify(formData));
    };

    const changeFormDataHandler = (value: string, type: string) => {
        setFormData((prevFormData) => {
            return { ...prevFormData, [type]: value };
        });
    };

    return (
        <Modal open={modalCtx.progress} onClose={handleClose}>
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
                    닫기
                </button>
                <button type="button" onClick={submitHandler} disabled={isSending} className="btnset-save">
                    저장
                </button>
            </Form>
        </Modal>
    );
}
