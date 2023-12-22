/* eslint-disable react/prop-types */
import { useState } from "react";

const NewPostModal = ({ onSubmit, onClose }) => {
    const [newPost, setNewPost] = useState({
        title: "",
        desc: "",
        img: "",
        content: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(newPost);
    };

    return (
        <div className="inset-0 fixed flex justify-center items-center bg-black/60 h-screen w-full flex-col">
            <form
                onSubmit={handleSubmit}
                className="bg-white rounded-lg shadow-2xl shadow-blue-500/40 p-4 flex justify-center items-center flex-col w-1/2 gap-5"
            >
                <div className="text-4xl font-medium">Create Blog</div>
                <input
                    type="text"
                    required
                    className="px-4 py-3 bg-gray-400/30 rounded-lg w-full focus-visible:outline-blue-500/60 text-lg"
                    onChange={(e) => setNewPost((newPost) => ({
                        ...newPost,
                        title: e.target.value
                    }))}
                    placeholder="Title"
                />
                <input
                    type="text"
                    required
                    className="px-4 py-3 bg-gray-400/30 rounded-lg w-full focus-visible:outline-blue-500/60 text-lg"
                    onChange={(e) => setNewPost((newPost) => ({
                        ...newPost,
                        desc: e.target.value
                    }))}
                    placeholder="Description"
                />
                <input
                    type="text"
                    required
                    className="px-4 py-3 bg-gray-400/30 rounded-lg w-full focus-visible:outline-blue-500/60 text-lg"
                    onChange={(e) => setNewPost((newPost) => ({
                        ...newPost,
                        img: e.target.value
                    }))}
                    placeholder="Image"
                />
                <textarea
                    cols="30"
                    rows="10"
                    required
                    className="px-4 py-3 bg-gray-400/30 rounded-lg w-full focus-visible:outline-blue-500/60 text-lg"
                    onChange={(e) => setNewPost((newPost) => ({
                        ...newPost,
                        content: e.target.value
                    }))}
                    placeholder="Content"
                />
                <div className="p-2 flex flex-row justify-between w-1/3">
                    <button
                        className="px-4 py-1 rounded-full text-lg hover:shadow-lg hover:shadow-blue-500/40 bg-blue-500 text-white"
                        type="submit"
                    >
                        Create
                    </button>
                    <button
                        className="px-4 py-1 rounded-full text-lg hover:shadow-lg hover:shadow-blue-500/40 border-2 border-blue-500 text-blue-500"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default NewPostModal;
