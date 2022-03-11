require("dotenv").config();

const axios = require('axios')

module.exports = async function Authenticate(req, res, next) {
    if (!req.cookies.Authorization) {
        res.redirect("/login");
    } else {
        await axios
            .post(`http://${process.env.HOST_IP}:5000/verify`, {
                Token:
                    req.cookies.Authorization &&
                    req.cookies.Authorization.split(" ")[1],
            })
            .then((response) => {
                req.loggedIn = response.data;
                next();
            })
            .catch((error) => {
                console.log(error);
                res.redirect("/login");
            });
    }
}
