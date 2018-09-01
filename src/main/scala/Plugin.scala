import gitbucket.core.plugin.{AccountHook, PluginRegistry}
import gitbucket.core.service.SystemSettingsService
import io.github.gitbucket.solidbase.model.Version
import javax.servlet.ServletContext

class Plugin extends gitbucket.core.plugin.Plugin {
  override val pluginId: String = "xlsx"
  override val pluginName: String = "Excel renderer Plugin"
  override val description: String = "Rendering Excel files."
  override val versions: List[Version] = List(new Version("1.0.0"))

  override val assetsMappings: Seq[(String, String)] = Seq("/xlsx" -> "/assets")

  override def initialize(registry: PluginRegistry, context: ServletContext, settings: SystemSettingsService.SystemSettings): Unit = {
    val xlsx = new XlsxRenderer()
    registry.addRenderer("xlsx", xlsx)
    registry.addRenderer("ods", xlsx)
    super.initialize(registry, context, settings)
  }
}
