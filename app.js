

/* ------------------------------------------------------------  EXPRESS --------------------------------------------------------------------------- */

import express from "express";
const app = express();





/* ------------------------------------------------------------  PORT --------------------------------------------------------------------------- */

const PORT = process.env.PORT || 8080;
app.listen(PORT, (error) => {
    if (error) {
        console.log(error);
    } else {
        console.log("Server is running on port ", PORT);
    }
});