const sqlite3 = require('sqlite3').verbose();

//let db = new sqlite3.Database('C:\\coding\\LanesLexicon\\laneslexicon\\pages\\api\\lexicon.sqlite', (err) => {
let db = new sqlite3.Database(process.env.DB_PATH, (err) => {
    if (err) {
        console.error(err.message);
    }
});

export default  async function handler (req, res) {
    console.log(req.query)
    const {search} = req.query;
    console.log('searching for ' + search);
    db.all("SELECT word FROM entry ", (err, rows) => {
        if (err) {
            console.log(err.message);
        }
        else {
            let x = [];
            rows.forEach(element => {
                if(element.word.replace(/[\u064b-\u064f\u0650-\u0652]/g, "")
                 == search.replace(/[\u064b-\u064f\u0650-\u0652]/g, "")) {
                     console.log(element)
                     x.push(element);
                 }
            })
            res.json(x);
            //res.json(rows);
        }
    })
}




