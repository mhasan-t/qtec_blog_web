"use client";
import { useRedux } from "@/lib/hooks/useRedux";
import { useLogInMutation } from "@/lib/services/auth";
import { openModal, setModalmessage } from "@/lib/slices/appSlice";
import { setAccessToken, setUserData } from "@/lib/slices/userSlice";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

type Props = {};

function LogIn({}: Props) {
	const router = useRouter();
	const { useAppDispatch } = useRedux();
	const dispatch = useAppDispatch();

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const [logIn, { data, error, isLoading }] = useLogInMutation();

	const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		let res = await logIn({
			username: username,
			password: password,
		});

		if (!("error" in res)) {
			dispatch(
				setUserData({
					username: username,
					access_token: res.data.access,
				})
			);
			router.push("/");
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-md w-full space-y-8">
				<div>
					<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
						Sign in to your account
					</h2>
				</div>
				<form className="mt-8 space-y-6" onSubmit={handleLogin}>
					<div className="rounded-md shadow-sm -space-y-px">
						<div>
							<label htmlFor="username" className="sr-only">
								Username
							</label>
							<input
								id="username"
								name="username"
								type="text"
								autoComplete="username"
								required
								className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
								placeholder="Username"
								value={username}
								onChange={(e) => setUsername(e.target.value)}
							/>
						</div>
						<div>
							<label htmlFor="password" className="sr-only">
								Password
							</label>
							<input
								id="password"
								name="password"
								type="password"
								autoComplete="current-password"
								required
								className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
								placeholder="Password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>
					</div>
					<div>
						<button
							type="submit"
							className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						>
							<span className="absolute left-0 inset-y-0 flex items-center pl-3">
								{/* Heroicon name: lock-closed */}
								<svg
									className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 20 20"
									fill="currentColor"
									aria-hidden="true"
								>
									<path
										fillRule="evenodd"
										d="M10 12a2 2 0 100-4 2 2 0 000 4z"
										clipRule="evenodd"
									/>
									<path d="M2 8V6a4 4 0 014-4h8a4 4 0 014 4v2h1a2 2 0 012 2v8a2 2 0 01-2 2H3a2 2 0 01-2-2V10a2 2 0 012-2h1zm2-2V6a2 2 0 012-2h8a2 2 0 012 2v2H4z" />
								</svg>
							</span>
							Log in
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default LogIn;
