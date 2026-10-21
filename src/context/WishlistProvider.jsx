import { useCallback, useMemo } from 'react'
import { WishlistContext } from './wishlist'
import { useLocalStorage } from '../hooks/useLocalStorage'

// Saved trips are stored as keys like "destination:sajek-valley" or "package:sundarbans-safari".
export function WishlistProvider({ children }) {
  const [saved, setSaved] = useLocalStorage('bhromon:wishlist', [])

  const toggle = useCallback(
    (key) => setSaved((list) => (list.includes(key) ? list.filter((k) => k !== key) : [...list, key])),
    [setSaved],
  )
  const remove = useCallback((key) => setSaved((list) => list.filter((k) => k !== key)), [setSaved])
  const isSaved = useCallback((key) => saved.includes(key), [saved])

  const value = useMemo(() => ({ saved, toggle, remove, isSaved }), [saved, toggle, remove, isSaved])

  return <WishlistContext value={value}>{children}</WishlistContext>
}
