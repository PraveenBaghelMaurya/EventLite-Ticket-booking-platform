import { prisma } from "../../shared/lib/prisma"
import { accessTokenGenerate, refreshTokenGenerate } from "../../shared/middleware/token"

export const findOrCreateUser = async (googleUser: any, tokens: any) => {
  const { sub: googleId, email, given_name, family_name, picture: avatar } = googleUser;

  const accessTokenValue = accessTokenGenerate(googleUser)
  const refreshTokenValue = refreshTokenGenerate(googleUser.id)
  try {
    // Check if user exists by googleId or email
    let user = await prisma.user.findFirst({
      where: {
        OR: [
          { googleId: googleId },
          { email: email }
        ]
      }
    });

    if (user) {
      // Update existing user
      user = await prisma.user.update({
        where: { id: user.id },
        data: {
          googleId: user.googleId ? user.googleId : googleId,
          name: given_name || user.name,
          avatar: avatar || user.avatar,
          accessToken: accessTokenValue,
          refreshToken: refreshTokenValue,
          updatedAt: new Date()
        }
      });

    } else {
      // Create new user
      user = await prisma.user.create({
        data: {
          googleId: googleId,
          email: email,
          name: given_name,
          avatar: avatar,
          accessToken: accessTokenValue,
          refreshToken: refreshTokenValue,
          role: "USER"
        }
      });
    }

    return user;
  } catch (error) {
    throw error;
  }
};