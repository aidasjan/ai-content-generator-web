import { type Request, type Response } from 'express'
import passport from 'passport'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import User from '../domain/user/user.model'

const requireRole =
  (code: string) => (req: Request, res: Response, next: any) => {
    if ((req.user as any)?.role?.code === code) {
      next()
    } else {
      res.status(401)
      res.json({ error: 'Unauthorized to perform the requested action' })
    }
  }

export const getJwtStrategy = () => {
  return new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
      secretOrKey: process.env.JWT_SECRET
    },
    (jwtPayload, done) => {
      User.findById(jwtPayload.sub)
        .populate('role')
        .then((user) => {
          if (user) {
            done(null, user)
          } else {
            done(null, false)
          }
        })
        .catch((err) => {
          done(err, false)
        })
    }
  )
}

export const authenticate = () => {
  return passport.authenticate('jwt', { session: false })
}

export const requireAdmin = () => {
  return requireRole('admin')
}

export const requireUser = () => {
  return requireRole('user')
}
