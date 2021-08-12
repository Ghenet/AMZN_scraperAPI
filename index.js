const express =  require('express');
const request = require('request-promise');

const app = express();
const PORT = process.env.PORT || 5000;

const apiKey = '8350ae79147ee585cca8e80ba9a1b58e';
const baseUrl = `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to Amazon Scraper API');
});

//GET Product Details
app.get('/products/:productId', async(req, res) => {
    const { productId } = req.params;

    try {
        const response = await request(`${baseUrl}&url=https://www.amazon.com/dp/${productId}`)

        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error)
    }
})


//GET Product reviews
app.get('/products/:productId/reviews', async(req, res) => {
    const { productId } = req.params;

    try {
        const response = await request(`${baseUrl}&url=https://www.amazon.com/product-reviews/${productId}`)

        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error)
    }
});

//GET PRoduct offers
app.get('/products/:productId/offers', async(req, res) => {
    const { productId } = req.params;

    try {
        const response = await request(`${baseUrl}&url=https://www.amazon.com/gp/offer-listing/${productId}`)

        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error)
    }
});

//Get Search Results
app.get('/search/:searchQuery', async(req, res) => {
    const { searchQuery } = req.params;

    try {
        const response = await request(`${baseUrl}&url=https://www.amazon.com/s?k=${searchQuery}`)

        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error)
    }
});
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))