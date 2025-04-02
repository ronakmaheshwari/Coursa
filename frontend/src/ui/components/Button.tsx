interface Schema {
    title: string;
    onClick: () => void;
}

export default function Button({title,onClick}:Schema){
    return(
        <button type="button" className="text-white w-full h-10 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2" onClick={onClick}>{title}</button>
    )
}