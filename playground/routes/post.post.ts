export const validator = defineValidators({
  body: (a) => {
    return { name: "string" };
  },
  params: () => {
    return {
      username: "",
    };
  },
  query: () => {
    return {
      limit: 10,
      page: 1,
    };
  },
});

export default defineEventHandler(async (event) => {
  const body = await _readValidatedBody(event, validator);
  //    ^?
  const query = await _getValidatedQuery(event, validator);
  //    ^?
  const params = await _getValidatedRouterParams(event, validator);
  //    ^?

  const res = await $fetch("/post", { method: "POST" });

  return { name: "s" };
});
