import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Header from './components/Header';
import NewReviewForm from './components/NewReviewForm';
import ModalContextProvider from './store/ModalContext';
import UiContextProvider from './store/UiContext';
import { fetchBrandsData } from './store/brands-actions';
import { fetchSnacksData } from './store/snacks-actions';
import { AppDispatch } from './store';

import AllList from './components/AllList';

function App() {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(fetchBrandsData());
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchSnacksData());
    }, [dispatch]);

    return (
        <>
            <ModalContextProvider>
                <UiContextProvider>
                    <Header />
                    <main className="th-layout-main ">
                        <NewReviewForm />

                        <AllList />
                    </main>
                </UiContextProvider>
            </ModalContextProvider>
        </>
    );
}

export default App;
