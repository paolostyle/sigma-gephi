/**
 * Sigma.js Utils
 * ===============
 *
 * Various helper functions & classes used throughout the library.
 */

/**
 * Very simple Object.assign-like function.
 *
 * @param  {object} target       - First object.
 * @param  {object} [...objects] - Objects to merge.
 * @return {object}
 */
export function assign(target, ...objects) {
  target = target || {};

  for (let i = 0, l = objects.length; i < l; i++) {
    if (!objects[i]) continue;

    for (const k in objects[i]) target[k] = objects[i][k];
  }

  return target;
}

export function extend(array, values) {
  const l1 = array.length;
  const l2 = values.length;

  if (l2 === 0) return;

  array.length += values.length;

  for (let i = 0; i < l2; i++) array[l1 + i] = values[i];
}
