const express = require("express")
const router = express.Router()

let messages = [
    {
        user: "systeem",
        message: "Dit is de start van de chat"
    }
]


router.get('/',(req,res) => {
    res.json(messages)
})

router.post('/', async (req,res) => {
    console.log(req.body)
    messages.push({
        user: req.body.username,
        message: req.body.message
    })
    res.status(200).send()
})





module.exports = router