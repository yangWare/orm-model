export default function (model: any, fkey?: string) {
  return function decrator (target: any, key: string) {
    if (!target.$children) {
      target.$children = {}
    }
    target.$children[key] = {
      model,
      fkey,
      type: 'hasMany',
    }
  }
}
