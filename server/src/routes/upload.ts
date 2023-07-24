import axios, { AxiosError } from 'axios';
import FormData from 'form-data'
import { FastifyInstance } from 'fastify'
import { z, ZodError } from 'zod'

export async function uploadRoutes(app: FastifyInstance) {
  app.post('/upload', async (request, reply) => {
    try {
      if (!request.isMultipart()) {
        reply.code(400).send(new Error("Request is not multipart"));
        return;
      }

      const fileSchema = z.object({
        data: z.any(),
        filename: z.string().min(1),
        mimetype: z.string().regex(
          /^(image)\/[a-zA-Z]*/,
          'Invalid file type'
        ),
      })

      const bodySchema = z.object({
        file: z.array(fileSchema).refine(
          (files) => files?.length === 1, "Image is required."
        ),
      })
  
      const { file } = bodySchema.parse(request.body)

      const upload = file[0]

      const result = await request.file({
        limits: {
          fileSize: 5_242_880, // 5 MB
        },
      })

      if (!result) {
        return reply.status(400).send()
      }
  
      const formData = new FormData();
  
      formData.append('image', upload.data.toString('base64'));
      formData.append('key', process.env.IMGBB_API_KEY);
  
      const response = await axios.post(
        'https://api.imgbb.com/1/upload',
        formData,
        {
          headers: { 'content-type': 'multipart/form-data' }
        }
      )
  
      return {
        fileUrl: response.data.data.url
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(error.code)
        console.error(error.message)
        console.error(error?.response?.data)
      }

      if (error instanceof ZodError) {
        reply.code(400).send(error.issues)
        return
      }

      reply.code(500)
    }
  })
}
