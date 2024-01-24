import { pool } from '../db.js'
import crypto from 'crypto'

export class AlbumController {
  static async getMyAlbums(req, res) {
    const userId = req.userId
    const response = await pool.query(
      'SELECT * FROM album_cards WHERE user_id = $1',
      [userId]
    ) 
    res.status(200).json(response.rows)
  }

  // Creates a new Album with a randomUUID
  static async createNewAlbum(req, res) {
    const userId = req.userId
    const { name } = req.body
    const randomUuid = crypto.randomUUID()
    await pool.query(
      'INSERT INTO album_cards(album_id, name, user_id) VALUES($1, $2, $3)',
      [randomUuid, name, userId]
    )

    res.status(201).send('Album creado correctamente')
  }

  static async editAlbumName(req, res) {
    const userId = req.userId
    const { albumId } = req.params
    const { newName } = req.body
    const result = await pool.query(
      'UPDATE album_cards SET name = $1 WHERE album_id = $2 AND user_id = $3 RETURNING *',
      [newName, albumId, userId]
    )
    if (!result.rowCount) {
      return res.status(404).json({ message: 'El album no existe' })
    }
    console.log(result)
    return res.status(200).json(result.rows[0])
  }

  static async deleteAlbum(req, res) {
    const userId = req.userId
    const { albumId } = req.params
    const result = await pool.query(
      'DELETE FROM album_cards WHERE album_id = $1 AND user_id = $2 RETURNING *',
      [albumId, userId]
    )
    console.log(result)
    
    if (!result.rowCount) {
      return res.status(404).json({ message: 'El album no existe o no te pertenece' })
    }
    res.sendStatus(204)
  }
}
