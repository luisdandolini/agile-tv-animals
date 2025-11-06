import { faker } from "@faker-js/faker";

export interface Animal {
  type: string;
  id: number;
  url: string;
  title: string;
  description: string;
  image: string;
}

const getImage = () =>
  faker.image.urlLoremFlickr({
    category: "animals",
    width: 644,
    height: 362,
  });

const getUrl = () => faker.internet.url();
const getText = () => faker.lorem.sentences();

const animalTypes = [
  "bear",
  "bird",
  "cat",
  "cetacean",
  "cow",
  "crocodilia",
  "dog",
  "fish",
  "horse",
  "insect",
  "lion",
  "rabbit",
  "rodent",
  "snake",
  "type",
] as const;

type AnimalType = (typeof animalTypes)[number];

const getType = (): AnimalType => {
  return animalTypes[Math.floor(Math.random() * animalTypes.length)];
};

const getTitle = (type: AnimalType): string => {
  switch (type) {
    case "bear":
      return faker.animal.bear();
    case "bird":
      return faker.animal.bird();
    case "cat":
      return faker.animal.cat();
    case "cetacean":
      return faker.animal.cetacean();
    case "cow":
      return faker.animal.cow();
    case "crocodilia":
      return faker.animal.crocodilia();
    case "dog":
      return faker.animal.dog();
    case "fish":
      return faker.animal.fish();
    case "horse":
      return faker.animal.horse();
    case "insect":
      return faker.animal.insect();
    case "lion":
      return faker.animal.lion();
    case "rabbit":
      return faker.animal.rabbit();
    case "rodent":
      return faker.animal.rodent();
    case "snake":
      return faker.animal.snake();
    case "type":
      return faker.animal.type();
    default:
      return faker.animal.dog();
  }
};

const generateData = (): Animal[] => {
  return [...new Array(100)].map((_, index) => {
    const type = getType();
    return {
      type,
      id: index + 1,
      url: getUrl(),
      title: getTitle(type),
      description: getText(),
      image: getImage(),
    };
  });
};

const delay = (ms: number = 1500) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const fakeApi = {
  getAllAnimals: async (): Promise<Animal[]> => {
    await delay();
    return generateData();
  },

  searchAnimals: async (searchTerm: string): Promise<Animal[]> => {
    await delay();

    if (!searchTerm.trim()) {
      return [];
    }

    const data = generateData();
    const term = searchTerm.toLowerCase();

    return data.filter(
      (animal) =>
        animal.title.toLowerCase().includes(term) ||
        animal.type.toLowerCase().includes(term)
    );
  },
};
