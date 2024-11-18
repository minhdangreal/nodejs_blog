const Course = require('../models/Course');

class MeController {
    storedCourses(req, res, next) {
        Course.find({})
            .lean()
            .then((courses) =>
                res.render('me/stored-course', { courses: courses }),
            )
            .catch(next);
    }
}

module.exports = new MeController();
