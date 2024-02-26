// eslint-disable-next-line require-await
export default eventHandler(async (event) => {
  const res = await $fetch("/post", {
    method: "POST",
    query: { limit: 1, page: 10 },
    params: { username: "" },
    body: { name: "hello" },
  });

  return {};
});
