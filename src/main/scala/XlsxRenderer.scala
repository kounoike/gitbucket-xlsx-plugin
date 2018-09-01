import gitbucket.core.plugin.{RenderRequest, Renderer}
import play.twirl.api.Html
import gitbucket.core.view.helpers.urlEncode

class XlsxRenderer extends Renderer {
  def render(renderRequest: RenderRequest): Html = {
    renderRequest.context
    Html(
      s"""<script src="${renderRequest.context.path}/plugin-assets/xlsx/bundle/entry.js"></script>
         |<div id="xlsx-wrapper" data-src="${urlEncode(renderRequest.context.request.getRequestURL + "?raw=true")}"></div>""".stripMargin)
  }
}
