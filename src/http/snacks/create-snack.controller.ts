import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { makeCreateSnack } from '../../factories/make-create-snack'

export async function createSnackController(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/snack/:userId',
    {
      schema: {
        tags: ['Snacks'],
        summary: 'Creates a new snack',
        security: [{ bearerAuth: [] }],
        params: z.object({
          userId: z.string().uuid(),
        }),
        body: z.object({
          name: z.string(),
          description: z.string(),
          createdAt: z.coerce.date(),
          isPartOfTheDiet: z.boolean(),
        }),
      },
    },
    async (request, reply) => {
      const { userId } = request.params
      const { name, createdAt, description, isPartOfTheDiet } = request.body

      const createSnack = makeCreateSnack()

      await createSnack.execute({
        name,
        isPartOfTheDiet,
        createdAt,
        description,
        userId,
      })

      return reply.status(204).send()
    },
  )
}
