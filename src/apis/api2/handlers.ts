import { Request, Response } from 'express';

export const handler1 = (req: Request, res: Response) => {
  res.send({ message: 'Handler 1 Response' });
};

export const handler2 = (req: Request, res: Response) => {
  const { data } = req.body;
  res.send({ message: `Received ${data}` });
};
