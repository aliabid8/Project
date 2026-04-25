const express = require('express');
const { Pool } = require('pg')
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
    connectionString : process.env.DATABASE_URL,
    ssl : {
        rejectUnauthorized : false
    }
});

app.get('/',async(req,res)=>{
    try{
            res.json({message : "SUCCESSFULLY CONNECTED...!"})
    }catch(err)
    {
        res.status(500).json({error : err.message});
    }
});

// -----------------regIONS--------------------
app.get('/region',async(req,res)=>{
    try{
        const result = await pool.query('select * from regions;');
            res.json(result.rows)
    }catch(err)
    {
        res.status(500).json({error : err.message});
    }
});

// -----------------Countries--------------------
app.get('/country',async(req,res)=>{
    try{
        const result = await pool.query('select * from countries;');
            res.json(result.rows)
    }catch(err)
    {
        res.status(500).json({error : err.message});
    }
});


const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`SERVER RUNNING ON PORT ${PORT}`);
})