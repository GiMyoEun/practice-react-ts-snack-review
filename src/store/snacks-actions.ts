import { snacksActions } from './snacks-slice';
import { Action, Dispatch } from '@reduxjs/toolkit';
import { snackReviewType } from '../components/SnackReviews';

export const fetchSnacksData = () => {
    return async (dispatch: Dispatch<Action>) => {
        const FetchData = async () => {
            const response = await fetch(`${process.env.REACT_APP_FIREBASE_URL}snacks.json`);

            if (!response.ok) {
                throw new Error('Could not fetch brands data!');
            }

            const data = await response.json();

            return data;
        };
        try {
            const snacksData = await FetchData();
            let newArr: {}[] = [];

            Object.keys(snacksData).map((key: string) => {
                newArr.push({
                    id: key.toString(),
                    brand: snacksData[key].brand,
                    image: snacksData[key].image,
                    name: snacksData[key].name,
                });
            });

            dispatch(
                snacksActions.replaceSnacks({
                    items: newArr || [],
                })
            );
        } catch (error) {
            throw new Error('스낵을 가져오는데에 실패하였습니다');
        }
    };
};

export const fetchSnackReviewData = (id: string) => {
    return async (dispatch: Dispatch<Action>) => {
        const FetchData = async () => {
            const response = await fetch(`${process.env.REACT_APP_FIREBASE_URL}/reviews/${id}.json`);

            if (!response.ok) {
                throw new Error('Could not fetch brands data!');
            }

            const data = await response.json();

            return data;
        };
        try {
            const reviewData = await FetchData();
            let newArr: {}[] = [];

            Object.keys(reviewData).map((key: string) => {
                newArr.push({
                    id: key.toString(),
                    comment: reviewData[key].comment,
                });
            });

            dispatch(
                snacksActions.replaceSnackReview({
                    items: newArr || [],
                })
            );
        } catch (error) {
            dispatch(
                snacksActions.replaceSnackReview({
                    items: [],
                })
            );
        }
    };
};

export const deleteSnackReview = (url: string) => {
    return async (dispatch: Dispatch<Action>) => {
        const FetchData = async () => {
            const requestConfigSubmit = {
                method: 'DELETE',
                headers: {
                    'Access-Control-Allow-Origin': process.env.REACT_APP_FIREBASE_URL!,
                    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Z-Key',
                },
            };

            const response = await fetch(url, requestConfigSubmit);

            if (!response.ok) {
                throw new Error('Could not delete Snack Review!');
            }

            const data = await response.json();
            return 'Success';
        };
        try {
            const reviewData = await FetchData();
        } catch (error) {
            throw new Error('스낵리뷰를 삭제하는데에 실패하였습니다');
        }
    };
};

export const updateSnackReviewsTemp = (snackReview: snackReviewType) => {
    return async (dispatch: Dispatch<Action>) => {
        dispatch(snacksActions.updateSnackReviewsTemp(snackReview));
        console.log('저장성공');
    };
};
