import { CarouselBackend } from "@/components/carousel/CarouselBackend"
import { ClientLayout } from "@/components/layouts/Client"
import type { CustomPageComponent } from "./_app"

const IndexPage: CustomPageComponent = () => {
  return (
    <div>
      <CarouselBackend />
    </div>
  )
}

IndexPage.getLayout = ClientLayout

export default IndexPage