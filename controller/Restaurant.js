const Restaurant = require('../model/Restaurant')

// 1) Create API for Restaurant search page with filters, sort and pagination as input parameters
// =>

exports.FilterRestaurant = (req, res) => {
    const filter = {}
    if (req.body.lcost && req.body.hcost) {
        filter.cost = {
            $lt: req.body.lcost,
            $gt: req.body.hcost
        }
    }

    if (req.body.cuisine && req.body.cuisine.length > 0) {
        filter['Cuisine.name'] = { $in: req.body.cuisine }
    }

    if (req.body.city) {
        filter.city = req.body.city
    }
    Restaurant.find(filter).limit(2).skip(2 * (req.params.pageNo - 1)).sort({ cost: req.body.sort })
        .then(result => {
            res.status(200).json({
                message: "Restaurants feteched successfully 👍",
                data: result
            })
        })

        .catch(error => {
            res.status(500).josn({
                message: "DB error occured",
                data: error
            })
        })
}

// 2) Create API for Restaurant Product Details page:
// On Home page, if the user selects the Location from Dropdown list and types arestaurantname in search box and selects a matching restaurant from the search result list, navigatetheuser to the Product Details page with the selected restaurant details and displaytherestaurant details on product details page.
exports.UserResult = (req, res) => {
    const filter = {}

    if (req.body.city && req.body.city > 0) {
        filter.city = { $in: req.body.city }
    }

    if (req.body.restaurant && req.body.restaurant.length > 0) {
        filter['name'] = { $in: req.body.restaurant }
    }

    Restaurant.find(filter).limit(2).skip(2 * (req.params.pageNo - 1))
        .then(
            result => {
                res.status(200).json({
                    message: "Products fetched sucessfully !",
                    data: result
                })
            }
        )
        .catch(error => {
            res.status(500).json({
                message: "DB error occured !",
                data: error
            })
        })
}

//> On the Filter page, if the user selects the restaurant from the list of restaurants displayedasper the filters applied, navigate the user to the Product Details page with theselectedrestaurant details.
exports.SerchedRestaurant = (req, res) => {
    const filter = {}
    if (req.body.restaurant && req.body.restaurant.length > 0) {
        filter['name'] = { $in: req.body.restaurant }
    }

    Restaurant.find(filter)
        .then(
            result => {
                res.status(200).json({
                    message: "Restaurant fatched sucessfully",
                    data: result
                })
            }
        )
        .catch(error => {
            res.status(500).json({
                message: "DB error occured",
                data: error
            })
        })
}