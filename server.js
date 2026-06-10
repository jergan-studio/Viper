const express = require("express");
const cors = require("cors");
const Groq = require("groq-sdk");

const app = express();

app.use(cors());
app.use(express.json());

const groq = new Groq({
    apiKey: "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"
});

app.post("/upgrade", async (req,res)=>{

    try{

        const code = req.body.code;

        const completion =
        await groq.chat.completions.create({
            model:"llama-3.3-70b-versatile",
            messages:[
                {
                    role:"system",
                    content:
                    "You are Viper AI. Improve code quality, fix bugs, optimize performance, and return ONLY the upgraded code."
                },
                {
                    role:"user",
                    content:code
                }
            ]
        });

        res.json({
            result:
            completion.choices[0].message.content
        });

    }catch(err){

        res.json({
            result:"Error: "+err.message
        });

    }

});

app.listen(3000,()=>{
    console.log("Viper AI running");
});
