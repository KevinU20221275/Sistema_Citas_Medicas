// src/store/useCurrentPath.ts
import { useEffect, useState } from "react"

let _path = ""
const listeners: ((path: string) => void)[] = []

export function useCurrentPath() {
  const [currentPath, setCurrentPath] = useState(_path)

  useEffect(() => {
    const newPath = window.location.pathname
    _path = newPath
    setCurrentPath(newPath)
    listeners.forEach((fn) => fn(newPath))
  }, [])

  useEffect(() => {
    const update = (newPath: string) => setCurrentPath(newPath)
    listeners.push(update)
    return () => {
      const index = listeners.indexOf(update)
      if (index > -1) listeners.splice(index, 1)
    }
  }, [])

  return currentPath
}
