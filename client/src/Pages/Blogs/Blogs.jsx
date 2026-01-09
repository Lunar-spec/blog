import { useEffect, useState, useCallback } from "react";
import Card from "../../Components/Card/Card";
import axios from "axios";
import { Link } from "react-router-dom";
import Loader from "../../Components/Loader/Loader";

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true); // Only true on initial load
    const [error, setError] = useState({
        message: "",
        status: false,
    });
    const [searchQuery, setSearchQuery] = useState("");
    const [isSearching, setIsSearching] = useState(false);

    // Fetch all blogs
    const fetchBlogs = useCallback(async () => {
        setError({ message: "", status: false });
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_SERVER_URL}posts/`
            );
            setBlogs(response.data);
        } catch (error) {
            setError({
                message: "Unable to fetch data from server, please re-connect",
                status: true,
            });
        } finally {
            setLoading(false);
        }
    }, []);

    // Search blogs with debouncing
    const searchBlogs = useCallback(async (query) => {
        if (!query.trim()) {
            setIsSearching(false);
            fetchBlogs();
            return;
        }

        setIsSearching(true);
        setError({ message: "", status: false });

        try {
            const response = await axios.get(
                `${import.meta.env.VITE_SERVER_URL}posts/search/title?q=${query}`
            );

            if (response.data.length === 0) {
                setError({
                    message: "No posts found matching your query",
                    status: true,
                });
            }

            setBlogs(response.data);
        } catch (error) {
            setError({
                message: "Error searching posts",
                status: true,
            });
            setBlogs([]);
        }
    }, [fetchBlogs]);

    // Handle input change
    const handleInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    // Handle clear search
    const handleClearSearch = () => {
        setSearchQuery("");
        setIsSearching(false);
        setError({ message: "", status: false });
    };

    // Initial load
    useEffect(() => {
        fetchBlogs();
    }, [fetchBlogs]);

    // Debounced search on query change
    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            if (searchQuery || isSearching) {
                searchBlogs(searchQuery);
            }
        }, 300);

        return () => clearTimeout(delayDebounce);
    }, [searchQuery, searchBlogs, isSearching]);

    return (
        <div>
            {/* Search Bar */}
            <div className="flex items-center justify-center sticky top-5 w-full bg-transparent z-10 py-4">
                <div className="flex items-center justify-between w-1/2 bg-white px-2 py-1 shadow-lg rounded-full">
                    <input
                        value={searchQuery}
                        onChange={handleInputChange}
                        type="text"
                        className="w-full outline-none px-2 py-1 bg-transparent rounded-full"
                        placeholder="Search posts..."
                    />
                    {isSearching && searchQuery && (
                        <button
                            type="button"
                            onClick={handleClearSearch}
                            className="text-xl mr-2 hover:opacity-70 transition-opacity"
                            aria-label="Clear search"
                        >
                            ✖️
                        </button>
                    )}
                    <div className="text-2xl px-2">
                        🔎
                    </div>
                </div>
            </div>

            {/* Error Message */}
            {error.status && (
                <div className="flex justify-center items-center h-screen text-5xl text-blue-500 font-medium">
                    {error.message}
                </div>
            )}

            {/* Loading State - Only on initial load */}
            {loading ? (
                <div className="flex justify-center items-center h-screen">
                    <Loader />
                </div>
            ) : (
                /* Blog Cards */
                !error.status && (
                    <div className="flex flex-row gap-10 flex-wrap p-6 justify-center">
                        {blogs.map((blog) => (
                            <Link key={blog._id} to={`/blog/${blog._id}`}>
                                <Card
                                    title={blog.title}
                                    desc={blog.desc}
                                    username={blog.username}
                                    img={blog.img}
                                />
                            </Link>
                        ))}
                    </div>
                )
            )}
        </div>
    );
};

export default Blogs;