export default async function (root, variables, { userId }) {
  return {
    success: !!userId,
    userId
  };
}
