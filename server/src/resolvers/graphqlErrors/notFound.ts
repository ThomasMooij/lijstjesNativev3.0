import { GraphQLError } from "graphql";

export default function notFound(message: string) {
  const error = new GraphQLError(message);
  (error as any).extensions = { code: 'NOT_FOUND' };
  return error;
}
