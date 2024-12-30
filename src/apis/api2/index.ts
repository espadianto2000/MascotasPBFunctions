import { Router } from 'express';
import { createPet, editPet, deletePet, feedPet } from './handlers';

const router = Router();

router.get('/create-pet', (req, res) => {
  createPet(req, res);
});

router.post('/delete-pet', (req, res) => {
  deletePet(req, res);
});

router.post('/edit-pet', (req, res) => {
  editPet(req, res);
});

router.post('/feed-pet', (req, res) => {
  feedPet(req, res);
});

export default router;
