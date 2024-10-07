import { subDays } from "date-fns";

import { PrismaClient, Product } from "@prisma/client";

let productid: Product;

const prisma = new PrismaClient();

const addSeller = async () => {
  const sellerData = [
    {
      username: "iamjoey1",
      walletAddress: "DLgacSweX6fmAbnzwoFnVwcuGRMwFvdCzzwhrXuE5pPc",
    },
    {
      username: "iamjoey12",
      walletAddress: "6wtjr73tjd8Fwqoy3N3PEvGWnWoUmMRCDEQPdNR6P2V",
    },
    {
      walletAddress: "AHGQshvqZyqfxJbgWhDrMkACVkmHkbn7kkQQ9kkiqSk3",
      username: "iamjoey2",
    },
  ];

  sellerData.map(async (data) => {
    await prisma.seller.create({
      data: {
        username: data.username,
        walletAddress: data.walletAddress,
      },
    });
  });
};

const addProduct = async () => {
  const sellerData = [
    {
      username: "iamjoey1",
      walletAddress: "DLgacSweX6fmAbnzwoFnVwcuGRMwFvdCzzwhrXuE5pPc",
      url: "https://capsapparel.com/cdn/shop/products/SASUKESIDE.jpg?v=1698652673&width=600",
      name: "cap edition 1",
    },
    {
      username: "iamjoey12",
      walletAddress: "6wtjr73tjd8Fwqoy3N3PEvGWnWoUmMRCDEQPdNR6P2V",
      url: "https://capsapparel.com/cdn/shop/files/CHAMPAGNEFRONTBLACK.jpg?v=1689866825&width=800",
      name: "cap edition 2",
    },
    {
      walletAddress: "AHGQshvqZyqfxJbgWhDrMkACVkmHkbn7kkQQ9kkiqSk3",
      username: "iamjoey2",
      url: "https://capsapparel.com/cdn/shop/files/AKATSUKIBUCKET-Black.jpg?v=1721351545&width=800",
      name: "cap edition 2",
    },
  ];
  console.log("inside add product");
  try {
    productid = await prisma.product.create({
      data: {
        imageUrl:
          "https://capsapparel.com/cdn/shop/products/teddy-bear-sweater-black.jpg?v=1689860780&width=800",
        description: "Buy This sweater look cool, All are medium sizes",
        label: "Wann look cool they buy this",
        price: "2",
        stock: "10",
        title: "Teddy Sweater Shirts",
        sellerId: "DLgacSweX6fmAbnzwoFnVwcuGRMwFvdCzzwhrXuE5pPc",
        name: "teddy shirt",
      },
    });

    sellerData.map(async (data) => {
      await prisma.product.create({
        data: {
          name: data.name,
          imageUrl: data.url,
          description: "Buy This sweater look cool, All are medium sizes",
          label: "Wann look cool they buy this",
          price: "2",
          stock: "10",
          title: "Teddy Sweater Shirts",
          sellerId: data.walletAddress,
        },
      });
    });
  } catch (error) {
    console.log(error);
  }
};

const createSellerBlink = async () => {
  try {
    const sellerData = [
      {
        username: "iamjoey1",
        walletAddress: "DLgacSweX6fmAbnzwoFnVwcuGRMwFvdCzzwhrXuE5pPc",
        image:
          "https://avatars.githubusercontent.com/u/38688596?s=400&u=537ec3624a74119be8caba48e5ee38610ad1717a&v=4",
      },
      {
        username: "iamjoey12",
        walletAddress: "6wtjr73tjd8Fwqoy3N3PEvGWnWoUmMRCDEQPdNR6P2V",
        image: "https://avatars.githubusercontent.com/u/37742218?v=4",
      },
      {
        walletAddress: "AHGQshvqZyqfxJbgWhDrMkACVkmHkbn7kkQQ9kkiqSk3",
        username: "iamjoey2",
        image: "https://avatars.githubusercontent.com/u/3412179?v=4",
      },
    ];
    console.log("insde create blink");
    sellerData.map(async (data) => {
      await prisma.sellerBlink.create({
        data: {
          title: "Welcome to my store",
          description: "You can buy products which are sold by me",
          icon: data.image,
          label:
            "this is my inventory blink you can from now book my products from blink itself",
          sellerWallet: data.walletAddress,
        },
      });

      await prisma.seller.update({
        where: {
          walletAddress: data.walletAddress,
        },
        data: {
          blinkCreated: true,
        },
      });
    });
  } catch (error) {
    console.log("error is", error);
  }
};

function getRandomOrderCount(): number {
  const min = 1;
  const max = 10;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function seedOrders() {
  for (let i = 0; i < 7; i++) {
    const date = subDays(new Date(), i);
    const orderCount = getRandomOrderCount();

    for (let j = 0; j < orderCount; j++) {
      await prisma.order.create({
        data: {
          name: `Order ${i * 10 + j + 1}`,
          city: "CityName",
          state: "StateName",
          dropOfAddress: "123 Main St",
          ZipCode: "12345",
          orderstatus: "PROCESSING",
          buyerWallet: "3RSq8oquiYftGCcepmUoofxo73Nh7zTWtKVeHet1fzFt",
          productId: productid.id,
          sellerId: "DLgacSweX6fmAbnzwoFnVwcuGRMwFvdCzzwhrXuE5pPc",
          createdAt: date,
        },
      });
    }
  }

  console.log("Orders seeded successfully!");
}

async function createUser() {
  try {
    const user = "3RSq8oquiYftGCcepmUoofxo73Nh7zTWtKVeHet1fzFt";

    await prisma.user.create({
      data: {
        emailAddress: "asdads2@",
        name: "joey",
        userWallet: user,
      },
    });
  } catch (error) {
    console.log(error);
  }
}

(async () => {
  await addSeller();
  await addProduct();
  await createSellerBlink();
  await createUser();
  await seedOrders();
})();
