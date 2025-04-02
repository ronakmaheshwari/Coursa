interface BoxSchema{
    type:string,
    label:string,
    placeholder:string,
    value:string,
    onChange:(e: React.ChangeEvent<HTMLInputElement>)=>void
    icon?: React.ReactNode;
}

export default function InputBox({type,label,placeholder,value,onChange}:BoxSchema){
    return(
        <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-900 ">{label}</label>
            <input type={type} placeholder={placeholder} value={value} onChange={onChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
        </div>
    )
}