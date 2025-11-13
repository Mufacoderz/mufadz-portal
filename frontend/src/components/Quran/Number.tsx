type NumberProps = {
    nomor: number
}

function Number ({nomor}: NumberProps){
    return(
        <div className="w-8 h-8 min-w-[2.5rem] min-h-[2.5rem] rounded-full bg-accent-light flex justify-center flex-col items-center text-white dark:text-gray-700 bg-blue-700 dark:bg-blue-300">
            {nomor}
        </div>
    )
}

export default Number