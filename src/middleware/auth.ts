import passport from 'passport';
import { Strategy as localStrategy } from 'passport-local';
import { Strategy as JWTstrategy } from 'passport-jwt';
import { ExtractJwt } from 'passport-jwt';

passport.use(
'login',
new localStrategy(
    {
    usernameField: 'email',
    passwordField: 'password'
    },
    async (email: string, password: string, done: any) => {
    try {
        if (email === 'admin' && password === 'admin') {
            console.log(email, password)
        return done(null, {email: 'admin'}, { message: 'Logged in Successfully' });	 
    }
    return done(null, false, { message: 'Invalid credentials' });
    } catch (error) {
        return done(error);
    }
    }
)
);

passport.use(
new JWTstrategy(
    {
    secretOrKey: process.env.SECRET_KEY,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    },
    async (token, done) => {
    try {
        return done(null, token.user);
    } catch (error) {
        done(error);
    }
    }
)
);
