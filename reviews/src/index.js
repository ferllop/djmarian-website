import express from 'express'

const app = express()

const reviews = [
	{
		id: 0,
		source: 'Google',
		rating: 5,
		name: 'First Review',
		content: 'This is first review',
	},
	{
		id: 1,
		source: 'Google',
		rating: 4,
		name: 'Second Review',
		content: 'This is second review',
	},
]

app.get('/random', (req, res) => {
	const index = 0
	res.json(reviews[index])
})

app.get('/all', (req, res) => {
	res.json(reviews)
})


const port = 3000
app.listen(port, () => console.log(`Reviews service listening on port ${port}...\n`))
