const express = require('express');
const mongoose = require('mongoose');
const Calcultaion = require('./models/Calculation');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/calculatorDB',{
    useNewUrlParser : true,
    useUnifiedTopology:true
});

app.post('/calculate',async(req,res)=>
{
    const{num1,num2,operation} = req.body;
    let result;

    switch(operation)
    {
        case '+':
            result = num1 + num2;
            break;
        case '-':
            result = num1 - num2;
            break;
        case '*':
            result = num1 * num2;
            break;
        case '%':
            result = num1 % num2;
            break;
        case '/':
            result =  num2 !== 0 ? num1 / num2 : null;
            break;
        default:
            return res.status(400).json({error:'Invalid operation'});
    }

    if(result === null)
    {
        return res.status(400).json({error:'Division by zero'});
    }

    const calc = new Calculation({num1,num2,operation,result});
    await calc.save();

    res.json({result});
});

app.listen(500,()=>console.log('server running on port 5000'));