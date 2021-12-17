const Pool = require('pg').Pool
const pool = new Pool({
    user: 'xxxx',
    host: 'xxxx',
    database: 'xxxx',
    password: '12345',
    port: 5432
})

const getCourses = (request, response) => {
    pool.query('SELECT * from courses ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}


const getCoursesById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * from courses WHERE id= $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const createCourse = (request, response) => {
    const { title, description } = request.body

    pool.query('INSERT INTO courses (title, description) VALUES ($1, $2)', [title, description], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send('A new course added to table')
    })  
}

const updateCourse = (request, response) => {
    const id = parseInt(request.params.id)
    const { title, description } = request.body

    pool.query('UPDATE courses SET title= $1, description=$2 WHERE id = $3', 
    [title, description, id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send('Course details has been updated in Database')
    })
}


const deleteCourse = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('DELETE from courses WHERE id= $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`Course deleted with ID: ${id}`)
    })
}

module.exports = {
    getCourses,
    getCoursesById,
    createCourse,
    updateCourse,
    deleteCourse,
}