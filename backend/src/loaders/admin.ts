import { logger } from "@medusajs/framework/logger"
import {
  AdminOptions,
  ConfigModule,
  PluginDetails,
} from "@medusajs/framework/types"
import { Express } from "express"
import path from "path"
import { ADMIN_RELATIVE_OUTPUT_DIR } from "../utils"

type Options = {
  app: Express
  configModule: ConfigModule
  rootDirectory: string
  plugins: PluginDetails[]
}

type IntializedOptions = Required<Pick<AdminOptions, "path" | "disable">> &
  AdminOptions & {
    outDir: string
    sources?: string[]
    plugins?: string[]
  }

const NOT_ALLOWED_PATHS = ["/auth", "/store", "/admin"]

export default async function adminLoader({
  app,
  configModule,
  rootDirectory,
  plugins,
}: Options) {
  const { admin } = configModule

  const sources: string[] = []
  const pluginAdminPaths: string[] = []
  for (const plugin of plugins) {
    if (!plugin.admin) {
      continue
    }

    if (plugin.admin.type === "local") {
      sources.push(plugin.admin.resolve)
    } else {
      pluginAdminPaths.push(plugin.admin.resolve)
    }
  }

  const adminOptions: IntializedOptions = {
    disable: false,
    sources,
    plugins: pluginAdminPaths,
    ...admin,
    outDir: path.join(rootDirectory, ADMIN_RELATIVE_OUTPUT_DIR),
  }

  if (adminOptions?.disable) {
    return app
  }

  if (NOT_ALLOWED_PATHS.includes(adminOptions.path)) {
    logger.error(
      `The 'admin.path' in 'medusa-config.js' is set to a value that is not allowed. This can prevent your server from working correctly. Please set 'admin.path' to a value that is not one of the following: ${NOT_ALLOWED_PATHS.join(
        ", "
      )}.`
    )
  }

  if (process.env.NODE_ENV === "development") {
    return initDevelopmentServer(app, adminOptions)
  }

  return serveProductionBuild(app, adminOptions)
}

async function initDevelopmentServer(app: Express, options: IntializedOptions) {
  const { develop } = await import("@medusajs/admin-bundler")

  const adminMiddleware = await develop(options)
  app.use(options.path, adminMiddleware)
  return app
}

async function serveProductionBuild(app: Express, options: IntializedOptions) {
  const { serve } = await import("@medusajs/admin-bundler")

  const adminRoute = await serve(options)

  app.use(options.path, adminRoute)

  return app
}
