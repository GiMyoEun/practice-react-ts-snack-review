import { snacksActions } from './snacks-slice';
import { Action, Dispatch } from '@reduxjs/toolkit';

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
            let i = 0;
            let sum = 0;

            Object.keys(reviewData).map((key: string) => {
                i++;
                sum += reviewData[key].star || 0;
                newArr.push({
                    id: key.toString(),
                    comment: reviewData[key].comment,
                    star: reviewData[key].star || 0,
                });
            });
            let aver = Math.ceil(sum / i);

            dispatch(
                snacksActions.replaceSnackReview({
                    items: newArr || [],
                })
            );
            dispatch(
                snacksActions.replaceStarAver({
                    starAver: aver || 0,
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

// export const updateSnackReviewTemp = (
//     snackId: string,
//     reviewId: string,
//     updateDataObj: { comment: string; star: number },
//     oldReviewList: snackReviewType[]
// ) => {
//     return async (dispatch: Dispatch<Action>) => {
//         const FetchData = async () => {
//             const updateConfig: {} = {
//                 method: 'PUT',
//                 headers: {
//                     'Content-Type': 'text/plain',
//                     withCredentials: true,
//                 },
//             };

//             const response = await fetch(`${process.env.REACT_APP_FIREBASE_URL}reviews/${snackId}/${reviewId}.json`, {
//                 ...updateConfig,
//                 body: JSON.stringify(updateDataObj),
//             });

//             if (!response.ok) {
//                 throw new Error('Could not update review data!');
//             }

//             const data = await response.json();

//             return data;
//         };
//         try {
//             const reviewData = await FetchData();
//             const newReviewList = oldReviewList.map((item) => {
//                 if (item.id === reviewId) {
//                     item.comment = updateDataObj.comment;
//                     item.star = updateDataObj.star;
//                 }
//                 return item;
//             });

//             dispatch(
//                 snacksActions.replaceSnackReview({
//                     items: newReviewList || [],
//                 })
//             );
//         } catch (error) {
//             throw new Error('스낵리뷰를 수정하는데에 실패하였습니다');
//         }
//     };
// };

export const updateSnackReviewsTemp = (newList: { id: string; comment: string; star: number }[]) => {
    return async (dispatch: Dispatch<Action>) => {
        dispatch(
            snacksActions.replaceSnackReview({
                items: newList || [],
            })
        );
        console.log('저장성공');
    };
};

export const updateSnacksTemp = (
    newList: {
        id: string;
        brand: string;
        image: string;
        name: string;
    }[]
) => {
    return async (dispatch: Dispatch<Action>) => {
        dispatch(
            snacksActions.replaceSnacks({
                items: newList || [],
            })
        );
        console.log('저장성공');
    };
};

export const setInitSnackReviews = () => {
    return async (dispatch: Dispatch<Action>) => {
        dispatch(snacksActions.setInitSnackReviews());
    };
};

export const fetchSnackReviewDataQuantity = (id: string) => {
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

            let i = 0;

            Object.keys(reviewData).map((key: string) => {
                i++;
            });

            dispatch(
                snacksActions.setRiveiwsCount({
                    reviewsCount: i,
                })
            );
        } catch (error) {
            dispatch(
                snacksActions.setRiveiwsCount({
                    reviewsCount: 0,
                })
            );
        }
    };
};
