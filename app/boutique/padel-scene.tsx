/* Terrain de padel animé (SVG + CSS, rendu côté serveur, aucun JavaScript).
   Deux joueurs s'échangent la balle ; le logo YJ est peint sur le terrain et sur les raquettes.
   Utilisé dans l'ouverture (animé) et en haut de la boutique (image fixe). Décoratif : aria-hidden. */

const LOGO = "/brand/jy-mark.svg";

function Racket() {
  return <g className="mj-racket">
    <rect className="mj-racket-handle" x="-5" y="34" width="10" height="34" rx="4" />
    <path className="mj-racket-head" d="M0 -46C22 -46 34 -30 34 -8C34 18 18 36 0 38C-18 36 -34 18 -34 -8C-34 -30 -22 -46 0 -46Z" />
    <g className="mj-racket-holes">
      <circle cx="-22" cy="-14" r="2.6" /><circle cx="22" cy="-14" r="2.6" /><circle cx="-24" cy="2" r="2.6" /><circle cx="24" cy="2" r="2.6" />
      <circle cx="-16" cy="18" r="2.6" /><circle cx="16" cy="18" r="2.6" /><circle cx="0" cy="26" r="2.6" />
    </g>
    <image className="mj-racket-logo" href={LOGO} x="-15" y="-38" width="30" height="41" preserveAspectRatio="xMidYMid meet" />
  </g>;
}

/* Joueur dessiné pieds en (0,0), environ 100 unités de haut. Le bras droit tient la raquette et frappe. */
function Player({ side }: { side: "near" | "far" }) {
  return <g className={`mj-player mj-player-${side}`}>
    <g className="mj-player-body">
      <path className="mj-player-legs" d="M0 -46L-11 -24L-15 0M0 -46L10 -24L13 0" />
      <path className="mj-player-torso" d="M0 -46V-78" />
      <path className="mj-player-arm" d="M-2 -74L-16 -60L-22 -48" />
      <circle className="mj-player-head" cx="0" cy="-90" r="9" />
    </g>
    <g className="mj-player-swing">
      <path className="mj-player-arm" d="M3 -74L21 -68L36 -74" />
      <g transform="translate(37 -75) rotate(28) scale(.42) translate(0 -66)"><Racket /></g>
    </g>
  </g>;
}

export default function PadelScene({ className = "" }: { className?: string }) {
  return <svg className={`mj-padel ${className}`} viewBox="0 0 400 400" aria-hidden="true" focusable="false">
    {/* Murs vitrés du fond */}
    <path className="mj-padel-glass" d="M120 92V32M280 92V32M120 32H280M60 260V150M340 260V150" />
    {/* Surface du terrain (vue en perspective) */}
    <path className="mj-padel-surface" d="M120 92H280L362 352H38Z" />
    {/* Logo YJ peint sur le terrain, dans chaque moitié */}
    <g transform="translate(200 268) scale(1 .5)"><image className="mj-court-logo" href={LOGO} x="-62" y="-85" width="124" height="170" /></g>
    <g transform="translate(200 128) scale(.62 .3)"><image className="mj-court-logo" href={LOGO} x="-62" y="-85" width="124" height="170" /></g>
    <path className="mj-padel-lines" d="M120 92H280L362 352H38Z M107 134H293 M70 292H330 M200 134V292" />
    {/* Joueur du fond (petit, derrière le filet) */}
    <g transform="translate(236 112) scale(.5)"><Player side="far" /></g>
    {/* Filet */}
    <g className="mj-padel-net">
      <path className="mj-padel-net-mesh" d="M89 190H311V170H89Z" />
      <path className="mj-padel-net-top" d="M86 170H314" />
      <path className="mj-padel-net-post" d="M88 196V166M312 196V166" />
    </g>
    {/* Balle : ombre au sol + balle en l'air */}
    <g className="mj-ball-track">
      <ellipse className="mj-ball-shadow" cx="0" cy="0" rx="9" ry="3.5" />
      <g className="mj-ball-lift">
        <circle className="mj-ball" cx="0" cy="0" r="9" />
        <path className="mj-ball-seam" d="M-6 -6.5C-1 -3 -1 3 -6 6.5M6 -6.5C1 -3 1 3 6 6.5" />
      </g>
    </g>
    {/* Joueur au premier plan (vu de dos) */}
    <g transform="translate(160 392) scale(1.15)"><Player side="near" /></g>
  </svg>;
}
