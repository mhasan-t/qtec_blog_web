type LoginRequest = {
	username: string;
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
