import PadelScene from "./padel-scene";

/* Ouverture de la boutique YAJI MOVE : un échange de padel sur le terrain,
   puis le logo YJ et « Yallah, aji move » arrivent au centre.
   - rendu côté serveur (aucun JavaScript client ajouté au bundle) ;
   - une seule fois par session, passable d'un toucher ou d'une touche ;
   - jamais affichée si l'appareil demande moins d'animations ;
   - le site est déjà chargé dessous : l'animation ne retarde ni le contenu ni Google. */

const INTRO_SCRIPT = `(function(){var el=document.getElementById("mj-intro");if(!el)return;function set(v){el.setAttribute("data-state",v)}try{if(sessionStorage.getItem("mj-intro-seen")){set("off");return}sessionStorage.setItem("mj-intro-seen","1")}catch(e){}if(window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches){set("off");return}function skip(){if(el.getAttribute("data-state")!=="off")set("skip");setTimeout(function(){set("off")},450)}el.addEventListener("click",skip);addEventListener("keydown",skip,{once:true});setTimeout(function(){set("off")},3400)})();`;

export default function BrandIntro() {
  return <>
    <div id="mj-intro" className="mj-intro" aria-hidden="true" data-state="play">
      <div className="mj-intro-stage">
        <PadelScene className="mj-intro-court" />
        <div className="mj-intro-brand">
          <img src="/brand/jy-mark.svg" alt="" width={169} height={232} />
          <strong>YAJI MOVE</strong>
          <small>Yallah, aji move</small>
        </div>
      </div>
    </div>
    <script dangerouslySetInnerHTML={{ __html: INTRO_SCRIPT }} />
  </>;
}
