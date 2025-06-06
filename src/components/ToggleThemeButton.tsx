import { useState } from "react"
import { System, Light, Dark} from "./icons/ThemeIcons"
import { ThemeButton } from "./ThemeButton"
import { ICONS, THEMES } from "src/const/themes"
import { useToggleTheme } from "@src/hooks/useDarkMode"

export function ToggleTheme(){
    const [openOptions, setOpenOptions] = useState(false)
    const {icon, changeTheme} = useToggleTheme()

    const handlechangeTheme = (theme: string) => {
        changeTheme(theme)
        setOpenOptions(false)
    }


    return (
        <div className="relative flex items-center h-full">
            {icon === ICONS.MOON && 
                <button onClick={() => setOpenOptions(!openOptions)}>
                    <Dark className={'w-6 h-6 text-indigo-700 cursor-pointer hover:scale-105 transition-all animate-[show_0.2s_ease-in-out]'}/> 
                </button> 
            }
            {icon === ICONS.SUN && 
                <button onClick={() => setOpenOptions(!openOptions)}>
                    <Light className={'w-6 h-6 text-indigo-700 cursor-pointer hover:scale-105 transition-all animate-[show_0.2s_ease-in-out]'}/> 
                </button>
            }
            {icon === ICONS.SYSTEM && 
                <button onClick={() => setOpenOptions(!openOptions)}>
                    <System className={'w-6 h-6 text-indigo-700 cursor-pointer hover:scale-105 transition-all animate-[show_0.2s_ease-in-out]'}/> 
                </button>
            }
            {
                openOptions && 
                <div className="absolute z-50 bg-[#eee] toggle-btn-wrapper right-0 top-12 rounded-md p-2 flex flex-col">
                    {
                        Object.entries(THEMES).map(([key, value]) => {
                            return (
                                <ThemeButton key={key} theme={value} changeTheme={handlechangeTheme} />
                            )
                        })
                    }
                </div>
            }

        </div>

    )
}
