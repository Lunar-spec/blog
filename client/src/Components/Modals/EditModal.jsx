/* eslint-disable react/prop-types */
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";

const EditModal = ({ blogId, onSubmit, onClose }) => {
    const [updatedBlogDetails, setUpdatedBlogDetails] = useState({
        title: '',
        desc: '',
        content: '',
        img: ''
    });

    const [message, setMessage] = useState("");

    const token = useSelector((state) => state.user.token);

    const fetchData = useCallback(async () => {
        try {
            const res = await axios.get(`${import.meta.env.SERVER_URL}posts/${blogId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setUpdatedBlogDetails({
                title: res.data.title,
                img: res.data.img,
                desc: res.data.desc,
                content: res.data.content,
            });
        } catch (error) {
            setMessage('Error in fetching the Blog, try again later')
        }
    }, [blogId, token])

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(updatedBlogDetails);
    };

    return (
        <div className="fixed bg-black/40 inset-0 flex items-center justify-center flex-col">
            <form
                onSubmit={handleSubmit}
                className="flex flex-col items-center gap-5 rounded-2xl p-4 py-8 bg-white w-1/2 h-max shadow-2xl shadow-blue-500/50"
            >
                <div className="text-4xl font-medium">Update your Blog here</div>
                <div className="flex flex-col w-full gap-5">
                    <input
                        type="text"
                        required
                        onChange={(e) =>
                            setUpdatedBlogDetails((prev) => ({
                                ...prev,
                                title: e.target.value,
                            }))
                        }
                        value={updatedBlogDetails.title}
                        className="px-4 py-3 bg-gray-400/30 rounded-lg w-full focus-visible:outline-blue-500/60 text-lg"
                    />
                    <input
                        type="text"
                        required
                        onChange={(e) =>
                            setUpdatedBlogDetails((prev) => ({
                                ...prev,
                                img: e.target.value,
                            }))
                        }
                        value={updatedBlogDetails.img}
                        className="px-4 py-3 bg-gray-400/30 rounded-lg w-full focus-visible:outline-blue-500/60 text-lg"
                    />
                    <textarea
                        type="text"
                        required
                        onChange={(e) =>
                            setUpdatedBlogDetails((prev) => ({
                                ...prev,
                                desc: e.target.value,
                            }))
                        }
                        value={updatedBlogDetails.desc}
                        className="px-4 py-3 bg-gray-400/30 rounded-lg w-full focus-visible:outline-blue-500/60 text-lg"
                    />
                    <textarea
                        type="text"
                        rows={7}
                        required
                        onChange={(e) =>
                            setUpdatedBlogDetails((prev) => ({
                                ...prev,
                                content: e.target.value,
                            }))
                        }
                        value={updatedBlogDetails.content}
                        className="px-4 py-3 bg-gray-400/30 rounded-lg w-full focus-visible:outline-blue-500/60 text-lg"
                    />
                </div>
                <div className="w-full flex flex-row justify-end gap-5">
                    <button
                        type="submit"
                        className="px-4 py-1 rounded-full text-lg hover:shadow-lg hover:shadow-blue-500/40 bg-blue-500 text-white"
                    >
                        Update
                    </button>
                    <button
                        onClick={onClose}
                        className="px-4 py-1 rounded-full text-lg hover:shadow-lg hover:shadow-blue-500/40 border-2 border-blue-500 text-blue-500"
                    >
                        Cancel
                    </button>
                </div>
                {message !== "" && <div className="p-2 text-blue-500">{message}</div>}
            </form>
        </div>
    );
};

export default EditModal;
