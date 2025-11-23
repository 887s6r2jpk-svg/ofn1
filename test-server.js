import express from 'express';
const app = express();
app.get('/ping', (req,res)=>res.json({pong:true}));
app.listen(4500, ()=> console.log('Test server on 4500'));
setInterval(()=>{}, 1000);