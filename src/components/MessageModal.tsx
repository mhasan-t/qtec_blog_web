"use client";

import { useRedux } from "@/lib/hooks/useRedux";
import { closeModal } from "@/lib/slices/appSlice";
import { RootState } from "@/lib/store";
import { useState } from "react";

const MessageModal: React.FC = () => {
	const { useAppDispatch, useAppSelector } = useRedux();
	const appState = useAppSelector((state: RootState) => state.app);
	const dispatch = useAppDispatch();

	function onClose() {
		dispatch(closeModal());
	}
	const isSuccess = appState.modal.modalIsSuccess;
	const isOpen = appState.modal.modalIsOpen;
	const message = appState.modal.modalMessage;

	return (
		<>
			{isOpen && (
				<div className="fixed z-10 inset-0 overflow-y-auto">
					<div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
						<div
							className="fixed inset-0 transition-opacity"
							aria-hidden="true"
						>
							<div className="absolute inset-0 bg-gray-500 opacity-75"></div>
						</div>

						<span
							className="hidden sm:inline-block sm:align-middle sm:h-screen"
							aria-hidden="true"
						>
							&#8203;
						</span>

						<div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
							<div
								className={`bg-${
									isSuccess ? "green" : "red"
								}-500 px-4 py-2 text-white font-bold text-lg`}
							>
								{isSuccess ? "Success!" : "Error!"}
							</div>
							<div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
								<p className="text-gray-900 text-base">
									{message}
								</p>
							</div>
							<div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
								<button
									onClick={onClose}
									type="button"
									className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm bg-slate-600  hover:bg-slate-700 focus:ring-slate-500`}
								>
									Close
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default MessageModal;
