const SidebarLink = ({ name, Icon, ActiveIcon, active, onMenuItemClick }) => {
  const isActive = active === name
  return (
    <li
      className=' group cursor-pointer text-xl mb-2'
      onClick={() => onMenuItemClick(name)}
    >
      <a href={name.toLowerCase()} className='pointer-events-none'>
        <div className='inline-block'>
          <div
            className={`text-white-base p-3 xl:pr-7 flex items-center justify-center xl:justify-start space-x-4 hoverAnimation
            ${isActive && 'font-bold'}`}
          >
            {isActive ? <ActiveIcon /> : <Icon />}
            <span className='hidden xl:inline'>{name}</span>
          </div>
        </div>
      </a>
    </li>
  )
}
export default SidebarLink