type LoginRequest = {
	username: string;
	password: string;
};

type RegisterRequest = {
	username: string;
	email: string;
	full_name: string;
	password: string;
};

type TokenResponse = {
	access: string;
	refresh: string;
};

type ErrorResponse = {
	detail: string;
};

type RefreshTokenRequest = {
	refresh: string;
};

type PaginatedResponse<Obj> = {
	count: number;
	next: number | null | undefined;
	previous: number | null | undefined;
	results: Obj[];
};
