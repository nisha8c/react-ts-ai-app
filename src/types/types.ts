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