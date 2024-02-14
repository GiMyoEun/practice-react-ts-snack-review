import { brandsActions } from './brands-slice';

import { Action, Dispatch } from '@reduxjs/toolkit';

export const fetchBrandsData = () => {
    return async (dispatch: Dispatch<Action>) => {
        const FetchData = async () => {
            const response = await fetch(`${process.env.REACT_APP_FIREBASE_URL}brands.json`);

            if (!response.ok) {
                throw new Error('Could not fetch brands data!');
            }

            const data = await response.json();

            return data;
        };

        try {
            const brandsData = await FetchData();
            let newArr: {}[] = [];

            Object.keys(brandsData).map((key: string) => {
                newArr.push({
                    id: brandsData[key].id,
                    name: brandsData[key].name,
                });
            });

            dispatch(
                brandsActions.replaceBrands({
                    items: newArr || [],
                })
            );
        } catch (error) {
            throw new Error('브랜드를 가져오는데에 실패하였습니다');
        }
    };
};
