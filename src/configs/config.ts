import dotenv from "dotenv";

dotenv.config();

export const config = {
    port: process.env.PORT || 3000,
    mongoUri: process.env.MONGGO_URI || "mongodb://localhost:27017/express-mongo",
    frontUrl: process.env.FRONT_URL || "http://localhost:3000",

    jwtAccessSecret: process.env.JWT_ACCESS_SECRET,
    jwtAccessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
    jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
    jwtRefreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN,

    actionEmailVerificationSecret: process.env.ACTION_EMAIL_VERIFICATION_SECRET,
    actionEmailVerificationExpiresIn:
    process.env.ACTION_EMAIL_VERIFICATION_EXPIRES_IN,
    actionForgotPasswordSecret: process.env.ACTION_FORGOT_PASSWORD_SECRET,
    actionForgotPasswordExpiresIn: process.env.ACTION_FORGOT_PASSWORD_EXPIRES_IN,

    smtpEmail: process.env.SMTP_EMAIL,
    smtpPassword: process.env.SMTP_PASSWORD,
};