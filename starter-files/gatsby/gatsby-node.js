import path from 'path';

async function turnPizzasIntoPages({ graphql, actions }) {
  // 1. get a template
  const pizzaTemplate = path.resolve('./src/templates/Pizza.js');
  const { data } = await graphql(`
    query {
      pizzas: allSanityPizza {
        nodes {
          name
          slug {
            current
          }
        }
      }
    }
  `);
  // console.log(data);
  data.pizzas.nodes.forEach((pizza) => {
    // console.log('creating a pizza for ', pizza.name);
    actions.createPage({
      path: `pizza/${pizza.slug.current}`,
      component: pizzaTemplate,
      context: {
        chris: 'is cool',
        slug: `${pizza.slug.current}`,
      },
    });
  });
}
async function turnToppingsIntoPages({ graphql, actions }) {
  // 1. Get the template
  const toppingTemplate = path.resolve('./src/pages/pizzas.js');
  // 2. query all the toppings
  const { data } = await graphql(`
    query {
      toppings: allSanityTopping {
        nodes {
          name
          id
        }
      }
    }
  `);
  // 3. createPage for that topping
  data.toppings.nodes.forEach((topping) => {
    actions.createPage({
      path: `topping/${topping.name}`,
      component: toppingTemplate,
      context: {
        topping: topping.name,
        // TODO Regex for Topping
        toppingRegex: `/${topping.name}/i`,
      },
    });
  });
  // 4. Pass topping data to pizza.js
}
async function fetchBeersAndTurnIntoNodes() {
  console.log('fetchBeersAndTurnIntoNodes');
}
export async function sourceNodes() {
  await Promise.all([fetchBeersAndTurnIntoNodes]);
}
export async function createPages(params) {
  await Promise.all([
    turnPizzasIntoPages(params),
    turnToppingsIntoPages(params),
  ]);
}
