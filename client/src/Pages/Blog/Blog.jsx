import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../Components/Loader/Loader";

const Blog = () => {
    const [blog, setBlog] = useState({});
    const [loading, setLoading] = useState(false)
    const params = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const res = await axios.get(`${import.meta.env.SERVER_URL}posts/${params.id}`);
                setBlog(res.data);
                if (res.data === null) {
                    navigate('/notfound')
                }
            } catch (error) {
                navigate('/notfound')
            } finally {
                setLoading(false)
            }
        };

        fetchData();
    }, [params.id]);

    return (
        <div>
            {loading ? (
                <div className="flex justify-center items-center h-screen">
                    <Loader />
                </div>
            )
                : (
                    <div className="flex flex-col p-8">
                        <div className="flex w-full">
                            <div className="w-[60rem] h-[25rem] shadow-2xl shadow-blue-500/60">
                                <img src={blog.img} alt={blog.title} className="h-full w-full object-cover" />
                            </div>
                            <div className="ml-4 flex items-center">
                                <div className="flex flex-col">
                                    <h1 className="text-6xl font-bold text-blue-500 mb-4">{blog.title}</h1>
                                    <p className="text-blue-500 text-right text-4xl">By: {blog.username}</p>
                                </div>
                            </div>
                        </div>
                        <p className="text-blue-500 font-semibold text-5xl mt-5">{blog.desc}</p>
                        <div className="mt-6 text-2xl text-gray-600">{blog.content}</div>
                    </div>
                )
            }
        </div>
    );
};

export default Blog;
