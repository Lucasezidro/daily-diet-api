import fastify from 'fastify'
import cors from '@fastify/cors'
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from 'fastify-type-provider-zod'
import fastifyJwt from '@fastify/jwt'
import { env } from './env'
import { registerController } from './http/user/register-user.controller'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import { authenticateController } from './http/user/authenticate.controller'
import { resetPasswordController } from './http/user/reset-password.controller'
import { createSnackController } from './http/snacks/create-snack.controller'
import { deleteSnackController } from './http/snacks/delete-snack.controller'
import { updateSnackController } from './http/snacks/update-snack.controller'
import { getSnacksController } from './http/snacks/get-snakcs.controller'
import { getSnackController } from './http/snacks/get-snack.controller'
import { countSnacksController } from './http/snacks/count-snakcs.controller'
import { countSnacksOffDietController } from './http/snacks/count-snacks-off-diet.controller'
import { countSnacksOnDietController } from './http/snacks/count-snacks-on-diet.controller'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(cors, {
  origin: '*',
})

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Daily diet',
      description: 'API for diet control',
      version: '1.0.0',
    },
  },
  transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
})

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})

app.register(registerController)
app.register(authenticateController)
app.register(resetPasswordController)

app.register(createSnackController)
app.register(updateSnackController)
app.register(deleteSnackController)
app.register(getSnacksController)
app.register(getSnackController)
app.register(countSnacksController)
app.register(countSnacksOffDietController)
app.register(countSnacksOnDietController)

app
  .listen({
    host: '0.0.0.0',
    port: env.PORT,
  })
  .then(() => console.log('HTTP server running!'))
