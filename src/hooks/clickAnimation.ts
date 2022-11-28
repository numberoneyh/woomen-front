import { RefObject, useEffect } from 'react'

export const useClickAnimation = (buttonRef: RefObject<HTMLButtonElement>) => {
  useEffect(() => {
    if (buttonRef.current) {
      const btn = buttonRef.current
      const onClick = ({ pageX, pageY }: MouseEvent) => {
        let x = ((pageX - btn?.offsetLeft) * 100) / btn?.offsetWidth
        let y = ((pageY - btn?.offsetTop) * 100) / btn?.offsetHeight

        const ripple = document.createElement('span')
        const rippleColor = btn?.dataset.ripple || '#fff'
        ripple.classList.add('rippleEffect')
        ripple.style.background = rippleColor
        btn?.appendChild(ripple)
        ripple.style.left = x + '%'
        ripple.style.top = y + '%'

        setTimeout(() => {
          ripple.remove()
        }, 700)
      }

      btn?.addEventListener('click', onClick)
      return () => {
        btn?.removeEventListener('click', onClick)
      }
    }
  }, [buttonRef])
}