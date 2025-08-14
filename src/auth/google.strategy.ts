// import { Strategy as GoogleStrategy } from "passport-google-oauth20";
// import type { PassportStatic } from "passport";
// import User from "../models/user.model";

// export const googleStrategy = (passport: PassportStatic) => {
//     passport.use(
//         new GoogleStrategy(
//             {
//                 clientID: process.env.GOOGLE_CLIENT_ID!,
//                 clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//                 callbackURL: "/api/auth/google/callback",
//             },
//             async (accessToken, refreshToken, profile, done) => {
//                 try {
//                     const email = profile.emails?.[0]?.value;
//                     if (!email) return done(null, false);

//                     let user = await User.findOne({ email });
//                     if (!user) {
//                         user = await User.create({
//                             email,
//                             password: "google_oauth",
//                         });
//                     }

//                     return done(null, user);
//                 } catch (err) {
//                     return done(err, false);
//                 }
//             }
//         )
//     );
// };
