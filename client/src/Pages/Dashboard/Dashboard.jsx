import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DeleteModal from "../../Components/Modals/DeleteModal";
import EditModal from "../../Components/Modals/EditModal";
import NewPostModal from "../../Components/Modals/NewPostModal";
import Loader from "../../Components/Loader/Loader";

const Dashboard = () => {
    const user = useSelector((state) => state.user);
    const [blogs, setBlogs] = useState([]);

    const [loading, setLoading] = useState(false);

    const [deleteModal, setDeleteModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [newPostModal, setNewPostModal] = useState(false);

    const [editId, setEditId] = useState(null);
    const [deleteId, setDeleteId] = useState(null);

    const [message, setMessage] = useState({
        message: "",
        status: true,
    });

    const token = useSelector((state) => state.user.token);

    const fetchData = useCallback(async () => {
        setLoading(true)
        try {
            const res = await axios.get(`${import.meta.env.SERVER_URL}posts/`, {
                params: {
                    username: user.name,
                },
            });
            setBlogs(res.data);
        } catch (error) {
            setMessage({
                message: "Unable to fetch the data, try again later",
                status: true,
            });
        } finally {
            setLoading(false)
        }
    }, [user.name]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleEdit = (blogId) => {
        setEditId(blogId);
        setEditModal(true);
    };

    const handleUpdate = async (blog) => {
        setLoading(true)
        try {
            await axios.put(`${import.meta.env.SERVER_URL}posts/update/${editId}`, blog, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setMessage({
                message: "Blog updated!",
                status: true,
            });
            fetchData();
        } catch (error) {
            setMessage({
                message: "Unable to edit, try again later",
                status: true,
            });
        } finally {
            setEditModal(false);
            setLoading(false)
        }
    };

    const handleConfirmation = (delId) => {
        setDeleteId(delId);
        setDeleteModal(true);
    };

    const handleDelete = async () => {
        setLoading(true)
        try {
            await axios.delete(`${import.meta.env.SERVER_URL}posts/${deleteId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setMessage({
                message: "Post deleted!",
                status: true,
            });
            fetchData();
        } catch (error) {
            setMessage({
                message: "Unable to delete the post, try again later",
                status: true,
            });
        } finally {
            setLoading(false)
            setDeleteModal(false);
        }
    };

    const handleCreateNewPost = async (newPost) => {
        setLoading(true)
        try {
            await axios.post(
                `${import.meta.env.SERVER_URL}posts/add/`,
                {
                    ...newPost,
                    username: user.name,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setMessage({
                message: "New post created!",
                status: true,
            });
            fetchData();
        } catch (error) {

            setMessage({
                message: "Unable to add new post, try again later",
                status: true,
            });
        } finally {
            setLoading(false)
            setNewPostModal(false);
        }
    };

    return (
        <div>
            {
                loading ? (
                    <div className="h-screen flex justify-center items-center">
                        <Loader />
                    </div>
                )
                    : (
                        <div className="p-4 flex flex-row gap-10 w-full justify-between">
                            <div className="flex flex-col gap-10">
                                <div className="flex flex-col gap-5 p-4 rounded-xl bg-white h-max shadow-xl shadow-blue-500/40 w-[25rem]">
                                    <div className="text-2xl font-medium">Your Profile</div>
                                    <div className="flex flex-row gap-5 items-center">
                                        <div className="h-20 w-20 overflow-hidden rounded-full">
                                            <img
                                                src={"/avatar.jpg"}
                                                alt="Avatar"
                                                className="object-contain h-full w-full"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <div className="text-xl">{user.name}</div>
                                            <div className="text-gray-400">{user.email}</div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="flex flex-row justify-between">
                                        Number of Posts{" "}
                                        <span className="text-blue-500">{blogs.length}</span>
                                    </div>
                                </div >
                                <div className="flex px-4 w-max rounded-full shadow-lg shadow-blue-500/50 hover:shadow-blue-500/70 cursor-pointer">
                                    <div
                                        className="flex flex-row gap-5 items-center "
                                        onClick={() => setNewPostModal(true)}
                                    >
                                        <div className="text-xl font-medium">Create New Post</div>
                                        <div className="p-2 rounded-full text-lg">✒️</div>
                                    </div>
                                </div>
                                {
                                    message.status && (
                                        <div className="text-lg font-medium text-blue-500 px-4">
                                            {message.message}
                                        </div>
                                    )
                                }
                            </div >
                            <div className="flex-1 flex flex-col gap-10 items-center">
                                {blogs.length > 0 ? (
                                    blogs.map((item) => (
                                        <div
                                            key={item._id}
                                            className="flex flex-row gap-5 justify-center items-center rounded-xl shadow-xl shadow-blue-500/40 p-4 w-[75%]"
                                        >
                                            <div className="h-[12rem] w-[30rem] rounded-xl overflow-hidden">
                                                <img
                                                    src={item.img}
                                                    alt="Img"
                                                    className="h-full w-full object-cover"
                                                />
                                            </div>
                                            <div className="flex flex-col gap-5 my-2">
                                                <div className="text-xl font-medium text-blue-500">
                                                    {item.title}
                                                </div>
                                                <div className="text-base font-medium text-blue-500/40">
                                                    {item.desc}
                                                </div>
                                                <div className="flex flex-row w-full justify-end gap-5 text-sm">
                                                    <button
                                                        className="px-4 py-1 rounded-full border-2 hover:text-white hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/40 border-blue-500"
                                                        onClick={() => handleEdit(item._id)}
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        className="px-4 py-1 rounded-full border-2 hover:text-white hover:bg-red-500 hover:shadow-lg hover:shadow-red-500/40 border-red-500"
                                                        onClick={() => handleConfirmation(item._id)}
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                            {editModal && (
                                                <EditModal
                                                    blogId={editId}
                                                    onSubmit={handleUpdate}
                                                    onClose={() => setEditModal(false)}
                                                />
                                            )}
                                            {deleteModal && (
                                                <DeleteModal
                                                    onSubmit={handleDelete}
                                                    onClose={() => setDeleteModal(false)}
                                                />
                                            )}
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-blue-500 font-medium text-4xl flex h-screen justify-center items-center">
                                        It feels empty, start blogging now ✒️
                                    </div>
                                )}
                                {newPostModal && (
                                    <NewPostModal
                                        onSubmit={handleCreateNewPost}
                                        onClose={() => setNewPostModal(false)}
                                    />
                                )}
                            </div>
                        </div >
                    )
            }
        </div >
    );
};

export default Dashboard;
