import { useEffect, useState } from "react";
import Card from "../../Components/Card/Card";
import axios from "axios";
import { Link } from "react-router-dom";
import Loader from "../../Components/Loader/Loader";

const Blogs = () => {
    const [blog, setBlog] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({
        message: "",
        status: false,
    });

    useEffect(() => {
        const fetchBlogs = async () => {
            setLoading(true);
            try {
                const blogs = await axios.get(`${import.meta.env.VITE_SERVER_URL}posts/`);
                setBlog(blogs.data);
            } catch (error) {
                setError({
                    message: "Unable to fetch the data from server, please re-connect",
                    status: true,
                });
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    return (
        <div>
            {loading ? (
                <div className="flex justify-center items-center h-screen">
                    <Loader />
                </div>
            ) : error.status ? (
                <div className="flex justify-center items-center h-screen text-5xl text-blue-500 font-medium">
                    {error.message}
                </div>
            ) : (
                <div className="flex flex-row gap-10 flex-wrap p-6 justify-center">
                    {blog.map((item) => (
                        <Link key={item._id} to={`/blog/${item._id}`}>
                            <Card
                                title={item.title}
                                desc={item.desc}
                                username={item.username}
                                img={item.img}
                            />
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Blogs;
