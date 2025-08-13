import React from "react";

function Buton(props) {
  return (
    <>
      <button
        class={
          "middle none center rounded-lg bg-[#163380] py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-[#163280d3] transition-all hover:shadow-lg hover:shadow-[#163280c4] focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none " +
          props.css
        }
        data-ripple-light="true"
      >
        {props.value}
      </button>
    </>
  );
}
export default Buton;
