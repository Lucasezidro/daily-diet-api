import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { makeCountSnacksOffDiet } from '../../factories/make-count-snacks-off-diet'

export async function countSnacksOffDietController(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/count-snacks/off-diet/:userId',
    {
      schema: {
        tags: ['Snacks'],
        summary: 'Count snacks off diet',
        security: [{ bearerAuth: [] }],
        params: z.object({
          userId: z.string().uuid(),
        }),
      },
    },
    async (request) => {
      const { userId } = request.params
      const countSnacksOffDiet = makeCountSnacksOffDiet()

      const { snacksOnDiet } = await countSnacksOffDiet.execute({
        userId,
      })

      return { snacksOnDiet }
    },
  )
}
