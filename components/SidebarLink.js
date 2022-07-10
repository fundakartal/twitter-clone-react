const SidebarLink = ({ name, Icon, ActiveIcon, active, onMenuItemClick }) => {
  const isActive = active === name
  return (
    <li
      className=' group mb-2 cursor-pointer text-xl'
      onClick={() => onMenuItemClick(name)}
    >
      <a href={name.toLowerCase()} className='pointer-events-none'>
        <div className='inline-block'>
          <div
            className={`hoverAnimation flex items-center justify-center space-x-4 p-3 text-white-base xl:justify-start xl:pr-7
            ${isActive && 'font-bold'}`}
          >
            {isActive ? <ActiveIcon /> : <Icon />}
            <span className='hidden xxs:xl:inline'>{name}</span>
          </div>
        </div>
      </a>
    </li>
  )
}
export default SidebarLink
