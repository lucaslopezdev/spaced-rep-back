import { pool } from '../db.js'
import crypto from 'crypto'

export class AlbumController {
  static async getMyAlbums(req, res) {
    // Temporalmente sin pedir userId (viene de un middleware com req.userId mas adelante)
    const response = await pool.query('SELECT * FROM album_cards') //where user_id = $1, [req.userId]
    await pool.end()
    res.status(200).json(response.rows)
  }

  // Creates a new Album with a randomUUID
  static async createNewAlbum(req, res) {
    const { name } = req.body
    const randomUuid = crypto.randomUUID()
    const textQuery = 'INSERT INTO album_cards(album_id, name) VALUES($1, $2)'
    await pool.query(textQuery, [randomUuid, name])

    res.status(201).send('Album creado correctamente')
  }

  static async editAlbumName(req, res) {
    const { albumId } = req.params
    const { newName } = req.body
    const result = await pool.query(
      'UPDATE album_cards SET name = $1 WHERE album_id = $2 RETURNING *',
      [newName, albumId]
    )
    await pool.end()
    if (!result.rowCount) {
      return res.status(404).json({ message: 'El album no existe' })
    }
    console.log(result)
    return res.status(200).json(result.rows[0])
  }

  static async deleteAlbum(req, res) {
    const { albumId } = req.params
    const result = await pool.query(
      'DELETE FROM album_cards WHERE album_id = $1 RETURNING *',
      [albumId]
    )
    await pool.end()
    console.log(result)
    if (!result.rowCount) {
      return res.status(404).json({ message: 'El album no existe' })
    }
    res.sendStatus(204)
  }
}
