# Tin Coffee

A continuous scroll website for Caramelly's specialty coffee beans and pods.

- Hero photo opens into a turning wheel of five tins, one per roast level, from light to dark
- The wheel's centre tin glides down into its full details (origin, elevation, process, variety, cup profile, roast level, brewing), and the page snaps between the two
- Buy buttons go to each coffee's Amazon listing for the chosen size (200 g or 500 g)
- A grind guide with a recipe card per brewer, and Caramelly's film of the Probat roastery
- The page loops: scrolling past the footer runs back into the hero

## Run it

Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 5174
```

Plain HTML, CSS and JavaScript. Smooth scrolling uses [Lenis](https://github.com/darkroomengineering/lenis) from a CDN.

## Change the tins on show

The five coffees are set by `window.LINEUP` at the top of `js/data.js`. Swap an id for any other coffee in that file; its tin and photo are already in `assets/`.

## Credits

Concept design, not affiliated with Caramelly. Product details and photography from [caramelly.in](https://caramelly.in); Amazon prices as listed on amazon.in in November 2026.
