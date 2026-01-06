
import NextAuth from "next-auth"
import Discord from "next-auth/providers/discord"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
		Discord( {
			authorization: {
				params: { scope: "identify email guilds guilds.members.read" }
			},
			// profile( profile ) {
			// 	return {
			// 		id: profile.id,
			// 		name: profile.global_name ?? profile.username,
			// 		email: profile.email,
			// 		image: profile.image_url,
			// 	}

			// 	// const guildData = await fetch( `https://discord.com/api/users/@me/guilds/830103888190242876/member`, {
			// 	// 	headers: {
			// 	// 		Authorization: `Bearer ${ tokens.access_token }`
			// 	// 	}
			// 	// } ).then( res => res.json() );

			// 	// return {
			// 	// 	roles: guildData.roles,
			// 	// 	foo: 'bar',
			// 	// 	...profile
			// 	// };
			// }
		} ),
	],
	callbacks: {
		async signIn ( { account, profile } ) {
			const { access_token } = account;
			const guildData = await fetch( `https://discord.com/api/users/@me/guilds/830103888190242876/member`, {
				headers: {
					Authorization: `Bearer ${ access_token }`
				}
			} )
				.then( res => res.json() );

			const roles = new Set( guildData.roles );
			const validRoles = new Set( [
				'830148627367723079',
				'1447593084727726282',
				'831087820307169300',
			] );

			return roles.intersection( validRoles ).size > 0;
		}
	}
})