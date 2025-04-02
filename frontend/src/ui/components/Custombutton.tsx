import { ReactElement } from "react";

interface CustomButtonProps {
    title: string;
    onClick: () => void;
    className?: string;
    icon? : ReactElement
}

export default function CustomButton({ title, onClick, className, icon }: CustomButtonProps) {
    return (
        <button 
            className={className} 
            onClick={onClick}
        >
            {icon && <span className="mr-2">{icon}</span>}
            {title}
        </button>
    );
}
