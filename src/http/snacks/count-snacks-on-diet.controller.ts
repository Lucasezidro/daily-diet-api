import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { makeCountSnacksOnDiet } from '../../factories/make-count-snakcs-on-diet'

export async function countSnacksOnDietController(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/count-snacks/on-diet/:userId',
    {
      schema: {
        tags: ['Snacks'],
        summary: 'Count snacks on diet',
        security: [{ bearerAuth: [] }],
        params: z.object({
          userId: z.string().uuid(),
        }),
      },
    },
    async (request) => {
      const { userId } = request.params
      const countSnacksOnDiet = makeCountSnacksOnDiet()

      const { snacksOnDiet } = await countSnacksOnDiet.execute({
        userId,
      })

      return { snacksOnDiet }
    },
  )
}
