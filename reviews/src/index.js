import express from 'express'
import reviews from './reviews.json' assert { type: 'json' };

const app = express()


app.get('/random', (req, res) => {
	const getRandomReview = reviews => {
		const getRandomIntegerBothIncluded = (min, max) => {
			const minCeiled = Math.ceil(min)
			const maxFloored = Math.floor(max)
			return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled)
		}
		const randomIndex = getRandomIntegerBothIncluded(0, reviews.length - 1)
		return reviews[randomIndex]
	}
	res.json(getRandomReview(reviews))
})

app.get('/all', (req, res) => {
	res.json(reviews)
})


const port = process.env.REVIEWS_LOCAL_PORT || 3000
app.listen(port, () => console.log(`Reviews service listening on port ${port}...\n`))
