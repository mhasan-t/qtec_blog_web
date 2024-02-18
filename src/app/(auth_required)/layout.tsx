"use client";

import { useRedux } from "@/lib/hooks/useRedux";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useRefreshTokenMutation } from "@/lib/services/auth";

async function refreshToken(access_token: string) {}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const router = useRouter();
	const { useAppDispatch, useAppSelector } = useRedux();
	const userState = useAppSelector((state) => state.user);
	const dispatch = useAppDispatch();

	const [refreshToken, {}] = useRefreshTokenMutation();

	async function checkAuthorizationOrRedirect() {
		if (userState.access_token === null) {
			// no access token
			if (localStorage.getItem("refresh")) {
				console.log("yes refresh token");
				const res = await refreshToken({
					refresh: localStorage.getItem("refresh") as string,
				});

				if ("error" in res) {
					console.log("Removing corrupted refresh");
					localStorage.removeItem("refresh");
				}
			} else {
				console.log("no token at al");
				router.push("/login");
			}
		} else {
			console.log("yes access token");
		}
	}

	useEffect(() => {
		checkAuthorizationOrRedirect();
	});

	return children;
}
