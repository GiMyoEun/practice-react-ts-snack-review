import { useState, createContext } from 'react';

export type UiContextType = {
    type: string;
    changeUi: (type: string, brand: string) => void;
    brand: string;
};

export const UiContext = createContext<UiContextType>({
    type: '',
    changeUi: () => {},
    brand: '',
});

const UiContextProvider: React.FC<{ children: React.ReactNode }> = (props) => {
    const [typeValue, setTypeValue] = useState<string>('brands');
    const [brandValue, setBrandValue] = useState<string>('');

    function changeUi(type: string, brand: string = '') {
        setTypeValue(type);
        setBrandValue(brand);
    }

    const UiCtx: UiContextType = {
        type: typeValue,
        changeUi,
        brand: brandValue,
    };

    return <UiContext.Provider value={UiCtx}>{props.children}</UiContext.Provider>;
};

export default UiContextProvider;
