import passport from 'passport'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import User from '../domain/user/user.model'

export const getJwtStrategy = () => {
  return new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
      secretOrKey: process.env.JWT_SECRET
    },
    (jwtPayload, done) => {
      User.findById(jwtPayload.sub)
        .then(user => {
          if (user) {
            done(null, user)
          } else {
            done(null, false)
          }
        })
        .catch(err => {
          done(err, false)
        })
    }
  )
}

export const authenticate = () => {
  return passport.authenticate('jwt', { session: false })
}
