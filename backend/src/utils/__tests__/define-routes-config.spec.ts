import { defineMiddlewares } from "../define-middlewares"

describe("defineMiddlewares", function () {
  test("define custom middleware for a route", () => {
    const config = defineMiddlewares([
      {
        matcher: "/admin/products",
        middlewares: [() => {}],
      },
    ])

    expect(config).toMatchObject({
      routes: [
        {
          matcher: "/admin/products",
          middlewares: [expect.any(Function)],
        },
      ],
    })
  })
})
