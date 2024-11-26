const {Mistral} = require("@mistralai/mistralai")
require('dotenv').config()

const apiKey = process.env.MISTRAL_API_KEY
const mistralClient = new Mistral({apiKey})

    async function ask(req,res){
        const {query} = req.body

        const response =await mistralClient.chat.complete({
            model:'mistral-tiny',
            messages:[
                {
                    role: 'user',
                    content: query
                }
            ]
        })
        const data = response.choices[0].message.content
        console.log("response: ", response)
       return res.status(200).json({response:data})
    }

module.exports = {ask}