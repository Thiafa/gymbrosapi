import { makeGetUserProfileUseCase } from "@/factories/make-get-user-profile-use-case";
import { FastifyReply, FastifyRequest } from "fastify";

export async function profile(req: FastifyRequest, res: FastifyReply) {
  await req.jwtVerify()

  const getUserProfile = makeGetUserProfileUseCase()

  const { user } = await getUserProfile.execute({
    id: req.user.sub
  })

  return res.status(200).send({
    user: {
      ...user,
      password: undefined
    }
  })
}

