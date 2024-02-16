import { useState, useEffect, useCallback } from 'react';

async function sendHttpRequest(url: string, config: {}) {
    const response = await fetch(url, config);

    const resData = await response.json();
    if (resData) {
        resData['message'] = 'Success to fetch Data';
    }

    if (!response.ok) {
        throw new Error(resData.message || 'Failed to fetch data');
    }

    return resData || { message: 'success' };
}

export default function useHttp(url: string, config: { method?: string }, initialData: any) {
    const [data, setData] = useState<any>(initialData);
    const [error, setError] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    function clearData() {
        setData(initialData);
        setError('');
    }

    const sendRequest = useCallback(
        async function sendRequest(data?: any) {
            setIsLoading(true);

            try {
                const resData = await sendHttpRequest(url, { ...config, body: data });

                setData(resData);
            } catch (error: any) {
                setError(error.message || 'Failed to fetch data');
            }
            setIsLoading(false);
        },
        [url, config]
    );

    useEffect(() => {
        if ((config && (config.method === 'GET' || !config.method)) || !config) {
            sendRequest();
        }
    }, [sendRequest, config]);

    return {
        data,
        isLoading,
        error,
        sendRequest,
        clearData,
    };
}
