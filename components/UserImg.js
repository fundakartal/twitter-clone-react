export default function UserImg({ className, src }) {
  return (
    <img
      src={src}
      alt='Profile image'
      className={`rounded-full ${className}`}
    />
  )
}
