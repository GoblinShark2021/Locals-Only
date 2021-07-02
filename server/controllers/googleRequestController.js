const axios = require('axios');

const googleRequestController = {};

googleRequestController.getBusinesses = (req, res, next) => {
    try {
        const {lat, lng} = req.query;
        axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=2000&keyword=resturant&key=${process.env.GOOGLE_API_KEY}`)
            .then(info => {
                console.log(info.data.results);
                res.locals = info.data.results;
                return next(); 
            })
            .catch(err => console.log(err));
    } catch (err) {
        return next({
            log: 'googleRequestController.getBusinesses: ERROR: Error getting stores data from stores.json file',
            message: { err: `Error occurred in googleRequestController.getBusinesses. err log: ${err}` },
          });
    }
}

module.exports = googleRequestController;