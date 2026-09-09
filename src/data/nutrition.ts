export interface MealItem {
  name: string
  quantity: string
  kcal: number
  proteinG: number
}

export interface Meal {
  id: string
  label: string
  description: string
  items: MealItem[]
}

/**
 * 3 repas denses en calories mais pas volumineux — pensés pour un appétit
 * limité : privilégier la densité calorique (huile d'olive, beurre de
 * cacahuète, fruits secs, lait entier) plutôt que le volume dans l'assiette.
 * Ingrédients courants et bon marché au Maroc.
 */
export const MEALS: Meal[] = [
  {
    id: 'petit-dej',
    label: 'Petit-déjeuner',
    description: 'Rapide et dense — ne demande pas un gros appétit au réveil',
    items: [
      { name: 'Œufs entiers', quantity: '3', kcal: 210, proteinG: 18 },
      { name: 'Pain complet ou pain maison', quantity: '2 tranches', kcal: 180, proteinG: 6 },
      { name: 'Beurre de cacahuète', quantity: '1 cuillère à soupe', kcal: 95, proteinG: 4 },
      { name: 'Lait entier', quantity: '1 grand verre (250ml)', kcal: 150, proteinG: 8 },
      { name: 'Dattes', quantity: '3', kcal: 70, proteinG: 0.5 },
    ],
  },
  {
    id: 'dejeuner',
    label: 'Déjeuner',
    description: 'Le repas principal — protéine + féculent + légumes à l\'huile d\'olive',
    items: [
      { name: 'Poulet ou viande hachée', quantity: '150g', kcal: 280, proteinG: 40 },
      { name: 'Riz ou couscous', quantity: '1 tasse et demie cuit', kcal: 300, proteinG: 6 },
      { name: 'Légumes cuits (courgette, carotte, pois chiches)', quantity: '1 bol', kcal: 150, proteinG: 6 },
      { name: 'Huile d\'olive', quantity: '1-2 cuillères à soupe', kcal: 180, proteinG: 0 },
    ],
  },
  {
    id: 'diner',
    label: 'Dîner',
    description: 'Plus léger en volume mais toujours dense en calories',
    items: [
      { name: 'Omelette (2-3 œufs)', quantity: '1', kcal: 220, proteinG: 16 },
      { name: 'Jben ou fromage type "vache qui rit"', quantity: '2 portions', kcal: 120, proteinG: 6 },
      { name: 'Lentilles ou foul', quantity: '1 bol', kcal: 220, proteinG: 14 },
      { name: 'Pain', quantity: '1 tranche', kcal: 90, proteinG: 3 },
      { name: 'Banane', quantity: '1', kcal: 105, proteinG: 1 },
    ],
  },
]

export const BOOST_SHAKE: Meal = {
  id: 'shake',
  label: 'Shake de complément (optionnel)',
  description:
    'À utiliser seulement si les 3 repas ne suffisent pas à atteindre l\'objectif calorique du jour — plus facile à avaler qu\'un 4e repas solide quand l\'appétit manque',
  items: [
    { name: 'Lait entier', quantity: '300ml', kcal: 180, proteinG: 10 },
    { name: 'Banane', quantity: '1', kcal: 105, proteinG: 1 },
    { name: 'Beurre de cacahuète', quantity: '2 cuillères à soupe', kcal: 190, proteinG: 8 },
    { name: 'Flocons d\'avoine', quantity: '40g', kcal: 150, proteinG: 5 },
    { name: 'Miel', quantity: '1 cuillère à soupe', kcal: 65, proteinG: 0 },
  ],
}

export interface AppetiteBooster {
  name: string
  nameLocal: string
  usage: string
  note: string
}

/**
 * Usage traditionnel marocain/maghrébin pour "ouvrir l'appétit" — pas des
 * affirmations médicales validées. Ingrédients bon marché, faciles à trouver
 * en épicerie ou souk.
 */
export const APPETITE_BOOSTERS: AppetiteBooster[] = [
  {
    name: 'Fenugrec',
    nameLocal: 'Helba',
    usage: 'Infusion (1 càc de graines dans l\'eau chaude, 10 min) 20-30 min avant un repas, ou graines moulues dans un smoothie.',
    note: 'Traditionnellement utilisé au Maroc pour stimuler l\'appétit. Déconseillé en cas de grossesse ou de traitement pour le diabète sans avis médical.',
  },
  {
    name: 'Nigelle',
    nameLocal: 'Habba Sawda / Sanouj',
    usage: '1/2 cuillère à café de graines mélangée avec du miel, avant le repas.',
    note: 'Usage traditionnel comme stimulant digestif.',
  },
  {
    name: 'Gingembre frais',
    nameLocal: 'Skinjbir',
    usage: 'Infusion 10 min avant le repas, ou quelques tranches fraîches dans le thé.',
    note: 'Stimule la digestion, peut aider à réduire les ballonnements qui coupent l\'appétit.',
  },
  {
    name: 'Anis vert / Anis étoilé',
    nameLocal: 'Nafaa / Yansoun',
    usage: 'Infusion après le repas.',
    note: 'Digestif, utile si les repas denses donnent une sensation de lourdeur.',
  },
  {
    name: 'Cannelle',
    nameLocal: 'Qarfa',
    usage: 'Dans le lait chaud, le thé ou saupoudrée sur l\'avoine.',
    note: 'Effet léger sur l\'appétit, surtout utile pour rendre les boissons caloriques plus agréables à boire.',
  },
]

export interface CheapFood {
  name: string
  category: 'Protéine' | 'Glucide' | 'Lipide' | 'Légumineuse'
  note: string
}

export const CHEAP_FOODS: CheapFood[] = [
  { name: 'Œufs', category: 'Protéine', note: 'Le meilleur rapport protéine/prix — base de plusieurs repas' },
  { name: 'Poulet (cuisses)', category: 'Protéine', note: 'Moins cher que le blanc, tout aussi efficace' },
  { name: 'Thon en boîte', category: 'Protéine', note: 'Pratique, se garde longtemps' },
  { name: 'Sardines', category: 'Protéine', note: 'Très abordable au Maroc, riche en oméga-3' },
  { name: 'Lait entier / Lben', category: 'Protéine', note: 'Calories + protéines faciles à boire sans "remplir" l\'estomac' },
  { name: 'Jben (fromage frais)', category: 'Protéine', note: 'Bon marché, se marie avec pain et légumes' },
  { name: 'Lentilles', category: 'Légumineuse', note: 'Très bon marché, riches en protéines et fer' },
  { name: 'Pois chiches', category: 'Légumineuse', note: 'Base de plats marocains classiques' },
  { name: 'Foul (fèves)', category: 'Légumineuse', note: 'Économique, dense en calories' },
  { name: 'Avoine', category: 'Glucide', note: 'Peu coûteuse, facile à enrichir en calories (lait, miel, beurre de cacahuète)' },
  { name: 'Semoule / Couscous', category: 'Glucide', note: 'Base marocaine classique et économique' },
  { name: 'Pain complet', category: 'Glucide', note: 'Toujours disponible, pas cher' },
  { name: 'Dattes', category: 'Glucide', note: 'Très denses en calories pour un petit volume — utiles vu l\'appétit limité' },
  { name: 'Huile d\'olive', category: 'Lipide', note: 'Ajoute des calories facilement sans augmenter le volume du repas' },
  { name: 'Beurre de cacahuète (arachide)', category: 'Lipide', note: 'Très dense en calories, disponible en épicerie' },
  { name: 'Amandes / Cacahuètes', category: 'Lipide', note: 'À grignoter, denses en calories' },
]
