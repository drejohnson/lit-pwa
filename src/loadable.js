const load = async componentName => await import(`./${componentName}`);

export default async function loadable(moduleName) {
  try {
    let module = await import(`./${moduleName}`);
    const component = await module.default;
    return component;
  } catch (err) {
    console.error('module error');
    return new Error(err);
  }
}
