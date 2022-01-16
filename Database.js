// include library
const mongoose = require("mongoose");
const assert = require("assert");
const db_url = process.env.DB_URL;

//Database connect
async function db() {
    await mongoose.connect(
        db_url,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        },
        (err,link) => {
            //check database connect error
            assert.strictEqual(err, null, "DB Connect Fail...");

            // Database connect successfully
            console.log('Database connect successfully');
        }
    );
        
}

db().catch(error => console.log(error));
