import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { makeCountSnacksByUserId } from '../../factories/make-count-snacks-by-user-id'

export async function countSnacksController(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/count/snacks/:userId',
    {
      schema: {
        tags: ['Snacks'],
        summary: 'Count snacks by user id',
        security: [{ bearerAuth: [] }],
        params: z.object({
          userId: z.string().uuid(),
        }),
      },
    },
    async (request, reply) => {
      const { userId } = request.params
      const countSnacksUseCase = makeCountSnacksByUserId()

      const { countSnacks } = await countSnacksUseCase.execute({
        userId,
      })

      return reply.status(200).send({ countSnacks })
    },
  )
}
