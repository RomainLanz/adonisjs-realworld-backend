import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import StoreUserValidator from 'App/Validators/User/StoreUserValidator'

export default class UsersController {
  public async store({ request, response }: HttpContextContract) {
    const payload = await request.validate(StoreUserValidator)

    const user = await User.create(payload.user)

    return response.created(user)
  }
}
