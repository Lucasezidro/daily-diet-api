import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { makeFetchAllSnacks } from '../../factories/make-fetch-all-snacks'

export async function getSnacksController(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/snacks/:userId',
    {
      schema: {
        tags: ['Snacks'],
        summary: 'Fetch all snacks',
        security: [{ bearerAuth: [] }],
        params: z.object({
          userId: z.string().uuid(),
        }),
      },
    },
    async (request) => {
      const { userId } = request.params
      const getSnacks = makeFetchAllSnacks()

      const { snacks } = await getSnacks.execute({
        userId,
      })

      return { snacks }
    },
  )
}
