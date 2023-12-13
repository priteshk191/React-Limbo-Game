import { betReqPayload } from 'utils/common/interface';

const BASE_URL = 'https://654ce8c277200d6ba859aa05.mockapi.io';

export const placeBet = async (betData: betReqPayload, updateState: Function) => {
    try {
        const response = await fetch(`${BASE_URL}/bet`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(betData),
        });
        if (response.ok) {
            console.log('Bet placed successfully!');
        } else {
            console.error('Failed to place bet:', response.status, response.statusText);
        }
    } catch (error) {
        console.error('Error:', error);
    }
};

export const getBetData = async () => {
    try {
        const response = await fetch(`${BASE_URL}/bet`);
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            console.error('Failed to fetch data:', response.status, response.statusText);
            return null;
        }
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
};