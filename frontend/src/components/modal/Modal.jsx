import React from "react";
import { useNavigate } from "react-router-dom";

export default function Modal(props) {

    const navigate = useNavigate();
    const handleCloseModal = () => {
        if (props.onClose) {
            props.onClose();
        }
    };
    return (
        <>
            {props.showModal ? (
                <>
                    <div className="justify-center items-center flex">
                        <div className="my-6 mx-auto max-w-3xl">
                            <div className="border-2 px-12 py-8 border-black rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                    <h3 className="text-3xl font-semibold">
                                        {props.header}
                                    </h3>
                                </div>
                                <div className="relative p-6 flex-auto">
                                    <p className="my-4 text-slate-500 text-lg leading-relaxed">
                                        {props.message}
                                    </p>
                                </div>
                                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                    <button
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm mr-1 mb-1"
                                        type="button"
                                        onClick={handleCloseModal}>
                                        Close
                                    </button>
                                    <button
                                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold text-sm px-6 py-3 rounded mr-1 mb-1"
                                        type="button"
                                        onClick={() => navigate("/login")}>
                                        Log In
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <div className="opacity-25 fixed inset-0 bg-black"></div> */}
                </>
            ) : null}
        </>
    );
}