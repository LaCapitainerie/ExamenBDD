import { createSafeActionClient } from 'next-safe-action';
import { z } from 'zod';

export class ActionError extends Error {}

type handleServerError = (e: Error) => string;

const handleServerError: handleServerError = (e) => {
  if (e instanceof ActionError) {
    console.log("[DEV] - Action Error", e.message);
    return e.message;
  }

  console.log("[DEV] - Unknown Error", e);

  return "An unexpected error occurred.";
};

export const actionClient = createSafeActionClient({
  handleServerError: (error) => {

    if (error instanceof ActionError) {

      return error.message; 
    } 

    return 'Oh no, generic error'; 
  }, 
  defineMetadataSchema() {
    return z.object({
      role: z.string(),
    });
  },
});

export const authActionClient = actionClient.use(async ({ next, metadata }) => {
    const currentUser = { roles: ['admin'] };
  
    if (!currentUser) {
      throw new Error('You are not allowed to create a user');
    }
  
    if (!currentUser.roles.includes(metadata.role)) {
      throw new Error('You are not allowed to do this action.');
    }
  
    return next({ ctx: { user: currentUser } });
  });