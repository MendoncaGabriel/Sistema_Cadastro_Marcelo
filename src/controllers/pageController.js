
module.exports = {
    login: (req, res) => {
        const data = {
            titulo: "Login"
        }
        res.render('login', data)
    }
}