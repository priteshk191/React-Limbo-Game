export const INITIAL_TARGET_MUL = 1.01

export const generateRandom = () => {
    const randomNumber = Math.floor(Math.random() * 399) + 101;
    return randomNumber / 100;
};

export function formatDateString(dateString: string): string {
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }
    const formattedDate = new Date(dateString).toLocaleDateString(
        undefined,
        options
    )
    return formattedDate
}

export const formatNumber = (number: number): string => {
    return parseFloat(number.toFixed(12)).toString();
};