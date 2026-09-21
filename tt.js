function retuP() {
  return new Promise((res, rej) => {
    res(5 + 5 - 3 * 3363636);
  });
}
async function aad() {
  const result = await retuP();
  return result;
}
async function aa() {
  const aa = aad();
  console.log("🚀 ~ aa ~ aa:", aa);
  console.log("next");
}
aa();
