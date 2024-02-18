// import { ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";
// import { openModal, setModalmessage } from "./slices/appSlice";

// type args = {};

// export async function handleApiResponse(
// 	queryFulfilled: any,
// 	dispatch: ThunkDispatch<any, any, UnknownAction>
// ) {
// 	try {
// 		const res = await queryFulfilled;
// 		return res;
// 	} catch (e: any) {
// 		let errMsg = "";

// 		if ("error" in e.error) {
// 			//network error
// 			errMsg = e.error.error;
// 		} else {
// 			errMsg = e.error.data.detail;
// 		}
// 		dispatch(setModalmessage(errMsg));
// 		dispatch(openModal());
// 		return e;
// 	}
// }

// async function getAccessTokenByRefreshToken(refresh_token: string) {
// 	const res = await fetch(
// 		`${process.env.API_URL}accounts/auth/token/refresh/`,
// 		{
// 			method: "POST",
// 			headers: {
// 				"Content-Type": "application/json",
// 			},
// 			body: JSON.stringify({
// 				refresh: refresh_token,
// 			}),
// 		}
// 	);

// 	const data = await res.json();
// 	return data.access;
// }
