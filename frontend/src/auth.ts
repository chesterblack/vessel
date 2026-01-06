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
				if (profile.avatar === null) {
					const defaultAvatarNumber =
						profile.discriminator === "0"
							? Number(BigInt(profile.id) >> BigInt(22)) % 6
							: parseInt(profile.discriminator) % 5
					profile.image_url = `https://cdn.discordapp.com/embed/avatars/${defaultAvatarNumber}.png`
				} else {
					const format = profile.avatar.startsWith("a_") ? "gif" : "png"
					profile.image_url = `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.${format}`
				}

				const guildData = await fetch( `https://discord.com/api/users/@me/guilds/830103888190242876/member`, {
					headers: {
						Authorization: `Bearer ${ tokens.access_token }`
					}
				} ).then( res => res.json() );

				return {
					id: profile.id,
					name: profile.global_name ?? profile.username,
					email: profile.email,
					image: profile.image_url,
					roles: guildData.roles,
				};
			}
		} ),
	],
	callbacks: {
		async session( { session, token } ) {
			if ( token ) {
				session.user.roles = token.roles as string[];
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