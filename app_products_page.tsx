import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const strains = [
  {
    id: 1,
    name: "Wedding Cake",
    type: "Hybrid",
    thc: "25%",
    effects: ["Relaxed", "Happy", "Euphoric"],
    description: "Wedding Cake is a potent indica-hybrid marijuana strain made by crossing Triangle Kush with Animal Mints. Known for its rich and tangy flavor profile with hints of vanilla and sugary sweetness.",
    image: "https://leafly-public.s3-us-west-2.amazonaws.com/strains/photos/qj6qyrdtg7rcmyqpwzey_wedding-cake.jpg"
  },
  {
    id: 2,
    name: "Blue Dream",
    type: "Hybrid",
    thc: "18%",
    effects: ["Creative", "Focused", "Calm"],
    description: "Blue Dream is a sativa-dominant hybrid marijuana strain made by crossing Blueberry with Haze. This strain produces a balanced high, along with effects such as cerebral stimulation and full-body relaxation.",
    image: "https://leafly-public.s3-us-west-2.amazonaws.com/strains/photos/blue-dream.jpg"
  },
  {
    id: 3,
    name: "Purple Punch",
    type: "Indica",
    thc: "20%",
    effects: ["Sleepy", "Relaxed", "Happy"],
    description: "Purple Punch is an indica marijuana strain made by crossing Larry OG with Granddaddy Purple. This strain offers a sweet and delicious berry flavor profile with grape undertones.",
    image: "https://leafly-public.s3-us-west-2.amazonaws.com/strains/photos/purple-punch.jpg"
  },
  {
    id: 4,
    name: "Green Crack",
    type: "Sativa",
    thc: "22%",
    effects: ["Energetic", "Focused", "Creative"],
    description: "Green Crack is a sativa marijuana strain made of Sweet Leaf and Skunk #1. This strain delivers energetic, focused effects that promote productivity and creativity.",
    image: "https://leafly-public.s3-us-west-2.amazonaws.com/strains/photos/green-crack.jpg"
  },
  {
    id: 5,
    name: "Gelato",
    type: "Hybrid",
    thc: "23%",
    effects: ["Relaxed", "Happy", "Creative"],
    description: "Gelato is a hybrid marijuana strain made by crossing Sunset Sherbet and Thin Mint GSC. This strain produces euphoric effects followed by strong feelings of relaxation.",
    image: "https://leafly-public.s3-us-west-2.amazonaws.com/strains/photos/gelato.jpg"
  },
  {
    id: 6,
    name: "Northern Lights",
    type: "Indica",
    thc: "19%",
    effects: ["Relaxed", "Sleepy", "Happy"],
    description: "Northern Lights is an indica marijuana strain made by crossing Afghani with Thai. This strain produces euphoric effects that settle throughout the body, relaxing muscles and easing the mind.",
    image: "https://leafly-public.s3-us-west-2.amazonaws.com/strains/photos/northern-lights.jpg"
  },
  {
    id: 7,
    name: "Sour Diesel",
    type: "Sativa",
    thc: "24%",
    effects: ["Energetic", "Happy", "Uplifted"],
    description: "Sour Diesel is a sativa marijuana strain made by crossing Chemdawg and Super Skunk. This fast-acting strain delivers energizing, dreamy cerebral effects that have pushed Sour Diesel to its legendary status.",
    image: "https://leafly-public.s3-us-west-2.amazonaws.com/strains/photos/sour-diesel.jpg"
  },
  {
    id: 8,
    name: "Girl Scout Cookies",
    type: "Hybrid",
    thc: "21%",
    effects: ["Happy", "Euphoric", "Relaxed"],
    description: "Girl Scout Cookies is a hybrid marijuana strain made by crossing OG Kush with Durban Poison. This strain offers a sweet and earthy aroma and full-body relaxation.",
    image: "https://leafly-public.s3-us-west-2.amazonaws.com/strains/photos/gsc.jpg"
  },
  {
    id: 9,
    name: "Jack Herer",
    type: "Sativa",
    thc: "20%",
    effects: ["Creative", "Energetic", "Focused"],
    description: "Jack Herer is a sativa-dominant marijuana strain that has gained as much renown as its namesake, the marijuana activist and author. This strain provides a clear-headed, creative buzz.",
    image: "https://leafly-public.s3-us-west-2.amazonaws.com/strains/photos/jack-herer.jpg"
  },
  {
    id: 10,
    name: "Granddaddy Purple",
    type: "Indica",
    thc: "23%",
    effects: ["Relaxed", "Sleepy", "Happy"],
    description: "Granddaddy Purple is an indica marijuana strain made by crossing Purple Urkle with Big Bud. This strain produces a complex grape and berry aroma with relaxing effects.",
    image: "https://leafly-public.s3-us-west-2.amazonaws.com/strains/photos/gdp.jpg"
  }
]

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Our Products</h1>
          <Link href="/">
            <Button variant="outline">Back to Home</Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {strains.map((strain) => (
            <Card key={strain.id} className="overflow-hidden">
              <div className="relative h-48">
                <Image
                  src={strain.image}
                  alt={strain.name}
                  fill
                  className="object-cover"
                />
              </div>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{strain.name}</CardTitle>
                    <CardDescription>THC: {strain.thc}</CardDescription>
                  </div>
                  <Badge variant={
                    strain.type === "Sativa" ? "default" :
                    strain.type === "Indica" ? "destructive" :
                    "secondary"
                  }>
                    {strain.type}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">{strain.description}</p>
                <div className="flex flex-wrap gap-2">
                  {strain.effects.map((effect) => (
                    <Badge key={effect} variant="outline">
                      {effect}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

