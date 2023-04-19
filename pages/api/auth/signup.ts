import { SecurePassword } from "@blitzjs/auth"
import { api } from "../../../src/blitz-server"
import db from "../../../prisma"

const signup = api(async (req, res, ctx) => {
  const hashedPassword = await SecurePassword.hash(req.body.password)
  const email = req.body.email
  const user = await db.user.create({
    data: { email, hashedPassword },
    select: { id: true, name: true, email: true, role: true },
  })
  await ctx.session.$create({
    userId: user.id,
    email: user.email,
  })
  res
    .status(200)
    .json({ userId: ctx.session.userId, ...user, email: req.query.email })
})

export default signup
