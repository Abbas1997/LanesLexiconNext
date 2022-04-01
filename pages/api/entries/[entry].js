const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database(process.env.DB_PATH, (err) => {
    if (err) {
        console.error(err.message);
    }
});

export default  async function handler (req, res) {
    const {entry} = req.query;
    db.all("SELECT xml FROM entry WHERE word = $entry", {$entry : entry}, (err, rows) => {
        if (err) {
            console.log(err.message);
        }
        else {
            console.log("no error");
            res.json(rows);
        }
    })
}