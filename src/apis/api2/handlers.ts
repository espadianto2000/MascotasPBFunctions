import { Request, Response } from 'express';
import * as admin from 'firebase-admin';
import { config } from '../../config';

export const createPet = async (req: Request, res: Response) => {
  try {
    const { name, foto, horasComida, groupId } = req.body;
    const now = new Date();
    const user = (req as any).user;
    const firestore = admin.firestore();
    const petDocumentRef = firestore.collection(config.collectionPets);
    const newPetRef = await petDocumentRef.add({
      name: name,
      created_at: now,
      creator_id: user.user_id,
      foto: foto ?? '',
      horasComida: horasComida,
      groupId: groupId,
      active: true,
    });
    return res.status(200).json({
      message: 'Successfull--Pet Created',
      newGroup: newPetRef,
    });
  } catch (e) {
    return res.status(500).send(`server error: ${e}`);
  }
};

export const editPet = (req: Request, res: Response) => {
  const { data } = req.body;
  res.send({ message: `Received ${data}` });
};

export const deletePet = (req: Request, res: Response) => {
  const { data } = req.body;
  res.send({ message: `Received ${data}` });
};

export const feedPet = (req: Request, res: Response) => {
  const { data } = req.body;
  res.send({ message: `Received ${data}` });
};
