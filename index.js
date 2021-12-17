const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const dbase = require('./queries')
const port = 3000
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger/open-api.yaml');

app.use(bodyParser.json())

app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.get('/', (request, response) => {
    response.json({Welcome: 'Lets create REST API'})
})

app.get('/courses', dbase.getCourses)
app.get('/courses/:id', dbase.getCoursesById)
app.post('/courses', dbase.createCourse)
app.put('/courses/:id', dbase.updateCourse)
app.delete('/courses/:id', dbase.deleteCourse)


app.listen(port, () => {
    console.log(`App is running on port -  ${port}.`)
})

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));