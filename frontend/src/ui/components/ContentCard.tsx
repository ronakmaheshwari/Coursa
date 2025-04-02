interface Schema {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
    price: number;
    authorName: string;
    onClick?: () => void;
}

export default function ContentCard({ title, description, imageUrl, price, authorName, onClick }: Schema) {
    return (
        <div className="flex flex-col w-[350px] h-[450px] bg-white shadow-md rounded-lg overflow-hidden p-4 transition-transform duration-300 hover:scale-105 hover:shadow-xl">

            <img src={imageUrl} alt={title} className="w-full h-48 object-cover rounded-md" />
            
            <h3 className="text-lg font-semibold mt-3 text-gray-900 truncate">{title}</h3>

            <p className="text-sm text-gray-600 mt-1 line-clamp-3">
                {description.length > 200 ? description.substring(0, 200) + "..." : description}
            </p>

            <div className="flex justify-between items-center mt-14"> 
                <h4 className="text-lg font-bold text-black">${price}</h4>
                <p className="text-sm text-gray-500 truncate">by {authorName}</p>
            </div>
            <button 
                className="mt-2 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-all"
                onClick={onClick}
            >
                Get the Course
            </button>
        </div>
    );
}

