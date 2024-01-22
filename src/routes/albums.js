import Router from 'express-promise-router';
import { AlbumController } from '../controllers/albums.js';

export const albumsRouter = Router()

// Soon we will add Auth to link albums to a specific user
albumsRouter.get('/album/', AlbumController.getMyAlbums)
albumsRouter.patch('/album/:albumId', AlbumController.editAlbumName)
albumsRouter.delete('/album/:albumId', AlbumController.deleteAlbum)
albumsRouter.post('/album/', AlbumController.createNewAlbum)