import NextAuth, { DefaultSession } from "next-auth"
import Discord from "next-auth/providers/discord"

declare module "next-auth" {
  interface User {
    roles: string[]
  }
  interface Session {
    user: {
      roles: string[]
    } & DefaultSession["user"]
  }
}

declare module "next-auth/providers/discord" {
	interface DiscordProfile {
		roles: string[]
	}
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
		Discord( {
			authorization: {
				params: { scope: "identify email guilds guilds.members.read" }
			},
			async profile( profile, tokens ) {
				const guildData = await fetch( `https://discord.com/api/users/@me/guilds/830103888190242876/member`, {
					headers: {
						Authorization: `Bearer ${ tokens.access_token }`
					}
				} ).then( res => res.json() );

				return {
					...profile,
					roles: guildData.roles,
				};
			}
		} ),
	],
	callbacks: {
		async session( { session, user, token } ) {
			if ( user ) {
				console.log( 'user: ', user );
			}

			if ( token ) {
				session.user.roles = token.roles as string[];
				console.log( 'token: ', token );
			}

			return session;
		},
		async jwt( { token, user } ) {
			if ( user ) {
				token.roles = user.roles;
			}

			return token
		}
	}
})