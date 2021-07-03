import { rest } from "msw";

export const handlers = [
  rest.get("https://acnhapi.com/v1/villagers/*", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        "id": 354,
        "name": {
          "name-USen": "Pietro"
        },
        "icon_uri": "https://acnhapi.com/v1/icons/villagers/354"
      })
    )
  })
];
