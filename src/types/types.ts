export interface ICountry {
    name: string;
    capital: string;
    imgUrl: any;
    level: string;
}

export interface SimpleDialogProps {
    open: boolean;
    onClose: () => void;
    text: string,
    titleText: string
}

export interface GameState {
    gameHistory: any[]; // You can replace 'any' with a more specific type if needed
    isPaused: boolean;
}

export interface CardProps {
    image?: string;
    title?: string;
    description?: string;
}

export interface GameEntry {
    level: string | null;
    score: number;
    timestamp: string;
}