import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { makeResetPassword } from '../../factories/make-reset-password'

export async function resetPasswordController(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().put(
    '/reset-password/:userId',
    {
      schema: {
        tags: ['Users'],
        summary: 'Resets user password',
        params: z.object({
          userId: z.string().uuid(),
        }),
        body: z.object({
          password: z.string(),
        }),
      },
    },
    async (request) => {
      const { userId } = request.params
      const { password } = request.body

      const resetedPassword = makeResetPassword()

      const { user } = await resetedPassword.execute({
        userId,
        password,
      })

      return { user }
    },
  )
}
