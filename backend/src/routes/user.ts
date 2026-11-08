import { Router } from 'express'
import { registerUser } from '../controllers/authController'
import { deleteUser, getUserById, getUsers, updateUser } from '../services/userService'
import type { UserData } from '../types/user'

const userRouter = Router()

function parseId(value: string): number | null {
  const id = Number(value)
  return Number.isInteger(id) && id > 0 ? id : null
}

userRouter.get('/', async (_req, res) => {
  try {
    res.json(await getUsers())
  } catch (error) {
    console.error('Napaka pri pridobivanju uporabnikov:', error)
    res.status(500).json({ error: 'Napaka pri pridobivanju uporabnikov.' })
  }
})

userRouter.get('/:id', async (req, res) => {
  const id = parseId(req.params.id)
  if (id === null) {
    res.status(400).json({ error: 'ID mora biti pozitivno celo število.' })
    return
  }

  try {
    const user = await getUserById(id)
    if (!user) {
      res.status(404).json({ error: 'Uporabnik ni bil najden.' })
      return
    }
    res.json(user)
  } catch (error) {
    console.error('Napaka pri pridobivanju uporabnika:', error)
    res.status(500).json({ error: 'Napaka pri pridobivanju uporabnika.' })
  }
})

// Reuse registration so passwords are always hashed before persistence.
userRouter.post('/', registerUser)

userRouter.patch('/:id', async (req, res) => {
  const id = parseId(req.params.id)
  if (id === null) {
    res.status(400).json({ error: 'ID mora biti pozitivno celo število.' })
    return
  }

  const body = req.body
  const data: UserData = {}
  if (body.email !== undefined) data.email = body.email
  if (body.ime !== undefined) data.ime = body.ime
  if (body.priimek !== undefined) data.priimek = body.priimek

  try {
    res.json(await updateUser(id, data))
  } catch (error) {
    console.error('Napaka pri posodabljanju uporabnika:', error)
    res.status(500).json({ error: 'Napaka pri posodabljanju uporabnika.' })
  }
})

userRouter.delete('/:id', async (req, res) => {
  const id = parseId(req.params.id)
  if (id === null) {
    res.status(400).json({ error: 'ID mora biti pozitivno celo število.' })
    return
  }

  try {
    await deleteUser(id)
    res.status(204).send()
  } catch (error) {
    console.error('Napaka pri brisanju uporabnika:', error)
    res.status(500).json({ error: 'Napaka pri brisanju uporabnika.' })
  }
})

export default userRouter
