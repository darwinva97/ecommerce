import { ClientLayout } from "@/components/layouts/Client"
import type { CustomPageComponent } from "./_app"

const IndexPage: CustomPageComponent = () => {
  return (
    <div>IndexPage</div>
  )
}

IndexPage.getLayout = ClientLayout

export default IndexPage