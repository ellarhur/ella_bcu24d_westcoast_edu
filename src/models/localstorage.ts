// localStorage.ts
export const addToStorage = (key: string, data: any): void => {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
        console.error('Failed to add to localStorage:', error);
    }
};

export const getFromStorage = (key: string): any => {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    } catch (error) {
        console.error('Failed to get from localStorage:', error);
        return null;
    }
};

export const removeFromStorage = (key: string): void => {
    try {
        localStorage.removeItem(key);
    } catch (error) {
        console.error('Failed to remove from localStorage:', error);
    }
};