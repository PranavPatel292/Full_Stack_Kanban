import { errorMessage } from "./../common/returnMessage";
import { prisma } from "./../prisma/prismaClient";
import { Request, Response, NextFunction } from "express";
import * as yup from "yup";

const schema = yup.object().shape({
  columnId: yup.string().required(),
});

export const validateColumnId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(req.body);
  const { columnId } = req.body.data;

  try {
    await schema.validate({ columnId });
  } catch (error: any) {
    const response: errorMessage = {
      message: error.message,
    };
    res.status(400).send(response);
    return;
  }

  const result = await prisma.columns.findFirst({
    where: {
      id: columnId,
    },
  });

  if (!result) {
    const response: errorMessage = {
      message: "columnId is not in the database",
    };
    res.status(404).send(response);
    return;
  }

  next();
};
