import {
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { render } from "../utils/test";
import Results, { formatJobList, formatFetchParams } from "../pages/Results";

const resultMockedData = [
  {
    title: "backend",
    description:
      "Le backend consiste en la partie émergée de l'iceberg : ce qui permet de faire tourner une application mais qui n'est pas visible par l'utilisateur",
  },
  {
    title: "design",
    description:
      "La personne en charge du design va devoir préparer les maquettes du site",
  },
];

const server = setupServer(
  // On précise ici l'url qu'il faudra "intercepter"
  rest.get("http://localhost:8000/results", (req, res, ctx) => {
    // Là on va pouvoir passer les datas mockées dans ce qui est retourné en json
    return res(ctx.json({ resultsData: resultMockedData }));
  })
);
// Active la simulation d'API avant les tests depuis server
beforeAll(() => server.listen());
// Réinitialise tout ce qu'on aurait pu ajouter en termes de durée pour nos tests avant chaque test
afterEach(() => server.resetHandlers());
// Ferme la simulation d'API une fois que les tests sont finis
afterAll(() => server.close());

describe("The formatJobList function", () => {
  it("shoul add a comma to a word", () => {
    const expectedState = "item2,";
    expect(formatJobList("item2", 3, 1)).toEqual(expectedState);
  });
  it("should not add a comma to the last element of the list", () => {
    const expectedState = "dernier item";
    expect(formatJobList("dernier item", 3, 2)).toEqual(expectedState);
  });
});

describe("The formatFetchParams", () => {
  it("should use the right format for param", () => {
    const expectedState = "a1=answer1";
    expect(formatFetchParams({ 1: "answer1" })).toEqual(expectedState);
  });
  it("should concatenate params with an &", () => {
    const expectedState = "a1=answer1&a2=answer2";
    expect(formatFetchParams({ 1: "answer1", 2: "answer2" })).toEqual(
      expectedState
    );
  });
});

describe("The Reuslts component", () => {
  it("should display result data", async () => {
    render(<Results />);
    await waitForElementToBeRemoved(screen.getByTestId("loader"));
    await waitFor(() => {
      expect(
        screen.getByText(
          "Le backend consiste en la partie émergée de l'iceberg : ce qui permet de faire tourner une application mais qui n'est pas visible par l'utilisateur"
        )
      ).toBeTruthy();
      expect(
        screen.getByText(
          "La personne en charge du design va devoir préparer les maquettes du site"
        )
      ).toBeTruthy();
    });
  });

  it("should display error content", async () => {
    server.use(
      rest.get("http://localhost:8000/results", (req, res, ctx) => {
        return res.once(
          ctx.status(500),
          ctx.json({
            errorMessage: "Oups, il y a eu une erreur",
          })
        );
      })
    );
    render(<Results />);
    await waitForElementToBeRemoved(screen.getByTestId("loader"));
    expect(screen.getByTestId("error")).toMatchInlineSnapshot(`
      <span
        data-testid="error"
      >
        Oups, il y a eu une erreur
      </span>
    `);
  });
});
