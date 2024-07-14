import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { makeRegisterUser } from '../../factories/make-register-user'

export async function registerController(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/user',
    {
      schema: {
        tags: ['Users'],
        summary: 'Creates a new account',
        body: z.object({
          name: z.string(),
          email: z.string().email(),
          password: z.string(),
          objective: z.string().optional(),
          role: z.enum(['nutritionist', 'user']).default('user'),
        }),
      },
    },
    async (request, reply) => {
      const { email, name, password, role, objective } = request.body

      const registerUser = makeRegisterUser()

      const { user } = await registerUser.execute({
        email,
        name,
        password,
        role: role ?? 'user',
        objective: objective ?? '',
      })

      return reply.status(204).send({ userId: user.id })
    },
  )
}
