import { MovieModel } from "../models/movie.js"
import { validatePartialMovie, validateMovie } from "../schemas/movies.js"

export class MovieController {
    static async getAll(req, res) {
        const { genre } = req.query
        const movies = await MovieModel.getAll({ genre })
        res.json({ data: movies })

    }

    static async getById(req, res) {
        const { id } = req.params
        const movie = await MovieModel.getById({ id })
        if (!movie) {
            return res.status(404).json({ message: 'Movie not Found' })
        }
        res.json({ data: movie })
    }

    static async create(req, res) {
        const result = validateMovie(req.body)
        if (result.error) {
            return res.status(400).json({ error: JSON.parse(result.error.message) })
        }

        const newMovie = await MovieModel.create({ input: result.data })
        res.status(201).json({ data: newMovie })
    }

    static async update(req, res) {
        const result = validatePartialMovie(req.body)
        if (result.error) {
            return res.status(400).json({ error: JSON.parse(result.error.message) })
        }

        const { id } = req.params
        const updatedMovie = await MovieModel.update({ id, input: result.data })
        if (!updatedMovie) {
            return res.status(404).json({ message: 'Movie not Found' })
        }
        res.json({ data: updatedMovie })
    }

    static async delete(req, res) {
        const { id } = req.params
        const result = await MovieModel.delete({ id })
        if (!result) {
            return res.status(404).json({ message: 'Movie not Found' })
        }
        res.json({ message: 'Movie deleted' })
    }
}