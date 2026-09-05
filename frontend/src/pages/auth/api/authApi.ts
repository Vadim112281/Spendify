import {httpClient} from "@/shared/api/httpClient";

type AuthSession = {
	userId: string;
	email: string;
	token: string;
};

type LoginUserRequest = {
	email: string;
	password: string;
};

type RegisterUserRequest = {
	email: string;
	firstName: string;
	lastName: string;
	password: string;
};

export const loginUser = (body: LoginUserRequest): Promise<AuthSession> =>
	httpClient<AuthSession>("/auth/login", {
		method: "POST",
		body: JSON.stringify(body),
	});

export const registerUser = (body: RegisterUserRequest): Promise<AuthSession> =>
	httpClient<AuthSession>("/auth/register", {
		method: "POST",
		body: JSON.stringify(body),
	});
