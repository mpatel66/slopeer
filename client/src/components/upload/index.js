import { useState } from 'preact/hooks';

import style from './style.css'
const upload = '/assets/images/upload.svg'
const selected = '/assets/images/done.svg'

const Upload = ({ name }) => {

  const [fileSelected, setFileSelected] = useState(false);

  const handleChange = (e) => {
    setFileSelected(e.target.validity.valid)
  }

  return (
    <label onChange={handleChange} class={fileSelected ? style.selected : style.select}>
      <input
        type='file'
        name={name}
        accept='.png, .jpg'
      />
      <img src={fileSelected ? selected : upload} alt='upload' />
      {fileSelected ? 'Selected' : 'Select a file'}
    </label>
  )
}

export default Upload
