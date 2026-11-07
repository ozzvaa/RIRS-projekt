import { Router } from 'express'
import { prisma } from '../prisma'
import { UserData } from '../types/user'

const userRouter = Router()



function parseId(value: string): number | null {
  const id = Number(value)
  return Number.isInteger(id) && id > 0 ? id : null
}

// Read all users
userRouter.get('/', async (_req, res) => {
  try {
    const users = await prisma.uporabnik.findMany()
    res.json(users)
  } catch (error) {
    console.error('Napaka pri pridobivanju uporabnikov:', error)
    res.status(500).json({ error: 'Napaka pri pridobivanju uporabnikov.' })
  }
})

// Read one user
userRouter.get('/:id', async (req, res) => {
  const id = parseId(req.params.id)
  if (id === null) {
    res.status(400).json({ error: 'ID mora biti pozitivno celo število.' })
    return
  }

  try {
    const user = await prisma.uporabnik.findUnique({ where: { id } })
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

// Create a user
userRouter.post('/', async (req, res) => {
  const body = req.body
  try {
    const user = await prisma.uporabnik.create({
      data: {
        email: body.email,
        ime: body.ime,
        priimek: body.priimek,
      },
    })
    res.status(201).json(user)
  } catch (error) {
    console.error('Napaka pri ustvarjanju uporabnika:', error)
    res.status(500).json({ error: 'Napaka pri ustvarjanju uporabnika.' })
  }
})

// Update a user
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
    const user = await prisma.uporabnik.update({ where: { id }, data })
    res.json(user)
  } catch (error) {
    console.error('Napaka pri posodabljanju uporabnika:', error)
    res.status(500).json({ error: 'Napaka pri posodabljanju uporabnika.' })
  }
})

// Delete a user
userRouter.delete('/:id', async (req, res) => {
  const id = parseId(req.params.id)
  if (id === null) {
    res.status(400).json({ error: 'ID mora biti pozitivno celo število.' })
    return
  }

  try {
    await prisma.uporabnik.delete({ where: { id } })
    res.status(204).send()
  } catch (error) {
   
    console.error('Napaka pri brisanju uporabnika:', error)
    res.status(500).json({ error: 'Napaka pri brisanju uporabnika.' })
  }
})

export default userRouter
