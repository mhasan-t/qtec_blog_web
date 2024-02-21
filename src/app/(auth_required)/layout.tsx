"use client";

import { useRedux } from "@/lib/hooks/useRedux";
import { useEffect, useLayoutEffect } from "react";
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
		if (localStorage.getItem("refresh")) {
			const res = await refreshToken({
				refresh: localStorage.getItem("refresh") as string,
			});

			if (!("error" in res)) {
				return;
			}
		}

		localStorage.removeItem("refresh");
		router.push("/login");
	}

	useLayoutEffect(() => {
		checkAuthorizationOrRedirect();
	}, []);

	if (userState.access_token === null) {
		return "Authenticating...";
	}

	return children;
}
