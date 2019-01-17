export default function primaryKey (target: any, key: string) {
  if (!target.$primaryKey) {
    target.$primaryKey = []
  }
  target.$primaryKey.push(key)
}
