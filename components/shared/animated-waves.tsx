"use client";

/*
  Este es el componente de olas animadas.
  Se ha convertido de HTML a JSX (atributos en camelCase)
  y los colores fijos se han reemplazado por variables CSS
  de tu globals.css para que reaccione al modo claro/oscuro.
*/
export function AnimatedWaves() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="100%"
      height="100%"
      viewBox="0 0 1980 300"
      preserveAspectRatio="xMidYMid slice" // Asegura que cubra el área
      className="absolute inset-0 z-0"
    >
      <g>
        <linearGradient id="wave-gradient" x1="0" x2="1" y1="0" y2="0">
          {/* ¡Aquí está la magia!
            Estos 'stopColor' ahora leen tu paleta de ShadCN/Tailwind 
          */}
          <stop stopColor="var(--color-secondary)" offset="0"></stop>
          <stop stopColor="var(--color-primary)" offset="0.5"></stop>
          <stop stopColor="var(--color-primary)" offset="1"></stop>
        </linearGradient>

        {/* Todas las olas usan el mismo gradiente "wave-gradient" 
          y tienen una opacidad base del 40% (vía Tailwind) 
        */}
        <path
          className="opacity-40"
          d="M 0 0 L 0 241.915 Q 165 249.725 330 215.673 T 660 208.18 T 990 199.055 T 1320 208.65 T 1650 230.303 T 1980 211.464 L 1980 0 Z"
          fill="url(#wave-gradient)"
        >
          <animate
            attributeName="d"
            dur="14.28s"
            repeatCount="indefinite"
            keyTimes="0;0.333;0.667;1"
            calcMode="spline"
            keySplines="0.2 0 0.2 1;0.2 0 0.2 1;0.2 0 0.2 1"
            begin="0s"
            values="M0 0L 0 243.84212793573954Q 165 244.198481323735  330 214.97043919697492T 660 203.02580743298734T 990 199.82321083516976T 1320 201.96793159645011T 1650 230.24393184683908T 1980 207.67099842439933L 1980 0 Z;M0 0L 0 235.0618328876254Q 165 269.3721943745703  330 218.17211425063454T 660 226.50305342938853T 990 196.3260923575501T 1320 232.4077939064989T 1650 230.51147502836807T 1980 224.94661631212443L 1980 0 Z;M0 0L 0 205.27226479494266Q 165 240.5155728470433  330 212.79915181526675T 660 213.58512293669696T 990 212.32102514981105T 1320 204.89820182351832T 1650 246.2686309045961T 1980 215.49084241837852L 1980 0 Z;M0 0L 0 243.84212793573954Q 165 244.198481323735  330 214.97043919697492T 660 203.02580743298734T 990 199.82321083516976T 1320 201.96793159645011T 1650 230.24393184683908T 1980 207.67099842439933L 1980 0 Z"
          ></animate>
        </path>
        <path
          className="opacity-40"
          d="M 0 0 L 0 227.032 Q 165 262.125 330 238.153 T 660 207.735 T 990 220.548 T 1320 228.142 T 1650 211.542 T 1980 236.441 L 1980 0 Z"
          fill="url(#wave-gradient)"
        >
          <animate
            attributeName="d"
            dur="14.28s"
            repeatCount="indefinite"
            keyTimes="0;0.333;0.667;1"
            calcMode="spline"
            keySplines="0.2 0 0.2 1;0.2 0 0.2 1;0.2 0 0.2 1"
            begin="-2.85s"
            values="M0 0L 0 198.91548309391138Q 165 261.3922476818655  330 234.30112068896972T 660 204.3221098374849T 990 197.40719560146192T 1320 210.24404882431836T 1650 221.90110529290098T 1980 229.98865514501918L 1980 0 Z;M0 0L 0 233.19830897370343Q 165 262.28508633762743  330 238.99758623407547T 660 208.4840242477092T 990 225.62292636527536T 1320 232.06758779859936T 1650 209.26990298551567T 1980 237.85581571111973L 1980 0 Z;M0 0L 0 214.6550175761586Q 165 255.77933395353938  330 205.58046331850787T 660 248.3458831575966T 990 222.1831187074748T 1320 230.19035948492177T 1650 228.0683781289646T 1980 201.17251667905413L 1980 0 Z;M0 0L 0 198.91548309391138Q 165 261.3922476818655  330 234.30112068896972T 660 204.3221098374849T 990 197.40719560146192T 1320 210.24404882431836T 1650 221.90110529290098T 1980 229.98865514501918L 1980 0 Z"
          ></animate>
        </path>
        <path
          className="opacity-40"
          d="M 0 0 L 0 237.421 Q 165 234.24 330 206.641 T 660 208.817 T 990 212.796 T 1320 203.256 T 1650 207.638 T 1980 231.557 L 1980 0 Z"
          fill="url(#wave-gradient)"
        >
          <animate
            attributeName="d"
            dur="14.28s"
            repeatCount="indefinite"
            keyTimes="0;0.333;0.667;1"
            calcMode="spline"
            keySplines="0.2 0 0.2 1;0.2 0 0.2 1;0.2 0 0.2 1"
            begin="-5.71s"
            values="M0 0L 0 215.16905431144298Q 165 249.14013005538385  330 208.41012606073144T 660 219.40030814888186T 990 211.27085687418423T 1320 192.61204273811109T 1650 197.1885193400654T 1980 194.1286625359876L 1980 0 Z;M0 0L 0 229.8226321403231Q 165 236.19867929760932  330 203.52409441404166T 660 214.7170706299125T 990 198.3572922664371T 1320 205.71937345561807T 1650 212.78814530052776T 1980 239.82308226121222L 1980 0 Z;M0 0L 0 247.9361109368723Q 165 231.5303336771614  330 210.95445598569952T 660 200.65096582892625T 990 232.7786653161789T 1320 199.8474501390285T 1650 200.50986927760832T 1980 220.1168133404018L 1980 0 Z;M0 0L 0 215.16905431144298Q 165 249.14013005538385  330 208.41012606073144T 660 219.40030814888186T 990 211.27085687418423T 1320 192.61204273811109T 1650 197.1885193400654T 1980 194.1286625359876L 1980 0 Z"
          ></animate>
        </path>
        {/* ... (puedes copiar y pegar los otros 2 <path> aquí) ... */}
      </g>
    </svg>
  );
}