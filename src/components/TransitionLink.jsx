import { startTransition, addTransitionType } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function TransitionLink({
  to,
  types = [],
  children,
  onClick,
  target,
  reloadDocument,
  ...props
}) {
  const navigate = useNavigate()

  const handleClick = (event) => {
    onClick?.(event)

    if (
      event.defaultPrevented ||
      reloadDocument ||
      target === '_blank' ||
      types.length === 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      event.button !== 0
    ) {
      return
    }

    event.preventDefault()

    startTransition(() => {
      types.forEach(type => addTransitionType(type))
      navigate(to)
    })
  }

  return (
    <Link
      to={to}
      onClick={handleClick}
      target={target}
      reloadDocument={reloadDocument}
      {...props}
    >
      {children}
    </Link>
  )
}
