/* Terrain de padel animé (SVG + CSS, rendu côté serveur, aucun JavaScript).
   Un échange en boucle : la balle traverse le filet, rebondit, puis repart.
   Utilisé dans l'ouverture et en haut de la boutique. Décoratif : aria-hidden. */

function Racket({ className }: { className: string }) {
  return <g className={className}>
    <rect className="mj-racket-handle" x="-5" y="34" width="10" height="34" rx="4" />
    <path className="mj-racket-head" d="M0 -46C22 -46 34 -30 34 -8C34 18 18 36 0 38C-18 36 -34 18 -34 -8C-34 -30 -22 -46 0 -46Z" />
    <g className="mj-racket-holes">
      <circle cx="-14" cy="-24" r="3" /><circle cx="0" cy="-28" r="3" /><circle cx="14" cy="-24" r="3" />
      <circle cx="-20" cy="-8" r="3" /><circle cx="-7" cy="-11" r="3" /><circle cx="7" cy="-11" r="3" /><circle cx="20" cy="-8" r="3" />
      <circle cx="-14" cy="8" r="3" /><circle cx="0" cy="5" r="3" /><circle cx="14" cy="8" r="3" />
    </g>
  </g>;
}

export default function PadelScene({ className = "" }: { className?: string }) {
  return <svg className={`mj-padel ${className}`} viewBox="0 0 400 400" aria-hidden="true" focusable="false">
    {/* Murs vitrés du fond */}
    <path className="mj-padel-glass" d="M120 92V32M280 92V32M120 32H280M60 260V150M340 260V150" />
    {/* Surface du terrain (vue en perspective) */}
    <path className="mj-padel-surface" d="M120 92H280L362 352H38Z" />
    <path className="mj-padel-lines" d="M120 92H280L362 352H38Z M107 134H293 M70 292H330 M200 134V292" />
    {/* Filet */}
    <g className="mj-padel-net">
      <path className="mj-padel-net-mesh" d="M89 190H311V170H89Z" />
      <path className="mj-padel-net-top" d="M86 170H314" />
      <path className="mj-padel-net-post" d="M88 196V166M312 196V166" />
    </g>
    {/* Raquettes */}
    <g transform="translate(250 104) scale(.55)"><Racket className="mj-racket mj-racket-far" /></g>
    <g transform="translate(168 338) scale(.95)"><Racket className="mj-racket mj-racket-near" /></g>
    {/* Balle : ombre au sol + balle en l'air */}
    <g className="mj-ball-track">
      <ellipse className="mj-ball-shadow" cx="0" cy="0" rx="9" ry="3.5" />
      <g className="mj-ball-lift">
        <circle className="mj-ball" cx="0" cy="0" r="9" />
        <path className="mj-ball-seam" d="M-6 -6.5C-1 -3 -1 3 -6 6.5M6 -6.5C1 -3 1 3 6 6.5" />
      </g>
    </g>
  </svg>;
}
