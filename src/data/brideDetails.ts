export interface BridalAlbum {
    id: string;
    imagesPathID?: number;
    title: string;
    client: string;
    service: string;
    date: string;
    location: string;
    description: string;
    images: string[];
}

const bridalImagesPath = '/images/brides/';

export const bridalAlbums: BridalAlbum[] = [
    {
        id: "rajee-mathan",
        imagesPathID: 1,
        title: "Rajee & Mathan's Post Wedding",
        client: "Rajee",
        service: "Bridal Makeup & Hair Styling",
        date: "October 15, 2025",
        location: "Tirunelveli",
        description:
            "A stunning bridal look featuring soft curls and natural makeup for a post-wedding shoot.",
        images: [
            bridalImagesPath + "1/1.heic",
            bridalImagesPath + "1/2.jpg",
            bridalImagesPath + "1/3.heic",
            bridalImagesPath + "1/4.jpg",
            bridalImagesPath + "1/5.heic",
            bridalImagesPath + "1/6.heic",
            bridalImagesPath + "1/7.jpg",
            bridalImagesPath + "1/8.jpg",
            bridalImagesPath + "1/9.jpg"
        ]
    },
    // {
    //     id: "ananya-rohit",
    //     title: "Ananya & Rohit's Wedding",
    //     client: "Ananya Verma",
    //     service: "Traditional Bridal Makeup",
    //     date: "January 22, 2024",
    //     location: "Chennai",
    //     description:
    //         "A classic South Indian bridal look with temple jewelry and bold eye makeup.",
    //     images: [
    //         "https://images.unsplash.com/photo-1628260412297-a3377e45006f?q=80&w=800&auto=format&fit=crop"
    //     ]
    // }
];
