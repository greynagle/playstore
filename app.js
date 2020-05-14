const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const store = require("./store.js");

const app = express();

app.use(morgan("common"));
app.use(cors());

function capFirst(string) {
	return string.charAt(0).toUpperCase()+string.toLowerCase().slice(1)
}

app.get("/apps", (req, res) => {
    let { sort = "", genres } = req.query;
    sort=capFirst(sort)
	genres=capFirst(genres)

	console.log(sort, genres)

    if (
        !["Action", "Puzzle", "Strategy", "Casual", "Arcade", "Card"].includes(
            genres
        )
    ) {
        return res
            .status(400)
            .send(
                "Query must be either action, puzzle, strategy, casual, arcade, or card"
            );
    }

    if (!["Rating", "App", ""].includes(sort)) {
        return res.status(400).send("Sort must be either rating or app");
    }

    let results = store.filter((store) =>
        store.Genres.toLowerCase().includes(genres.toLowerCase())
    );

    switch (capFirst(sort)) {
        case "Rating":
            results.sort((a, b) => {
                return a[sort] < b[sort] ? 1 : a[sort] > b[sort] ? -1 : 0;
            });
            break;

        case "App":
            results.sort((a, b) => {
                return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
            });
            break;

        default:
            break;
    }

    // if (sort) {
    //     results.sort((a, b) => {
    //         return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
    //     });
    // }

    res.send(results);
});

app.listen(8000, () => {
    console.log("Server listening on PORT 8000");
});
