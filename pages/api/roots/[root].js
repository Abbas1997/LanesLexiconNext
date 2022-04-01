const sqlite3 = require('sqlite3').verbose();

//let db = new sqlite3.Database('C:\\coding\\LanesLexicon\\laneslexicon\\pages\\api\\lexicon.sqlite', (err) => {
let db = new sqlite3.Database(process.env.DB_PATH, (err) => {
    if (err) {
        console.error(err.message);
    }
});

export default  async function handler (req, res) {
    const {root} = req.query;
    console.log(root);
    db.all("SELECT word FROM root WHERE letter = $root AND word <> $root ORDER BY word ASC", {$root : root}, (err, rows) => {
        if (err) {
            console.log(err.message);
        }
        else {
            console.log("no error");
            res.json(rows);
        }
    })
}