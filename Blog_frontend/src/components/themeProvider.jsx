
import{useSelector} from 'react-redux'


export default function themeProvider({children}) {
    const {theme}=useSelector(state=>state.theme)
  return (
      <div className={theme}>
          <div className="bg-gray-300 text-black dark:text-gray-200 dark:bg-blue-950 min-h-screen">
              
      {children}
          </div>
    </div>
  )
}
