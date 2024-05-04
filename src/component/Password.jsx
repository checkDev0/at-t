const Password = ({ password, setPassword }) => {
  return (
    <div className='flex flex-col'>
      <label className='text-[#454B52] font-semibold text-sm mb-1'>
        Pàsswórd
      </label>
      <input
        type='password'
        className='border hover:border-blue-700 rounded-md h-12 px-5 outline-none'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </div>
  )
}

export default Password
