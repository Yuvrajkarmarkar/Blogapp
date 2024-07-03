
import{useSelector} from 'react-redux'


export default function themeProvider({children}) {
    const {theme}=useSelector(state=>state.theme)
  return (
      <div className={theme}>
          <div className="bg-white text-black dark:text-white dark:bg-blue-950 min-h-screen">
              
      {children}
          </div>
    </div>
  )
}
