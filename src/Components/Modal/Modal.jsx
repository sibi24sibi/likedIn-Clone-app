const Modal = ({open, onclose, children}) => {
  return (
    <div onClick={onclose} className={`relative inset-0 flex justify-center items-center transition-colors ${open ? "visible bg-black/20" : "invisible" }`}>
        <div onClick={(e) => e.stopPropagation()} className={`w-[40%] transition-all ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}`}>
            <button onClick={onclose} className="absolute top-2 right-2 p-4 rounded-lg text-2xl">x</button>
            {children} 
        </div>
    </div>
  )
}

export default Modal;