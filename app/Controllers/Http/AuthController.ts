import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import RegisterValidator from 'App/Validators/Auth/RegisterValidator'
import LoginValidator from 'App/Validators/Auth/LoginValidator'
import UpdateUserValidator from 'App/Validators/Auth/UpdateUserValidator'

export default class AuthController {
  public async me({ auth, response }) {
    return response.ok({ user: auth.user })
  }

  public async register({ request, response }: HttpContextContract) {
    const payload = await request.validate(RegisterValidator)

    const user = await User.create(payload.user)

    return response.created({ user })
  }

  public async login({ auth, request, response }: HttpContextContract) {
    const {
      user: { email, password },
    } = await request.validate(LoginValidator)

    const token = await auth.attempt(email, password)
    const user = auth.user!

    return response.ok({
      user: {
        token: token.token,
        ...user.serialize(),
      },
    })
  }

  public async update({ auth, request, response }: HttpContextContract) {
    const payload = await request.validate(UpdateUserValidator)

    const user = await auth.user!.merge(payload.user).save()

    return response.ok({ user })
  }
}
