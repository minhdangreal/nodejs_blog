const Course = require('../models/Course');

class CourseController {
    show(req, res, next) {
        Course.findOne({ slug: req.params.slug })
            .lean()
            .then((course) => {
                res.render('courses/show', { course: course });
            })
            .catch(next);
    }
    create(req, res, next) {
        res.render('courses/create');
    }
    store(req, res, next) {
        const course = new Course(req.body);
        course
            .save()
            .then(() => res.redirect('/'))
            .catch((error) => {
                console.error(error);
                res.status(500).send('Error saving course');
            });
    }
    edit(req, res, next) {
        Course.findById(req.params.id)
            .lean()
            .then((course) => res.render('courses/edit', { course: course }))
            .catch(next);
    }
    update(req, res, next) {
        Course.updateOne({ _id: req.params.id }, req.body)
            .then(() => {
                req.flash('success', 'Cập nhật khóa học thành công!');
                res.redirect('/me/stored/courses?toast=success');
            })
            .catch(next);
    }
    delete(req, res, next) {
        Course.deleteOne({ _id: req.params.id })
            .then(() => {
                req.flash('success', 'Xóa khóa học thành công!');
                res.redirect(req.get('Referrer') || '/');
            })
            .catch(next);
    }
}

module.exports = new CourseController();
