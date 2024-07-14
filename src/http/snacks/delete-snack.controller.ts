import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { makeDeleteSnacks } from '../../factories/make-delete-snack'

export async function deleteSnackController(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().delete(
    '/snack/:userId/:snackId',
    {
      schema: {
        tags: ['Snacks'],
        summary: 'Delete a snack',
        security: [{ bearerAuth: [] }],
        params: z.object({
          userId: z.string().uuid(),
          snackId: z.string().uuid(),
        }),
      },
    },
    async (request, reply) => {
      const { snackId } = request.params

      const deletedSnack = makeDeleteSnacks()

      await deletedSnack.execute({
        snackId,
      })

      return reply.status(204).send()
    },
  )
}
