// Generic FP utils
export const compose = (...fns) =>
  fns.reduce((f, g) => (...args) => f(g(...args)));
export const map = fn => list => list.map(fn);
export const filter = fn => list => list.filter(fn);
export const lt = left => right => left < right;
export const add = left => right => left + right;
export const upper = str => str.toUpperCase();
export const prop = key => obj => obj[key];
export const assoc = key => val => obj => {
  obj[key] = val;
  return obj;
};

// FP Lenses
export const lens = get => set => ({ get, set });
export const view = lens => obj => lens.get(obj);
export const set = lens => val => obj => lens.set(val)(obj);
export const over = lens => fn => obj => set(lens)(fn(view(lens)(obj)))(obj);
export const lensProp = key => lens(prop(key))(assoc(key));
