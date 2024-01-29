var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { pool } from '../db.js';
import crypto from 'crypto';
export class AlbumController {
    static getMyAlbums(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.userId;
            const response = yield pool.query('SELECT * FROM album_cards WHERE user_id = $1', [userId]);
            res.status(200).json(response.rows);
        });
    }
    static createNewAlbum(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.userId;
            const { name } = req.body;
            const randomUuid = crypto.randomUUID();
            yield pool.query('INSERT INTO album_cards(album_id, name, user_id) VALUES($1, $2, $3)', [randomUuid, name, userId]);
            res.status(201).send('Album creado correctamente');
        });
    }
    static editAlbumName(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.userId;
            const { albumId } = req.params;
            const { newName } = req.body;
            const result = yield pool.query('UPDATE album_cards SET name = $1 WHERE album_id = $2 AND user_id = $3 RETURNING *', [newName, albumId, userId]);
            if (!result.rowCount) {
                return res.status(404).json({ message: 'El album no existe' });
            }
            console.log(result);
            return res.status(200).json(result.rows[0]);
        });
    }
    static deleteAlbum(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.userId;
            const { albumId } = req.params;
            const result = yield pool.query('DELETE FROM album_cards WHERE album_id = $1 AND user_id = $2 RETURNING *', [albumId, userId]);
            console.log(result);
            if (!result.rowCount) {
                return res
                    .status(404)
                    .json({ message: 'El album no existe o no te pertenece' });
            }
            res.sendStatus(204);
        });
    }
}
