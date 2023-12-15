import passport from 'passport';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import userModel from '../models/user.js';
import ErrorHandler from '../utils/errorHandler.js';
import { JWT_SECRET } from '../utils/secrets.js';
// import {Strategy as LocalStrategy} from 'passport-local'

// passport.use(new LocalStrategy({
//         usernameField: 'email',
//         passwordField: 'password'
//     },
//     function (email, password, cb) {
//         //this one is typically a DB call. Assume that the returned user object is pre-formatted and ready for storing in JWT
//         return UserModel.findOne({email, password})
//            .then(user => {
//                if (!user) {
//                    return cb(null, false, {message: 'Incorrect email or password.'});
//                }
//                return cb(null, user, {message: 'Logged In Successfully'});
//           })
//           .catch(err => cb(err));
//     }
// ));

passport.use(
    new JWTStrategy(
        {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: JWT_SECRET,
        },
        async function (jwtPayload, done) {
            try {
                const user = await userModel.findById(jwtPayload.userId);
                if (!user) {
                    return done(null, false);
                }
                return done(null, user);
            } catch (err) {
                done(err, false);
            }
        }
    )
);
