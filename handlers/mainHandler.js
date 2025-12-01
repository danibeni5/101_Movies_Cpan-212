const getHomepage = (req, res) => {
    res.render('index', { title: 'Movie Management' });
};

module.exports = {
    getHomepage,
};
