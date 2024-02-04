import express from 'express'
import reviews from './reviews.json' assert { type: 'json' };

const app = express()

app.get('/random', (req, res) => {
	const index = 0
	res.json(reviews[index])
})

app.get('/all', (req, res) => {
	res.json(reviews)
})


const port = 3000
app.listen(port, () => console.log(`Reviews service listening on port ${port}...\n`))
