const express = require('express');
const app = express();

const bodyParser = require('body-parser');

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'));

const bookList = [
    { id: 1, title: "1984", author: "George Orwell", year: 1949 },
    { id: 2, title: "A Revolução dos Bichos", author: "George Orwell", year: 1945 },
    { id: 3, title: "O Processo", author: "Franz Kafka", year: 1925 },
    { id: 4, title: "Crime e Castigo", author: "Fiódor Dostoiévski", year: 1866 },
    { id: 5, title: "A Metamorfose", author: "Franz Kafka", year: 1915 },
    { id: 6, title: "O Retrato de Dorian Gray", author: "Oscar Wilde", year: 1890 },
    { id: 7, title: "A Insustentável Leveza do Ser", author: "Milan Kundera", year: 1984 },
    { id: 8, title: "Lolita", author: "Vladimir Nabokov", year: 1955 },
    { id: 9, title: "Cem Anos de Solidão", author: "Gabriel García Márquez", year: 1967 },
    { id: 10, title: "Moby Dick", author: "Herman Melville", year: 1851 },
    { id: 11, title: "O Apanhador no Campo de Centeio", author: "J.D. Salinger", year: 1951 },
    { id: 12, title: "Ulisses", author: "James Joyce", year: 1922 },
    { id: 13, title: "O Estrangeiro", author: "Albert Camus", year: 1942 },
    { id: 14, title: "O Senhor dos Anéis", author: "J.R.R. Tolkien", year: 1954 },
    { id: 15, title: "As Vinhas da Ira", author: "John Steinbeck", year: 1939 },
  ];
  
let activeSearch = false;

app.get('/', (req, res) => {
  res.render('home-page', { results: [], errorMessage: "", activeSearch });
});

app.get('/search', (req, res) => {
  let query = req.query;

  if (!query.title) {
    return res.render("home-page", { errorMessage: "No results found for your search.", results: [], activeSearch });
  }

  const results = bookList.filter((book) => book.title.toLowerCase().includes(query.title.toLowerCase()));

  if (query.title.trim() === "" || results.length === 0) {
    return res.render("home-page", { errorMessage: "No results found for your search.", results: [], activeSearch });
  }

  res.render("home-page" , { results,  errorMessage: "", activeSearch: true });
});

app.post('/ano/:year', (req, res) => {
     let year = req.params.year;
     const results = bookList.filter((book) => book.year == year);

  if (year.trim() === "" || results.length === 0) {
    return res.render("home-page", { errorMessage: "No results found for your search.", results: [], activeSearch });
  }

  res.render("home-page" , { results,  errorMessage: "", activeSearch: true });
});

app.listen(3000, () => console.log('Server ready'));
