const rateLimiter = require("express-rate-limit");

const limiter = rateLimiter({
    max: 30,
    windowMS: 10000,
    message: "Nombre maximum de requêtes, veuillez patienter",
    });

    
module.exports = limiter
