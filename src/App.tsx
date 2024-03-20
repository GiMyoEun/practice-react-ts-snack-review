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

    const reFetchSnacksHandler = () => {
        dispatch(fetchSnacksData());
    };

    return (
        <>
            <ModalContextProvider>
                <UiContextProvider>
                <Header />
                    <main className="th-layout-main ">
                        <div className="th-layout-main-div">
                        
                        <NewReviewForm onSubmit={reFetchSnacksHandler} />

                        <AllList />
                        </div>
                    </main>
                </UiContextProvider>
            </ModalContextProvider>
        </>
    );
}

export default App;
