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
}

export interface NavItemProps {
    label: string;
    path: string;
    onClick: () => void;
}