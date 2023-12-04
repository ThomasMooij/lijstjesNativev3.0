import { GraphQLError } from "graphql";

export default function unauthorizedError(message: string) {
  const error = new GraphQLError(message);
  (error as any).extensions = { code: 'UNAUTHORIZED' };
  return error;
}
