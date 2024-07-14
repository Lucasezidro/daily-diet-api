import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { makeFetchOneSnackById } from '../../factories/make-fetch-snack-by-id'

export async function getSnackController(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/snack/:userId/:snackId',
    {
      schema: {
        tags: ['Snacks'],
        summary: 'Fetch snack by id',
        security: [{ bearerAuth: [] }],
        params: z.object({
          userId: z.string().uuid(),
          snackId: z.string().uuid(),
        }),
      },
    },
    async (request) => {
      const { snackId } = request.params
      const getSnack = makeFetchOneSnackById()

      const { snack } = await getSnack.execute({
        snackId,
      })

      return { snack }
    },
  )
}
