export async function loadable(moduleName) {
  try {
    let module = await import(`${moduleName}`);
    console.log(module);
  } catch (err) {
    console.error("module error");
    return new Error(err);
  }
}