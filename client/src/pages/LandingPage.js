import React from "react";
import MainHero from "../components/MainHero/MainHero";
import CategoryDisplay from "../components/CategoryDisplay/CategoryDisplay";
import CardDisplay from "../components/CardDisplay/CardDisplay";
import { useQuery, useMutation, gql } from "@apollo/client";

const ANIMALS_QUERY = gql`
  {
    animals {
      image
      id
      price
      title
      slug
      image
    }
  }
`;

const ADD_OSTRICH_MUTATION = gql`
  mutation (
    $addAnimalImage: String!
    $addAnimalTitle: String!
    $addAnimalRating: Float!
    $addAnimalPrice: String!
    $addAnimalDescription: [String!]!
    $addAnimalSlug: String!
    $addAnimalStock: Int!
    $addAnimalOnSale: Boolean!
    $addAnimalCategory: String!
  ) {
    addAnimal(
      image: $addAnimalImage
      title: $addAnimalTitle
      rating: $addAnimalRating
      price: $addAnimalPrice
      description: $addAnimalDescription
      slug: $addAnimalSlug
      stock: $addAnimalStock
      onSale: $addAnimalOnSale
      category: $addAnimalCategory
    ) {
      id
    }
  }
`;

function LandingPage() {
  const { loading, error, data } = useQuery(ANIMALS_QUERY);
  const [addAnimal] = useMutation(ADD_OSTRICH_MUTATION);

  if (loading) {
    return <>Loading...</>;
  }

  if (error) {
    return <>Error...</>;
  }

  return (
    <div>
      <MainHero />
      <CategoryDisplay />
      <CardDisplay animals={data.animals} />
      <button
        onClick={() => {
          addAnimal({
            variables: {
              addAnimalImage: "ostrich",
              addAnimalCategory: "1",
              addAnimalTitle: "This is a really cool ostrich",
              addAnimalStock: 13,
              addAnimalPrice: "32,333",
              addAnimalDescription: ["das"],
              addAnimalRating: 3.5,
              addAnimalSlug: "ostrich",
              addAnimalOnSale: false,
            },
          });
        }}
      >
        Add an Ostrich
      </button>
    </div>
  );
}

export default LandingPage;
