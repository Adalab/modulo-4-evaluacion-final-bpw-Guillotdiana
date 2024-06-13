const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

require('dotenv').config();

const api = express();
api.use(cors());
api.use(express.json());

const PORT = process.env.PORT || 5001;

api.listen(PORT, ()=> {
    console.log(`Sever running in port : http://localhost:${PORT}`)
});

async function connectionBd(){
    const conex = await mysql.createConnection({
        host:process.env.DB_HOST,
        user:process.env.DB_USER,
        password:process.env.DB_PASSWORD,
        database:process.env.DB_NAME
    });
    await conex.connect();
    console.log("conexion con la BD" + conex.threadId)
    return conex;
}

//Endpoint crear un nuevo libro (1)

api.post('/books', async(req, res) => {

    try{
        const conn = await connectionBd();
        const {name, genre, author}= req.body;
        const sqlInsert = 'INSERT INTO library (name, genre, author) VALUES (?,?,?)';
        const [newBook] = await conn.query(sqlInsert, [name, genre, author]); 
        console.log('Holiis');
        res.status(200).json({
            succes: true,
            id: newBook.insertId,
            
        });
        await conn.end();
    }catch(error){
        console.log(error);
        res.status(400).json(error);
    }

});


//Endpoint obtener todos los libros (2)

api.get('/books', async(req, res) => {
    try{
        const conn = await connectionBd();
        const select = 'SELECT * FROM library';
        const [result] = await conn.query(select);
        await conn.end();

        res.status(200).json({
            results: result, // listado
        });
        await conn.end();
    }catch (error){  
        res.status(400).json(error);
    }
});

//Endpoint filtrado de libros  (3)

api.get('/books/:name', async(req, res) => {

    try{
        const {name} = req.params;
        const conn = await connectionBd();
        const select = 'SELECT * FROM library WHERE name = ?';
        const [result] = await conn.query(select, [name]);
    
        if(result.length === 0){
            res.status(400).json({message:"El titulo del libro no existe en la BD"})
        }else{
            res.status(200).json({data:result[0]});
        }
          await conn.end();
    }catch (error){
        res.status(400).json(error);
    }
});


// Endpoint actualizar un libro (4)

api.put('/books/:id', async (req,res) => {
  
    try{
        const conn = await connectionBd();
        const idBook = req.params.id;
        const {name, genre, author} = req.body;

        const changesql = 'UPDATE library SET name= ?, genre= ?, author= ? WHERE id= ?';
        const[result] = await conn.query(changesql, [name, genre, author, idBook]);
        
        if(result.affectedRows > 0){
            res.status(200).json({success: true});
        }else{
            res.status(200).json({success: false, message:'Libro no encontrado'})
        }
        await conn.end();
    }catch(error){
        res.status(400).json(error);
    }
});

// Endpoint eliminar un libro (5)

api.delete('/books/:id', async (req,res) => {
  
    try{
        const conn = await connectionBd();
        const idBook = req.params.id;
        const deletesql = 'DELETE FROM library WHERE id= ?';
        const[result] = await conn.query(deletesql, [idBook]);
        
        if(result.affectedRows > 0){
            res.status(200).json({success: true});
        }else{
            res.status(200).json({success: false, message:'Libro no encontrado'})
        }
        await conn.end();
    }catch(error){
        res.status(400).json(error);
    }
});