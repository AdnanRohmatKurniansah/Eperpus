"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3000;
app.use('/', (req, res, next) => {
    res.status(200).send({
        data: "oioioioi"
    });
});
app.listen(port, () => {
    console.log(`Server is running in port ${port}`);
});
//# sourceMappingURL=index.js.map