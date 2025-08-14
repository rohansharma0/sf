import passport from "passport";
import { googleStrategy } from "./google.strategy";
import User from "../models/user.model";

export const configurePassport = () => {
    googleStrategy(passport);

    passport.serializeUser((user: any, done) => done(null, user.id));

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findById(id);
            done(null, user);
        } catch (err) {
            done(err, null);
        }
    });
};
