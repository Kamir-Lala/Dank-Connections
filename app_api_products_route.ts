import { NextResponse } from 'next/server';

let products = [
  {
    id: '1',
    name: 'Wedding Cake',
    type: 'Hybrid',
    thc: '25%',
    effects: ['Relaxed', 'Happy', 'Euphoric'],
    description: 'A potent hybrid strain with sweet vanilla and earthy pepper notes.',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/download%20(7)-G0IwwgZpLrcsUKg3Y5BDVDn2NSUUHA.jpeg',
    price: 180,
    category: 'Boutique',
    quantity: 50
  },
  {
    id: '2',
    name: 'Blue Dream',
    type: 'Hybrid',
    thc: '18%',
    effects: ['Creative', 'Focused', 'Calm'],
    description: 'A balanced hybrid offering full-body relaxation with gentle cerebral invigoration.',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/download%20(2)-12FhdoYBp3X5ogi8cFxQ2b9nkmXAw9.jpeg',
    price: 180,
    category: 'Boutique',
    quantity: 40
  },
  {
    id: '3',
    name: 'Purple Punch',
    type: 'Indica',
    thc: '20%',
    effects: ['Sleepy', 'Relaxed', 'Happy'],
    description: 'A sweet and sedating indica hybrid perfect for a nightcap.',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/download%20(5)-ZX8lQR0Ltgg7Lft4uK9C2CbK0VGf6g.jpeg',
    price: 180,
    category: 'Boutique',
    quantity: 30
  },
  {
    id: '4',
    name: 'Green Crack',
    type: 'Sativa',
    thc: '22%',
    effects: ['Energetic', 'Focused', 'Creative'],
    description: 'A sharp and energetic sativa perfect for daytime use.',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/download%20(6)-GlAJj8PopJwWOCUKyWHcLm4gKoCDsd.jpeg',
    price: 180,
    category: 'Boutique',
    quantity: 35
  },
  {
    id: '5',
    name: 'Gelato',
    type: 'Hybrid',
    thc: '23%',
    effects: ['Relaxed', 'Happy', 'Creative'],
    description: 'A sweet and creamy hybrid with powerful euphoric effects.',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/download%20(4)-zrjrtTPvEQiHitJHDredkHep6vyUiM.jpeg',
    price: 180,
    category: 'Boutique',
    quantity: 45
  },
  {
    id: '6',
    name: 'Northern Lights',
    type: 'Indica',
    thc: '18%',
    effects: ['Relaxed', 'Sleepy', 'Happy'],
    description: 'A classic indica known for its resinous buds and relaxing effects.',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/download%20(3)-nK8HeuawL7iBtnkO68YJ3efGMKeq8k.jpeg',
    price: 140,
    category: 'Indoor',
    quantity: 55
  },
  {
    id: '7',
    name: 'Sour Diesel',
    type: 'Sativa',
    thc: '20%',
    effects: ['Energetic', 'Happy', 'Uplifted'],
    description: 'A fast-acting strain delivering energizing, dreamy cerebral effects.',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/download%20(7)-FvIGdJHY3JMyhmZdrOjeR5AGrOrmdY.jpeg',
    price: 140,
    category: 'Indoor',
    quantity: 60
  },
  {
    id: '8',
    name: 'OG Kush',
    type: 'Hybrid',
    thc: '23%',
    effects: ['Relaxed', 'Happy', 'Euphoric'],
    description: 'A legendary strain with a unique terpene profile and balanced effects.',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/download%20(7)-G0IwwgZpLrcsUKg3Y5BDVDn2NSUUHA.jpeg',
    price: 140,
    category: 'Indoor',
    quantity: 50
  },
  {
    id: '9',
    name: 'White Widow',
    type: 'Hybrid',
    thc: '19%',
    effects: ['Relaxed', 'Happy', 'Uplifted'],
    description: 'A balanced hybrid known for its white trichome-covered buds.',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/download%20(2)-12FhdoYBp3X5ogi8cFxQ2b9nkmXAw9.jpeg',
    price: 140,
    category: 'Indoor',
    quantity: 40
  },
  {
    id: '10',
    name: 'AK-47',
    type: 'Hybrid',
    thc: '20%',
    effects: ['Relaxed', 'Happy', 'Uplifted'],
    description: 'A long-lasting, complex blend of various landrace strains.',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/download%20(5)-ZX8lQR0Ltgg7Lft4uK9C2CbK0VGf6g.jpeg',
    price: 140,
    category: 'Indoor',
    quantity: 45
  }
];

export async function GET() {
  return NextResponse.json(products);
}

export async function POST(request: Request) {
  const product = await request.json();
  product.id = Date.now().toString(); // Generate a unique ID
  products.push(product);
  return NextResponse.json(product, { status: 201 });
}

export async function PUT(request: Request) {
  const updatedProduct = await request.json();
  const index = products.findIndex(p => p.id === updatedProduct.id);
  if (index !== -1) {
    products[index] = updatedProduct;
    return NextResponse.json(updatedProduct);
  }
  return NextResponse.json({ error: 'Product not found' }, { status: 404 });
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  const index = products.findIndex(p => p.id === id);
  if (index !== -1) {
    products.splice(index, 1);
    return NextResponse.json({ message: 'Product deleted' });
  }
  return NextResponse.json({ error: 'Product not found' }, { status: 404 });
}

