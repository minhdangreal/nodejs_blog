const Course = require('../models/Course');

class SiteController {
    index(req, res, next) {
        Course.find({})
            .lean()
            .then((courses) => res.render('home', { courses }))
            .catch(next);
    }
    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController();
