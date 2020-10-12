import express from 'express';
import router from './routes/index';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../public/api-docs/swagger.json';
const app=express();

const port= process.env.PORT || 5000;

app.use( (request, response, next) => {
	response.header('Access-Control-Allow-Origin', '*');
	response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});
app.use('/api-documentation',swaggerUi.serve,swaggerUi.setup(swaggerDocument));
app.use(router);

//listerning the server 
app.listen(port, err => {
	if (err) {
		console.log(err);
	} else {
		console.log(`Server is listerning on ${port}`);
	}
});