export interface ImageInputProps {
    entityUrl?: string;
    entityId?: string;
    onImageUpload: (file: File) => void;
}

export interface MessageProps {
    color: string;
    text: string;
}