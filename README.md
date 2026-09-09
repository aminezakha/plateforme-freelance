# Prise de Masse — Programme Perso

Application (PWA) de suivi musculation + nutrition, personnalisée pour un objectif de 72kg à 82kg, avec un programme d'entraînement sur 5 jours et une nutrition adaptée (budget moyen, ressources courantes au Maroc, appétit limité à 3 repas/jour).

Tout est stocké en local sur l'appareil (`localStorage`) — pas de compte, pas de serveur, pas de données envoyées où que ce soit.

## Fonctionnalités

- **Profil** : calcul des besoins caloriques (formule Mifflin-St Jeor) et des macros à partir de l'âge, la taille, le poids et le niveau d'activité.
- **Entraînement** : programme 5 jours (Push / Pull / Legs / Repos / Upper / Lower / Repos), suivi des séries/reps/poids par séance, historique par exercice pour la surcharge progressive.
- **Nutrition** : 3 repas type denses en calories (pas volumineux) à base d'aliments marocains courants et bon marché, shake de complément optionnel, section "ouvrir l'appétit" (aliments/épices traditionnels), liste d'aliments pas chers.
- **Progression** : courbe de poids, historique des pesées, estimation du temps restant vers l'objectif.

## Installer sur téléphone

1. Ouvrir l'app dans le navigateur du téléphone (Chrome sur Android, Safari sur iOS).
2. Android (Chrome) : menu ⋮ → "Ajouter à l'écran d'accueil".
   iOS (Safari) : bouton Partager → "Sur l'écran d'accueil".
3. L'app s'ouvre ensuite comme une app native, fonctionne hors-ligne après le premier chargement.

## Développement

```bash
npm install
npm run dev      # serveur de développement
npm run build    # build de production (dist/)
npm run preview  # prévisualiser le build
```

Stack : React + TypeScript + Vite, Tailwind CSS v4, vite-plugin-pwa.
