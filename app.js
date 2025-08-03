// ดึง library ที่ต้องใช้เข้ามา
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mysql = require('mysql2');

const app = express();

// เชื่อมต่อ MySQL
const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'db',      // ต้องใช้ 'db' (ตรงกับ service name ใน docker-compose.yml)
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_NAME || 'finalexam'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database!');
});

// ตั้งค่า template engine เป็น ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// middleware สำหรับอ่านข้อมูลจากฟอร์ม
app.use(bodyParser.urlencoded({ extended: false }));

// ตั้งค่าเส้นทางสำหรับไฟล์ static (เช่น รูปภาพ ไฟล์ pdf)
app.use(express.static(path.join(__dirname, 'public')));

// สร้าง Route สำหรับหน้าแรก (Landing Page)
app.get('/', (req, res) => {
  res.render('index', {
    name: 'Narongsak Yindeesuk',
    studentId: '67130393',
    github: 'https://github.com/NarongsakYindeesuk/finalexam.git'
  });
});

// สร้าง Route สำหรับ About
app.get('/about', (req, res) => {
  res.render('about');
});

// สร้าง Route สำหรับ My Research
app.get('/myresearch', (req, res) => {
  res.render('myresearch');
});

// สร้าง Route สำหรับแสดงอ้างอิง
app.get('/reference', (req, res) => {
  connection.query('SELECT * FROM `references`', (err, results) => {
    if (err) throw err;
    res.render('reference', { references: results });
  });
});

// สร้าง Route สำหรับเพิ่มอ้างอิง
app.post('/reference/delete/:id', (req, res) => {
  const id = req.params.id;
  connection.query(
    'DELETE FROM `references` WHERE id = ?',
    [id],
    (err, result) => {
      if (err) throw err;
      res.redirect('/reference');
    }
  );
});

// เริ่มรัน server ที่ port 80
app.listen(80, () => {
  console.log('Server running on http://localhost');
});

