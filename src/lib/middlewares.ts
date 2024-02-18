import { isRejectedWithValue } from "@reduxjs/toolkit";
import { authApi } from "./services/auth";

export const jwtTokenRefresher =
	({ dispatch }: Record<any, any>) =>
	(next: any) =>
	async (action: any) => {
		if (action && isRejectedWithValue(action)) {
			// Catch the authorization error and refresh the tokens
			console.warn("We got a rejected action!", action.payload.status);
			console.log({ action });
			if (action.payload.status === 401) {
				const { endpointName, originalArgs } = action.meta.arg;
				console.log(originalArgs);
				console.log(endpointName);
				if (localStorage.getItem("refresh")) {
					await dispatch(
						authApi.endpoints.refreshToken.initiate({
							refresh: localStorage.getItem("refresh") as string,
						})
					);
				}
				// await dispatch(backendApi.util.invalidateTags(['Tokens']));
			}
		}

		return next(action);
	};
