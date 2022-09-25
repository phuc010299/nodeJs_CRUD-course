class SiteController {
    // GET /home
    index(req, res) {
        res.render('home');
    }

    // [GET] /search
    search(req, res) {
        res.render('search');
    }
}

// export
module.exports = new SiteController();
