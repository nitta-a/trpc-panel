import MailLockIcon from '@mui/icons-material/MailLockOutlined'
import Search from '@mui/icons-material/Search'
import { Chevron } from '@src/react-app/components/Chevron'
import { useHeadersContext } from '@src/react-app/components/contexts/HeadersContext'
import { useSearch } from '@src/react-app/components/contexts/SearchStore'
import { useIsMac } from '@src/react-app/components/hooks/useIsMac'
import { LogoSvg } from '@src/react-app/components/LogoSvg'
import type React from 'react'

interface TopBarProps {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}
export function TopBar(props: TopBarProps) {
  const { open, setOpen } = props
  const { setHeadersPopupShown } = useHeadersContext()

  return (
    <div className="w-full px-4 pr-8 flex flex-row justify-between items-center position-fixed left-0 h-16 right-0 top-0 bg-gray-50 drop-shadow-sm bg-actuallyWhite border-b border-b-panelBorder">
      <div className="flex flex-row items-center gap-4">
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Toggle sidebar"
          aria-pressed={open}
        >
          {open ? (
            <Chevron className="w-4 h-4" direction="left" />
          ) : (
            <Chevron className="w-4 h-4" direction="right" />
          )}
        </button>
        <span className="flex flex-row items-center text-lg font-bold font-mono">
          <LogoSvg className="rounded-lg w-10 h-10 mr-2" />
          tRPC.panel()
        </span>
      </div>
      <RouterSearchTooltip />
      <button
        type="button"
        onClick={() => setHeadersPopupShown(true)}
        className="border border-neutralSolidTransparent py-2 px-4 text-neutralText font-bold rounded-sm shadow-sm"
      >
        Headers
        <MailLockIcon className="w-6 h-6 ml-1" />
      </button>
    </div>
  )
}

// import Search from '@mui/icons-material/Search'
export function RouterSearchTooltip() {
  const searchOpen = useSearch((s) => s.searchOpen)
  const setSearchOpen = useSearch((s) => s.setSearchOpen)

  const isMac = useIsMac()
  const helperText = isMac ? '⌘ + P' : 'Ctrl + P'

  if (searchOpen) return null

  return (
    <button
      onClick={() => setSearchOpen(true)}
      type="button"
      className="flex flex-row items-center text-neutralSolidTransparent"
    >
      <Search fontSize="small" className="mr-2 color-neutralSolidTransparent" />
      {helperText}
    </button>
  )
}
