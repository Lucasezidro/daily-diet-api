import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { makeUpdateSnacks } from '../../factories/make-update-snack'

export async function updateSnackController(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().put(
    '/snack/:userId/:snackId',
    {
      schema: {
        tags: ['Snacks'],
        summary: 'Creates a new snack',
        security: [{ bearerAuth: [] }],
        params: z.object({
          userId: z.string().uuid(),
          snackId: z.string().uuid(),
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
      const { snackId } = request.params
      const { name, createdAt, description, isPartOfTheDiet } = request.body

      const updatedSnack = makeUpdateSnacks()

      await updatedSnack.execute({
        id: snackId,
        name,
        isPartOfTheDiet,
        createdAt,
        description,
      })

      return reply.status(204).send()
    },
  )
}
