import { NextResponse } from "next/server";
import { createZodRoute } from 'next-zod-route';
import { prisma } from "./prisma";
import { redirect } from "next/navigation";

export type CustomResponse<T> =
  | ResponseError
  | ResponseSuccess<T>

type ResponseError = {
  success: false
  error: string
}

type ResponseSuccess<T> = {
  success: true
  data: T
}

export class RouteError extends Error {
  status?: number;
  constructor(message: string, status?: number) {
    super(message);
    this.status = status;
  }
}

export const route = createZodRoute({
  handleServerError: (e: Error) => {
    if (e instanceof RouteError) {
      return NextResponse.json(
        { message: e.message, status: e.status },
        { status: e.status },
      );
    }

    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  },
});

export const authRoute = route.use(async ( {request} ) => {

  const tokenReq = request.headers.get('Authorization');
  
  if (!tokenReq) {
    throw new RouteError("Unauthorized", 401);
  }

  const token = tokenReq?.split(" ")[1];

  const UserID = await prisma.session.findUnique({
    where: {
      sessionToken: token,
    },
    select: {
      userId: true,
    }
  })

  if (!UserID) {
    redirect('/login')
  }

  const Account = await prisma.account.findFirst({
    where: {
      userId: UserID.userId,
      provider: "github",
    }
  })

  return Account;
});

export function ResponseCustom<T>(data: CustomResponse<T>, status: number) {
  return NextResponse.json(data, { status });
}