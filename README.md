# YAJI MOVE — Pilotage

> Copie séparée du logiciel Maison JIYA, rebrandée pour **YAJI MOVE** (padel, puis autres sports).
> Maison JIYA n'est pas touché : base de données, Worker et site sont distincts.

## Mise en ligne (une seule fois)

1. Cloudflare → **Storage & Databases → D1** → créer une base nommée `yaji-move-pilotage-db`.
2. Copier son **Database ID** et le mettre à la place de `A_REMPLACER_PAR_ID_BASE_D1_YAJI` dans `wrangler.jsonc`.
3. GitHub → ce dépôt → **Settings → Secrets and variables → Actions** : ajouter `CLOUDFLARE_API_TOKEN` et `CLOUDFLARE_ACCOUNT_ID` (les mêmes que pour Maison JIYA).
4. Lancer **Actions → Deploy → Run workflow**. L'application sera sur `https://yaji-move-gestion.maisonjya1.workers.dev`.
5. À la première ouverture, créer le compte administrateur.

Pas d'APK Android pour l'instant : l'app s'installe depuis Chrome / Safari (« Ajouter à l'écran d'accueil »).
La boutique publique (`/boutique`) garde provisoirement le contenu de l'ancienne boutique : elle sera refaite à l'étape « site web ».


Plateforme responsive de gestion des commandes, colis, clients, achats, publicités, stock et capital de YAJI MOVE.

## Accès sécurisé

- Connexion interne par nom d’utilisateur et mot de passe, sans compte ChatGPT.
- Rôles `admin`, `editor` et `viewer`.
- Mots de passe hachés avec PBKDF2-SHA256 et sel aléatoire.
- Sessions sécurisées de 12 heures et blocage temporaire après 5 essais incorrects.
- Au premier lancement, la page de connexion permet de créer le compte administrateur principal.

## Développement

```bash
npm ci
npm run dev
```

## Vérifications

```bash
npm run typecheck
npm run lint
npm test
npx wrangler deploy --dry-run
```

## Cloudflare

Le projet utilise Cloudflare Workers, les assets statiques et une base D1 liée sous le nom `DB`. Le fichier `wrangler.jsonc` permet à Cloudflare de créer ou de lier la base `yaji-move-pilotage-db` lors du premier déploiement.

## Données et continuité

- D1 reste la source de vérité de toutes les opérations métier.
- Google Sheets est alimenté après l’écriture D1 par une file durable avec reprise automatique.
- L’administrateur peut télécharger un export complet JSON ou une archive de CSV depuis Paramètres → Sauvegardes.

Architecture, sécurité, reprise et limites externes : [docs/google-sheets-sync.md](docs/google-sheets-sync.md).
