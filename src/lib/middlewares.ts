import { isRejectedWithValue } from "@reduxjs/toolkit";
import { authApi } from "./services/auth";
import { openModal, setModalmessage } from "./slices/appSlice";

export const jwtTokenRefresher =
	({ dispatch }: Record<any, any>) =>
	(next: any) =>
	async (action: any) => {
		if (action && isRejectedWithValue(action)) {
			// if the response is 401 and we have a refresh token, get new access token
			if (
				action.payload.status === 401 &&
				localStorage.getItem("refresh")
			) {
				await dispatch(
					authApi.endpoints.refreshToken.initiate({
						refresh: localStorage.getItem("refresh") as string,
					})
				);
			}
		}

		return next(action);
	};

export const apiErrorHandler =
	({ dispatch }: Record<any, any>) =>
	(next: any) =>
	async (action: any) => {
		if (action && isRejectedWithValue(action)) {
			let errorMessage = "";

			console.warn("We got a rejected action!", action.payload.status);
			console.log(action);

			errorMessage += action.payload.error ?? "";
			errorMessage += action.payload.data
				? action.payload.data.detail
				: "";

			dispatch(setModalmessage(errorMessage));
			dispatch(openModal());
		}

		return next(action);
	};
