import { auth } from "@/auth"

export async function getUser() {
	const { user } = await auth();
	return user;
}