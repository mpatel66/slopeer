import style from './style.css'

const Content = ({ children }) => {
  return (
    <div class={style.content}>
      {children}
    </div>
  )
}

export default Content
