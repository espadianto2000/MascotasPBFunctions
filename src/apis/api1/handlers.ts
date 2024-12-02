import { Request, Response } from 'express';
import * as admin from 'firebase-admin';
import { config } from '../../config';

export const handlerCreate = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const now = new Date();
    const user = (req as any).user;
    const firestore = admin.firestore();
    const groupDocumentRef = firestore.collection(config.collectionGroup);
    const newGroupRef = await groupDocumentRef.add({
      name: name,
      created_at: now,
      creator_id: user.user_id,
      members: [user.user_id],
      active: true,
      pets: [],
    });
    return res.status(200).json({
      message: 'Successfull--Group Created',
      newGroup: newGroupRef,
    });
  } catch (e) {
    return res.status(500).send(`server error: ${e}`);
  }
};

export const handlerDelete = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    console.log('req.body', req.body);
    console.log('data', id);
    const user = (req as any).user;

    const docRef = admin.firestore().collection(config.collectionGroup).doc(id);
    const docSnapshot = await docRef.get();
    if (!docSnapshot.exists) {
      return res.status(400).json({
        message: 'Error--Group does not exist',
      });
    }
    if (docSnapshot?.data()?.creator_id == user.user_id) {
      await docRef.delete();
      return res.status(200).json({
        message: 'Successfull--Group Deleted',
      });
    } else {
      return res.status(401).json({
        message: 'Error--You are not group creator',
      });
    }
  } catch (e) {
    return res.status(500).send(`server error: ${e}`);
  }
};

export const handlerJoin = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    const user = (req as any).user;

    const docRef = admin.firestore().collection(config.collectionGroup).doc(id);
    const docSnapshot = await docRef.get();
    if (!docSnapshot.exists) {
      return res.status(400).json({
        message: 'Error--Group does not exist',
      });
    }
    const currentMembers = docSnapshot.data()?.members;
    if (!currentMembers.some(user.user_id)) {
      await docRef.update({
        members: admin.firestore.FieldValue.arrayUnion(user.user_id),
      });
      return res.status(200).json({
        message: 'Successfull--Join Group',
      });
    } else {
      return res.status(400).json({
        message: 'Error--You are already a member of the group',
      });
    }
  } catch (e) {
    return res.status(500).send(`server error: ${e}`);
  }
};

export const handlerLeave = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    const user = (req as any).user;

    const docRef = admin.firestore().collection(config.collectionGroup).doc(id);
    const docSnapshot = await docRef.get();
    if (!docSnapshot.exists) {
      return res.status(400).json({
        message: 'Error--Group does not exist',
      });
    }
    const currentMembers = docSnapshot.data()?.members;
    if (currentMembers.some(user.user_id)) {
      await docRef.update({
        members: admin.firestore.FieldValue.arrayRemove(user.user_id),
      });
      return res.status(200).json({
        message: 'Successfull--Leave Group',
      });
    } else {
      return res.status(400).json({
        message: 'Error--You are not a member of the group',
      });
    }
  } catch (e) {
    return res.status(500).send(`server error: ${e}`);
  }
};
