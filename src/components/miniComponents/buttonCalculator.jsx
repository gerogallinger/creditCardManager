

function ButtonCalculator({ title, type }) {

    return (

        <button type={type} class="cursor-pointer group relative flex gap-1.5 px-8 py-4 bg-black bg-opacity-80 text-[#f1f1f1] rounded-3xl hover:bg-opacity-70 transition font-semibold shadow-md">
            <span class="material-symbols-outlined">
                calculate
            </span>
            {title}
            <div class="absolute opacity-0  rounded-md py-2 px-2 bg-black bg-opacity-70 
                    left-1/2  transition-opacity shadow-lg"/>


        </button>
    );
}

export default ButtonCalculator;