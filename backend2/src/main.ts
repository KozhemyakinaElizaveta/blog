import { PrismaClient } from '@prisma/client'
import express, { Request, Response, NextFunction } from 'express';

const prisma = new PrismaClient()
const app = express()
app.use(express.json())

app.get('/allposts', async (req, res) => {
    const posts = await prisma.post.findMany({
        include: { author: true }
    })
    res.json({
        success: true,
        payload: posts,
    })
})

app.get(`/post/:id`, async (req, res) => {
    const { id } = req.params
    const post = await prisma.post.findFirst({
        where: { id: Number(id) },
    })
    res.json({
        success: true,
        payload: post,
    })
})

app.post(`/user`, async (req, res) => {
    const result = await prisma.user.create({
        data: { ...req.body },
    })
    res.json({
        success: true,
        payload: result,
    })
})

app.post(`/post`, async (req, res) => {
    const { message, date, authorId } = req.body;
    
    const [day, month, year] = date.split('.'); 
    const fullYear = `20${year}`; 
    const formattedDate = new Date(`${fullYear}-${month}-${day}`);

    const result = await prisma.post.create({
        data: {
            message,
            date: formattedDate, 
            author: { connect: { id: authorId } },
        },
    });

    res.json({
        success: true,
        payload: result,
    });
});

app.delete(`/post/:id`, async (req, res) => {
    const { id } = req.params
    const song = await prisma.user.delete({
        where: { id: Number(id) },
    })
    res.json({
        success: true,
        payload: song,
    })
})

app.get('/users', async (req, res) => {
    const artists = await prisma.user.findMany()
    res.json({
        success: true,
        payload: artists,
    })
})

app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404);
    return res.json({
        success: false,
        payload: null,
        message: `API SAYS: Endpoint not found for path: ${req.path}`,
    });
});

app.listen(3000, () =>
    console.log('REST API server ready at: http://localhost:3000'),
)