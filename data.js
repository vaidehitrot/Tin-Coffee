/* Caramelly catalogue, taken from caramelly.in product pages (November 2026).
   Ordered from the lightest roast to the darkest. */
window.ROASTS = ['Light', 'Light-medium', 'Medium', 'Medium-dark', 'Dark'];

/* The five tins on show, one per roast level. Swap an id to feature another coffee from the list below.
   No light roast is sold on Amazon, so Jasmine Kiss links to caramelly.in. */
window.LINEUP = ['jasmine-kiss', 'pink-bloom', 'wine-cask', 'house-blend', 'cappuccino-blend'];

const SHOP = 'https://caramelly.in/products/';
const FILTER = ['Pour over', 'French press', 'Cold brew'];
const FILTER_FOR = ['Americano', 'Long black'];
const ESPRESSO = ['Espresso machine', 'Aeropress', 'Moka pot', 'French press'];
const ESPRESSO_FOR = ['Espresso', 'Cappuccino', 'Americano', 'Long black'];

window.COFFEES = [
  {
    id: 'jasmine-kiss', name: 'Jasmine Kiss', kind: 'Exclusive microlot', family: 'Bright & floral', roast: 0,
    notes: ['Jasmine', 'Honeysuckle', 'White peach', 'Floral sweetness'],
    desc: 'A vibrant, floral cup layered with juicy grape sweetness and delicate jasmine aromatics. Elegant and expressive, made for slow sipping and clean brews.',
    taste: 'A tea-like, floral coffee with juicy fruit notes, silky sweetness and a delicate aromatic finish.',
    country: 'India', region: 'Chikkamagaluru', elev: '1,300–1,500 m', process: 'Anaerobic microlot', variety: 'Catuai',
    profile: 'Medium acidity & body, high sweetness', brewIn: FILTER, bestFor: FILTER_FOR,
    sizes: [[200, 990], [500, 2109], [1000, 3719]], color: '#b3c7a0', ink: '#5b4a91',
    url: SHOP + 'caramelly-jasmine-kiss-coffee-exclusive-microlot'
  },
  {
    id: 'strawberry', name: 'Strawberry Fermented', kind: 'Exclusive microlot', family: 'Fruity & fermented', roast: 0,
    notes: ['Strawberry', 'Lychee', 'Red grape', 'Honey'],
    desc: 'A playful, fruit-forward cup bursting with berry sweetness and candy-like aromatics. Bold, juicy and made for adventurous brewers.',
    taste: 'A vibrant, candy-like coffee with juicy strawberry notes, sparkling acidity and a winey finish.',
    country: 'India', region: 'Chikkamagaluru', elev: '1,300–1,500 m', process: 'Fermented microlot', variety: 'Catuai',
    profile: 'Medium acidity & body, high sweetness', brewIn: FILTER, bestFor: FILTER_FOR,
    sizes: [[200, 990], [500, 2109], [1000, 3719]], color: '#9a1b43', ink: '#9a1b43',
    url: SHOP + 'caramelly-strawberry-fermented-coffee-exclusive-microlot'
  },
  {
    id: 'fruit-bomb', name: 'Fruit Bomb', sub: 'Watermelon fermented', kind: 'Ratnagiri series', family: 'Fruity & fermented', roast: 0,
    notes: ['Watermelon', 'Sangria', 'Rose', 'Tropical punch'],
    desc: 'A wildly juicy, fruit-forward cup bursting with watermelon sweetness, sangria-like depth and tropical punch notes.',
    taste: 'A juicy, candy-like coffee layered with tropical fruit sweetness, floral aromatics and a winey finish.',
    country: 'India', region: 'Chikkamagaluru', elev: '1,300–1,500 m', process: 'Cultured natural', variety: 'Catuai',
    profile: 'Medium acidity & body, high sweetness', brewIn: FILTER, bestFor: FILTER_FOR,
    sizes: [[200, 990], [500, 2109], [1000, 3719]], color: '#5cc1d8', ink: '#1d7389',
    url: SHOP + 'caramelly-fruit-bomb-watermelon-fermented-coffee-ratnagiri-series'
  },
  {
    id: 'ethiopia', name: 'Ethiopia Yirgacheffe', kind: 'Single origin', family: 'Bright & floral', roast: 1,
    notes: ['Black currant', 'Raspberry', 'Orange blossom'],
    desc: 'Black currant and raspberry with delicate orange blossom florals. Juicy, vibrant and expressive with a refined floral finish.',
    taste: 'A floral and vibrant cup with berry sweetness and delicate, juicy notes.',
    country: 'Ethiopia', region: 'Idido', elev: '1,700–2,200 m', process: 'Washed', variety: 'Heirloom',
    profile: 'Layered & sweet', brewIn: ['Pour over', 'Aeropress', 'Espresso machine'], bestFor: ['Espresso', 'Americano', 'Long black'],
    sizes: [[200, 1349], [500, 2569]], color: '#bb9671', ink: '#76532f',
    url: SHOP + 'caramelly-ethiopia-yirgacheffe-coffee'
  },
  {
    id: 'costa-rica', name: 'Costa Rica La Pastora', kind: 'Single origin', family: 'Sweet & balanced', roast: 1,
    notes: ['Cocoa nibs', 'Wine grape', 'Melon'],
    desc: 'Cocoa nibs with hints of wine grape and melon sweetness. Clean, balanced and smooth with a gentle, rounded profile.',
    taste: 'A smooth, balanced cup with cocoa richness and soft fruit sweetness.',
    country: 'Costa Rica', region: 'Tarrazú', elev: '1,200–1,900 m', process: 'Washed', variety: 'Caturra, red and yellow Catuai',
    profile: 'Layered & sweet', brewIn: ['Pour over', 'Aeropress', 'Espresso machine'], bestFor: ['Espresso', 'Americano', 'Long black'],
    sizes: [[200, 1349], [500, 2569]], color: '#8b9b39', ink: '#53601b',
    url: SHOP + 'caramelly-costa-rica-coffee'
  },
  {
    id: 'pink-bloom', name: 'Pink Bloom', kind: 'Natural process', family: 'Bright & floral', roast: 1,
    notes: ['Red cherry', 'White peach', 'Sugarcane'],
    desc: 'Red cherry and white peach with a delicate sugarcane sweetness. Bright, silky and elegant with a refined floral character.',
    taste: 'A bright and delicate cup with cherry, peach and soft sugarcane sweetness.',
    country: 'India', region: 'Chikkamagaluru', elev: '1,300–1,500 m', process: 'Natural', variety: 'SLN 795',
    profile: 'Medium acidity & body, high sweetness', brewIn: FILTER, bestFor: FILTER_FOR,
    sizes: [[200, 890], [500, 1679], [1000, 2679]], color: '#f4bfcb', ink: '#a83d5a',
    url: SHOP + 'caramelly-pink-bourbon-coffee',
    amazon: [[200, 890, 'B0GFNSWP7Q'], [500, 1679, 'B0GFNH1DPY']]
  },
  {
    id: 'frozen-cherry', name: 'Frozen Cherry', kind: 'Frozen natural', family: 'Fruity & fermented', roast: 1,
    notes: ['Mango', 'Mixed berries', 'Cherry'],
    desc: 'Juicy mango and mixed berries with vibrant cherry undertones. Bright, clean and fruit-forward with a lively finish.',
    taste: 'A vibrant, fruit-forward cup with juicy mango, berries and cherry notes.',
    country: 'India', region: 'Chikkamagaluru', elev: '1,370–1,500 m', process: 'Frozen natural', variety: 'SLN 795',
    profile: 'Medium body, high sweetness', brewIn: FILTER, bestFor: FILTER_FOR,
    sizes: [[200, 990], [500, 2109]], color: '#991b1d', ink: '#8c1a1c',
    url: SHOP + 'caramelly-frozen-cherry-coffee'
  },
  {
    id: 'grape', name: 'Grape Fermented', kind: 'Anaerobic', family: 'Fruity & fermented', roast: 1,
    notes: ['Red grape', 'Apricot', 'Jamun'],
    desc: 'Red grape, apricot and jamun with a wine-like depth. Complex, juicy and bold with a lingering fruity richness.',
    taste: 'A bold, wine-like cup with layered grape, apricot and jamun richness.',
    country: 'India', region: 'Chikkamagaluru', elev: '1,370–1,500 m', process: 'Anaerobic', variety: 'SLN 795',
    profile: 'Medium body, high sweetness', brewIn: FILTER, bestFor: FILTER_FOR,
    sizes: [[200, 990], [500, 2109]], color: '#552a44', ink: '#552a44',
    url: SHOP + 'caramelly-grape-fermented-coffee'
  },
  {
    id: 'honey-sun-dried', name: 'Honey Sun Dried', kind: 'Natural process', family: 'Sweet & balanced', roast: 1,
    notes: ['Dried fruits', 'Milk chocolate', 'Honeyed sweetness'],
    desc: 'Dried fruits and milk chocolate with a soft honeyed sweetness. Smooth, rounded and clean with a naturally sweet finish.',
    taste: 'A naturally sweet cup with dried fruits, chocolate and honeyed smoothness.',
    country: 'India', region: 'Chikkamagaluru', elev: '1,370–1,525 m', process: 'Natural', variety: 'SLN 795',
    profile: 'Medium acidity & body, high sweetness', brewIn: FILTER, bestFor: FILTER_FOR,
    sizes: [[200, 790], [500, 1489], [1000, 2370]], color: '#f5b325', ink: '#8f5c00',
    url: SHOP + 'caramelly-honeysundried-coffee',
    amazon: [[200, 790, 'B0G589R3KV'], [500, 1489, 'B0GFNG286W']]
  },
  {
    id: 'wine-cask', name: 'Wine Cask Reserve', kind: 'Reserve', family: 'Fruity & fermented', roast: 2,
    notes: ['Sweet orange', 'Blackberry jam', 'Wood apple'],
    desc: 'Sweet orange and blackberry jam with subtle wood apple notes. Layered, aromatic and wine-like with a smooth, elegant finish.',
    taste: 'A refined, wine-like profile with wood apple brightness and deep berry sweetness.',
    country: 'India', region: 'Sakleshpur', elev: '3,600–4,000 ft', elevNote: 'about 1,100–1,220 m', process: 'Washed', variety: 'SLN 795',
    profile: 'Smooth & layered', brewIn: FILTER, bestFor: FILTER_FOR,
    sizes: [[200, 990], [500, 2109]], color: '#ca5e2e', ink: '#9c421b',
    url: SHOP + 'caramelly-winecaskreserve-coffee',
    amazon: [[200, 990, 'B0G5861B15'], [500, 1869, 'B0GFNG3LZX']]
  },
  {
    id: 'house-blend', name: 'House Blend', kind: 'House blend', family: 'Chocolate & nutty', roast: 3,
    notes: ['Dark chocolate', 'Cookies', 'Ripe cherries'],
    desc: 'Dark chocolate meets cookie-like warmth with a hint of ripe cherry. Balanced, familiar and easy-going for everyday brewing.',
    taste: 'A balanced cup of dark chocolate and cookie-like warmth with subtle cherry sweetness.',
    country: 'India', region: 'Chikkamagaluru', elev: '1,100–1,500 m', process: 'Washed', variety: 'SLN 795',
    profile: 'Low-medium acidity, full body, high sweetness', brewIn: ESPRESSO, bestFor: ESPRESSO_FOR,
    sizes: [[200, 790], [500, 1489], [1000, 2370]], color: '#8d489d', ink: '#743585',
    url: SHOP + 'caramelly-houseblend-coffee',
    amazon: [[200, 790, 'B0FP5LYQPV'], [500, 1489, 'B0GFNL6955']]
  },
  {
    id: 'dolce-crema', name: 'Dolce Crema', kind: 'Espresso roast', family: 'Chocolate & nutty', roast: 3,
    notes: ['Dark chocolate', 'Nutty', 'Café-style'],
    desc: 'A bold, creamy cup with notes of dark chocolate and gentle sweetness. Smooth and comforting, built for rich espresso and milk-based coffees.',
    taste: 'A rich, chocolatey cup with a creamy body and gentle sweetness.',
    country: 'India', region: 'Chikkamagaluru', elev: '1,100–1,500 m', process: 'Washed', variety: 'SLN 795',
    profile: 'Low acidity, full body & balanced sweetness', brewIn: ESPRESSO, bestFor: ESPRESSO_FOR,
    sizes: [[200, 790], [500, 1489], [1000, 2370]], color: '#236bb5', ink: '#1d5894',
    url: SHOP + 'caramelly-dolcecrema-coffee',
    amazon: [[200, 790, 'B0G588LPV9'], [500, 1489, 'B0GFNH6SVZ']]
  },
  {
    id: 'ratnagiri', name: 'Ratnagiri Double Washed', kind: 'Double washed', family: 'Sweet & balanced', roast: 3,
    notes: ['Milk chocolate', 'Cherry', 'Raisins', 'Brown sugar'],
    desc: 'A smooth, balanced cup with comforting chocolate sweetness and subtle fruit undertones. Clean and approachable, designed for everyday brews.',
    taste: 'A sweet, rounded coffee with chocolate richness, mellow fruit character and a silky body.',
    country: 'India', region: 'Chikkamagaluru', elev: '1,100–1,500 m', process: 'Double washed', variety: 'Catuai',
    profile: 'Low acidity, full body & balanced sweetness', brewIn: ESPRESSO, bestFor: ESPRESSO_FOR,
    sizes: [[200, 990], [500, 2109], [1000, 3719]], color: '#a1aaac', ink: '#4a5558',
    url: SHOP + 'caramelly-ratnagiri-double-washed-coffee'
  },
  {
    id: 'gusto-intenso', name: 'Gusto Intenso', kind: 'Espresso roast', family: 'Chocolate & nutty', roast: 4,
    notes: ['Roasted hazelnut', 'Dark chocolate', 'Brown sugar'],
    desc: 'A bold, full-bodied cup with intense roasted hazelnut and dark chocolate notes, balanced by brown sugar warmth and a smooth, lingering finish.',
    taste: 'Bold and indulgent, with deep roasted hazelnut and dark chocolate, mellowed by hints of brown sugar.',
    country: 'India', region: 'Chikkamagaluru', elev: '1,100–1,500 m', process: 'Washed', variety: 'Catuai',
    profile: 'Low acidity, full body & balanced sweetness', brewIn: ESPRESSO, bestFor: ESPRESSO_FOR,
    sizes: [[200, 890], [500, 1679], [1000, 2679]], color: '#66422f', ink: '#66422f',
    url: SHOP + 'caramelly-gusto-intenso-coffee'
  },
  {
    id: 'cappuccino-blend', name: 'Cappuccino Blend', kind: 'Arabica and C×R blend', family: 'Chocolate & nutty', roast: 4,
    notes: ['Toffee', 'Roasted nuts', 'Dark chocolate'],
    desc: 'Toffee sweetness layered with nutty richness and a syrupy body. Velvety and indulgent, made for cappuccinos and lattes.',
    taste: 'A syrupy, toffee-led cup with nutty richness and deep, indulgent sweetness.',
    country: 'India', region: 'Chikkamagaluru', elev: '1,000–1,500 m', process: 'Washed', variety: 'SLN 795 & C×R',
    profile: 'Low acidity & medium sweetness', brewIn: ESPRESSO, bestFor: ESPRESSO_FOR,
    sizes: [[200, 790], [500, 1489], [1000, 2370]], color: '#d5e021', ink: '#5a6608',
    url: SHOP + 'caramelly-cappuccino-blend-coffee',
    amazon: [[200, 790, 'B0G585V4QK'], [500, 1489, 'B0GFNKVM39']]
  }
];

const POD = 'https://caramelly.in/products/';
window.PODS = [
  { id: 'ristretto', name: 'Ristretto Intenso', intensity: 12, roast: 'Dark roast', notes: ['Bold', 'Syrupy', 'Dark roasted'],
    desc: 'Concentrated and deep. A bold opening, a dense mid-palate and a long, roasted finish.', price: 449, url: POD + 'caramelly-ristretto-intenso-coffee-capsules', amazon: 'B0F139MMC2' },
  { id: 'cappuccino', name: 'Cappuccino Blend', intensity: 12, roast: 'Dark roast', notes: ['Toffee', 'Nutty', 'Café-style'],
    desc: 'Toffee-rich with nutty warmth and a mellow finish, built to sit under steamed milk.', price: 449, url: POD + 'caramelly-cappuccino-blend-nespresso%C2%AE-compatible-coffee-capsules-10-pods', amazon: 'B0FMXRXY8Y' },
  { id: 'espresso-dark', name: 'Espresso Dark Roast', intensity: 10, roast: 'Dark roast', notes: ['Full-bodied', 'Dark', 'Smoky sweet'],
    desc: 'Heavy-bodied and dark with a smoky undertone, for an Italian-style espresso.', price: 449, url: POD + 'caramelly-espresso-dark-roast-coffee-capsules-10-pods', amazon: 'B0F6N4WC6F' },
  { id: 'viennese', name: 'Viennese Roast', intensity: 10, roast: 'Dark roast', notes: ['Rich', 'Citrusy', 'Smooth finish'],
    desc: 'Smooth and structured with bittersweet citrus, after Vienna’s coffeehouse tradition.', price: 449, url: POD + 'caramelly-viennese-roast-coffee-capsules-10-pods', amazon: 'B0DNFM96CV' },
  { id: 'decaf-brunch', name: 'Decaf Brunch', intensity: 10, roast: 'Medium roast', notes: ['Rich', 'Velvety', 'Clean finish'],
    desc: 'A Colombian natural, decaffeinated. Velvety, easy-going and clean on the finish.', price: 645, url: POD + 'caramelly-decaf-brunch-coffee-capsules', amazon: 'B0F2N6XL35', decaf: true },
  { id: 'tiramisu', name: 'Tiramisu', intensity: 8, roast: 'Medium roast', notes: ['Cocoa', 'Mascarpone'], flavoured: true,
    desc: 'Flavoured. Dessert-inspired cocoa and mascarpone notes with a creamy finish.', price: 590, url: POD + 'caramelly-tiramisu-flavoured-nespresso%C2%AE-compatible-coffee-capsules-10-pods' },
  { id: 'double-chocolate', name: 'Double Chocolate', intensity: 7, roast: 'Medium roast', notes: ['Decadent chocolate', 'Bold undertones'], flavoured: true,
    desc: 'Flavoured. Layered chocolate richness with a velvety mid-palate.', price: 499, url: POD + 'caramelly-double-chocolate-coffee-capsules-10-pods', amazon: 'B0DNFNR2JC' },
  { id: 'hazelnut-praline', name: 'Hazelnut Praline', intensity: 7, roast: 'Medium roast', notes: ['Rich hazelnut', 'Buttery'], flavoured: true,
    desc: 'Flavoured. Praline-forward and creamy with a soft, nutty finish.', price: 499, url: POD + 'caramelly-nespresso-coffee-capsules-pods-hazelnut-muffin', amazon: 'B0CXM4T1GM' },
  { id: 'pink-bourbon', name: 'Pink Bourbon', intensity: 6, roast: 'Medium roast', notes: ['Lychee', 'Jasmine', 'Caramel finish'],
    desc: 'Bright aromatics and clean sweetness. A juicy opening that settles into caramel.', price: 475, url: POD + 'caramelly-pink-bourbon-nespresso%C2%AE-compatible-coffee-capsules-10-pods', amazon: 'B0DNFLP5NF' }
];

window.GRINDS = [
  { id: 'whole', name: 'Whole beans', size: 'Unground', micron: 0, ratio: 'Grind per brew', time: 'Just before brewing',
    text: 'Ground coffee starts losing aroma within minutes. Buy whole beans if you own a grinder and grind only what you need. Keep the tin closed, away from heat and light.' },
  { id: 'espresso', name: 'Espresso', size: 'Fine, a touch finer than table salt', micron: 250, ratio: '1 : 2', time: '25–30 s at about 9 bar',
    text: 'Fine enough to resist the pressure of the machine. About 18 g in the basket, about 36 g out. Faster than that, grind finer; slower, coarser.' },
  { id: 'moka', name: 'Moka pot', size: 'Fine-medium', micron: 400, ratio: 'Fill the basket level', time: '4–5 min on low heat',
    text: 'A little coarser than espresso. Fill the basket without tamping, use hot water in the base and take it off the heat as soon as it starts to sputter.' },
  { id: 'aeropress', name: 'Aeropress', size: 'Medium-fine, like table salt', micron: 500, ratio: '1 : 15', time: '2 min steep, 30 s press',
    text: 'Forgiving and quick. Finer grinds suit shorter steeps; if pressing feels hard, go a notch coarser.' },
  { id: 'pourover', name: 'Pour over', size: 'Medium, like sand', micron: 700, ratio: '1 : 16', time: '2:30–3:30 total',
    text: 'Bloom with twice the coffee’s weight in water at 92–96 °C, wait 30 s, then pour in slow circles. Sour cup, go finer; bitter, go coarser.' },
  { id: 'frenchpress', name: 'French press', size: 'Coarse, like sea salt', micron: 1000, ratio: '1 : 15', time: '4 min steep',
    text: 'Coarse grounds keep silt out of the cup and stop the brew turning bitter. Stir once, steep, then press slowly and pour it all out.' },
  { id: 'coldbrew', name: 'Cold brew', size: 'Extra coarse, like cracked pepper', micron: 1300, ratio: '1 : 8 concentrate', time: '12–18 h in the fridge',
    text: 'Steep in cold water, strain, and dilute about 1 : 1 with water or milk. Fruity light roasts make a surprisingly juicy cold brew.' }
];
