const express = require('express');
const app = express();
const cors = require('cors');
const loginRoute = require('./routes/loginRoute');
const coinRoute = require('./routes/coinRoute');
const statsRoute = require('./routes/statsRoute');
const moedasRoute = require('./routes/moedasRoute');
const premioRoute = require('./routes/premioRoute');
const othersRoute = require('./routes/othersRoute');
const gameRoute = require('./routes/gameRoute');
const focusRoute = require('./routes/focusRoute');
const allGameRoute = require('./routes/allGameRoute');
const allFocusRoute = require('./routes/allFocusRoute');
const allStylesRoute = require('./routes/allStylesRoute');
const upGameRoute = require('./routes/upGameRoute');
const upFocusRoute = require('./routes/upFocusRoute');
const metasRoute = require('./routes/metasRoute');
const mt1Route = require('./routes/mt1Route');
const ptdiaRoute = require('./routes/ptdiaRoute');
const createRoute = require('./routes/createRoute');
const resgateRoute = require('./routes/resgateRoute');
const resgFeitosRoute = require('./routes/resgFeitosRoute');
const editRoute = require('./routes/editRoute');

app.use(cors());


app.use(express.json()); 

app.use('/login', loginRoute);

app.post('/create', createRoute);

const verifyToken = require('./middlewares/verifyToken');

app.post('/coin', verifyToken, coinRoute);

app.post('/stats', verifyToken, statsRoute);

app.post('/moedas', verifyToken, moedasRoute);

app.post('/premios', verifyToken, premioRoute);

app.post('/otherspremios', verifyToken, othersRoute);

app.post('/game', verifyToken, gameRoute);

app.post('/focus', verifyToken, focusRoute);

app.post('/metas', verifyToken, metasRoute);

app.post('/meta1', verifyToken, mt1Route);

app.post('/ptdia', verifyToken, ptdiaRoute);

app.post('/resg', verifyToken, resgateRoute);

app.post('/rfeitos', verifyToken, resgFeitosRoute);

app.put('/edit', verifyToken, editRoute);

app.put('/upgame',verifyToken,upGameRoute);

app.put('/upfocus',verifyToken,upFocusRoute);

app.get('/allgame', allGameRoute);

app.get('/allfocus', allFocusRoute);

app.get('/allstyles', allStylesRoute);




const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});