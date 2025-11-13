type NumberProps = {
    nomor: number
}

function Number ({nomor}: NumberProps){
    return(
        <div className="w-8 h-8 rounded-full bg-accent-light flex justify-center flex-col items-center text-white bg-blue-700">
            {nomor}
        </div>
    )
}

export default Number