// eslint-disable-next-line react/prop-types
const Card = ({ title, img, desc, username }) => {
    return (
        <div className="bg-white max-w-sm mx-auto rounded-xl shadow-2xl shadow-primary-blue/60 hover:shadow-primary-blue/90 transition-all duration-300">
            <div className="h-[20rem] overflow-hidden rounded-t-xl mb-4">
                <img src={img} alt={title} className="object-cover w-full h-full"  loading="lazy"/>
            </div>
            <div className="flex flex-col p-2 px-4">
                <div className="mb-2">
                    <h2 className="text-blue-500 text-xl font-semibold">{title}</h2>
                    <div className="text-blue-500 text-right text-lg">
                        <span className="border-[1px] border-blue-500 px-4 rounded-full">{username}</span>
                    </div>
                </div>
                <p className="text-gray-700">{desc}</p>
            </div>
        </div>
    );
};

export default Card;
