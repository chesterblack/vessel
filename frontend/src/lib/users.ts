import { auth } from "@/auth"

export async function getUser() {
	const response = await auth();
	return response?.user;
}