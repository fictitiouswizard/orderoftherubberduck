import { generateRandomString, isWithinExpiration } from "lucia/utils";
import prisma from "$lib/prisma";

const EXPIRES_IN = 1000 * 60 * 60 * 2

export const generateEmailVerificationToken = async (userId: string) => {
  const tokens = await prisma.email_verification_token.findMany({
    where: {
      user_id: userId
    }
  })
  if(tokens.length > 0) {
    const reusableStoredToken = tokens.find((token) => {
      return isWithinExpiration(Number(token.expires) - EXPIRES_IN / 2);
    });
    if(reusableStoredToken) {
      return reusableStoredToken.id;
    }
  }
  const token = generateRandomString(63);
  await prisma.email_verification_token.create({
    data: {
      id: token,
      user_id: userId,
      expires: new Date().getTime() + EXPIRES_IN
    }
  });
  return token;
}

export const validateEmailVerificationToken = async (token: string) => {
  const storedToken = await prisma.$transaction(async (tx) => {
    const storedToken = await tx.email_verification_token.findUnique({
      where: {
        id: token
      }
    });
    if(!storedToken) throw new Error("Invalid token");
    const deleteResult = await tx.email_verification_token.deleteMany({
      where: {
        user_id: storedToken.user_id,
      }
    });
    return storedToken;
  });

  const tokenExpires = Number(storedToken.expires);

  if(!isWithinExpiration(tokenExpires)) {
    throw new Error("Token expired");
  }

  return storedToken.user_id;
}