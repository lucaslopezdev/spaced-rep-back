"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var cors_1 = require("cors");
var morgan_1 = require("morgan");
var node_cron_1 = require("node-cron");
var dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
// Import Routes
var cards_js_1 = require("./routes/cards.js");
var albums_js_1 = require("./routes/albums.js");
var auth_js_1 = require("./routes/auth.js");
var cookie_parser_1 = require("cookie-parser");
var systemOfFrecuency_js_1 = require("./services/systemOfFrecuency.js");
var PORT = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3005;
var app = (0, express_1.default)();
app.use((0, express_1.json)());
app.disable('x-powered-by');
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)('dev'));
app.use((0, cookie_parser_1.default)());
// Cron to update the next_review_interval of cards every day
node_cron_1.default.schedule('0 0 * * *', function () {
    (0, systemOfFrecuency_js_1.decrementNextReviewCard)();
    console.log('Se ejecuto el cron');
});
// Routes
app.use('/api', auth_js_1.authRouter);
app.use('/api', albums_js_1.albumsRouter);
app.use('/api/album', cards_js_1.cardsRouter);
// Error Handler
app.use(function (err, req, res, next) {
    res.status(500).json({ status: 'error', messsage: err.message });
});
// Error not found
app.use(function (_req, res) {
    res.status(404).send('404 Not Found');
});
app.listen(PORT, function () {
    console.log("Server listening on port: http://localhost:".concat(PORT));
});
