
import pub  from "$env/dynamic/public";
import priv from "$env/dynamic/private";
import { Client, SendEmailV3_1  } from "node-mailjet";
import type { LibraryResponse } from "node-mailjet";
export const sendEmailVerificationEmail = async (email: string, token: string) => {
  const verificationUrl = `${pub.env.PUBLIC_BASE_URL}/verify-email/${token}`;
  const emailBody = `Please verify your email address by clicking <a href="${verificationUrl}">here</a>.`;
  const mailjet = new Client({
    apiKey: priv.env.MAILJET_API_KEY,
    apiSecret: priv.env.MAILJET_SECRET_KEY
  });

  const data: SendEmailV3_1.Body = {
    Messages: [
      {
        From: {
          Email: "no-reply@orderoftherubberduck.com",
        },
        To: [
          {
            Email: email,
          },
        ],
        Subject: "Verify your email address",
        TextPart: "Please verify your email address by clicking the following link: " + verificationUrl,
        HTMLPart: emailBody,
        TrackClicks: SendEmailV3_1.TrackClicks.Disabled,
        TrackOpens: SendEmailV3_1.TrackOpens.Disabled
      }
    ]
  }

  const result: LibraryResponse<SendEmailV3_1.Response> = await mailjet.post("send", { version: "v3.1" }).request(data);
  const { Status } = result.body.Messages[0];
  return Status;
}

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetUrl = `${pub.env.PUBLIC_BASE_URL}/password-reset/${token}`;
  const emailBody = `Please reset your password by clicking <a href="${resetUrl}">here</a>.`;
  const mailjet = new Client({
    apiKey: priv.env.MAILJET_API_KEY,
    apiSecret: priv.env.MAILJET_SECRET_KEY
  });

  const data: SendEmailV3_1.Body = {
    Messages: [
      {
        From: {
          Email: "no-reply@orderoftherubberduck.com",
        },
        To: [
          {
           Email: email
          }
        ],
        Subject: "Reset your password",
        TextPart: "Please reset your password by clicking the following link: " + resetUrl,
        HTMLPart: emailBody,
        TrackClicks: SendEmailV3_1.TrackClicks.Disabled,
        TrackOpens: SendEmailV3_1.TrackOpens.Disabled
      }
    ]
  }

  const result: LibraryResponse<SendEmailV3_1.Response> = await mailjet.post("send", { version: "v3.1" }).request(data);
  const { Status } = result.body.Messages[0];
  return Status;
}