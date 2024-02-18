import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AppState {
	modal: {
		modalMessage: string | null;
		modalIsOpen: boolean;
		modalIsSuccess: boolean;
	};
}

const initialState: AppState = {
	modal: {
		modalIsOpen: false,
		modalIsSuccess: true,
		modalMessage: null,
	},
};

export const appSlice = createSlice({
	name: "app",
	initialState,
	reducers: {
		setModalmessage: (state, action: PayloadAction<string>) => {
			state.modal.modalMessage = action.payload;
		},
		openModal: (state) => {
			state.modal.modalIsOpen = true;
		},
		closeModal: (state) => {
			state.modal.modalIsOpen = false;
		},
		setModalAsSuccess: (state) => {
			state.modal.modalIsSuccess = true;
		},
		setModalAsFailure: (state) => {
			state.modal.modalIsSuccess = false;
		},
	},
});

// Action creators are generated for each case reducer function
export const {
	setModalmessage,
	setModalAsFailure,
	setModalAsSuccess,
	openModal,
	closeModal,
} = appSlice.actions;

export default appSlice.reducer;
