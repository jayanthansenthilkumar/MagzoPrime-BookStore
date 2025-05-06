
export interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  coverImage: string;
  rating: number;
  category: string;
  genre: string;
  description: string;
  publicationDate: string;
  pages: number;
  isbn: string;
  publisher: string;
  language: string;
  inStock: number;
  featured?: boolean;
  bestseller?: boolean;
  newRelease?: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
}

export interface Genre {
  id: string;
  name: string;
  slug: string;
  category: string;
}

// Sample categories
export const categories: Category[] = [
  {
    id: "cat-fiction",
    name: "Fiction",
    slug: "fiction",
    description: "Stories from the imagination"
  },
  {
    id: "cat-nonfiction",
    name: "Non-Fiction",
    slug: "non-fiction",
    description: "Facts, true stories, and knowledge"
  },
  {
    id: "cat-children",
    name: "Children's Books",
    slug: "children",
    description: "Books for young readers"
  },
  {
    id: "cat-academic",
    name: "Academic",
    slug: "academic",
    description: "Educational and scholarly works"
  }
];

// Sample genres
export const genres: Genre[] = [
  // Fiction genres
  { id: "genre-fantasy", name: "Fantasy", slug: "fantasy", category: "cat-fiction" },
  { id: "genre-sci-fi", name: "Science Fiction", slug: "sci-fi", category: "cat-fiction" },
  { id: "genre-mystery", name: "Mystery & Thriller", slug: "mystery-thriller", category: "cat-fiction" },
  { id: "genre-romance", name: "Romance", slug: "romance", category: "cat-fiction" },
  { id: "genre-horror", name: "Horror", slug: "horror", category: "cat-fiction" },
  { id: "genre-literary", name: "Literary Fiction", slug: "literary-fiction", category: "cat-fiction" },
  
  // Non-fiction genres
  { id: "genre-biography", name: "Biography", slug: "biography", category: "cat-nonfiction" },
  { id: "genre-history", name: "History", slug: "history", category: "cat-nonfiction" },
  { id: "genre-science", name: "Science & Technology", slug: "science-tech", category: "cat-nonfiction" },
  { id: "genre-self-help", name: "Self-Help", slug: "self-help", category: "cat-nonfiction" },
  { id: "genre-business", name: "Business", slug: "business", category: "cat-nonfiction" },
  { id: "genre-cooking", name: "Cooking", slug: "cooking", category: "cat-nonfiction" },
  
  // Children's genres
  { id: "genre-picture", name: "Picture Books", slug: "picture-books", category: "cat-children" },
  { id: "genre-middle-grade", name: "Middle Grade", slug: "middle-grade", category: "cat-children" },
  { id: "genre-young-adult", name: "Young Adult", slug: "young-adult", category: "cat-children" },
  
  // Academic genres
  { id: "genre-textbooks", name: "Textbooks", slug: "textbooks", category: "cat-academic" },
  { id: "genre-reference", name: "Reference", slug: "reference", category: "cat-academic" },
  { id: "genre-research", name: "Research", slug: "research", category: "cat-academic" }
];

// Sample book data
export const books: Book[] = [
  {
    id: "book-1",
    title: "The Midnight Library",
    author: "Matt Haig",
    price: 16.99,
    originalPrice: 24.99,
    discount: 32,
    coverImage: "/placeholder.svg",
    rating: 4.5,
    category: "cat-fiction",
    genre: "genre-literary",
    description: "Between life and death there is a library. When Nora Seed finds herself in the Midnight Library, she has a chance to make things right. Up until now, her life has been full of misery and regret. She feels she has let everyone down, including herself. But things are about to change.",
    publicationDate: "2020-08-13",
    pages: 304,
    isbn: "978-0525559474",
    publisher: "Viking",
    language: "English",
    inStock: 42,
    featured: true
  },
  {
    id: "book-2",
    title: "Educated",
    author: "Tara Westover",
    price: 14.99,
    originalPrice: 18.99,
    discount: 21,
    coverImage: "/placeholder.svg",
    rating: 4.7,
    category: "cat-nonfiction",
    genre: "genre-biography",
    description: "An unforgettable memoir about a young girl who, kept out of school, leaves her survivalist family and goes on to earn a PhD from Cambridge University.",
    publicationDate: "2018-02-20",
    pages: 352,
    isbn: "978-0399590504",
    publisher: "Random House",
    language: "English",
    inStock: 27,
    bestseller: true
  },
  {
    id: "book-3",
    title: "The House in the Cerulean Sea",
    author: "TJ Klune",
    price: 18.99,
    coverImage: "/placeholder.svg",
    rating: 4.8,
    category: "cat-fiction",
    genre: "genre-fantasy",
    description: "A magical island. A dangerous task. A burning secret. Linus Baker leads a quiet, solitary life. At forty, he lives in a tiny house with a devious cat and his old records. As a Case Worker at the Department in Charge Of Magical Youth, he spends his days overseeing the well-being of children in government-sanctioned orphanages.",
    publicationDate: "2020-03-17",
    pages: 400,
    isbn: "978-1250217288",
    publisher: "Tor Books",
    language: "English",
    inStock: 15,
    featured: true
  },
  {
    id: "book-4",
    title: "Atomic Habits",
    author: "James Clear",
    price: 11.99,
    originalPrice: 27.00,
    discount: 56,
    coverImage: "/placeholder.svg",
    rating: 4.9,
    category: "cat-nonfiction",
    genre: "genre-self-help",
    description: "No matter your goals, Atomic Habits offers a proven framework for improving--every day. James Clear, one of the world's leading experts on habit formation, reveals practical strategies that will teach you exactly how to form good habits, break bad ones, and master the tiny behaviors that lead to remarkable results.",
    publicationDate: "2018-10-16",
    pages: 320,
    isbn: "978-0735211292",
    publisher: "Avery",
    language: "English",
    inStock: 54,
    bestseller: true
  },
  {
    id: "book-5",
    title: "Project Hail Mary",
    author: "Andy Weir",
    price: 14.49,
    originalPrice: 28.99,
    discount: 50,
    coverImage: "/placeholder.svg",
    rating: 4.6,
    category: "cat-fiction",
    genre: "genre-sci-fi",
    description: "Ryland Grace is the sole survivor on a desperate, last-chance mission—and if he fails, humanity and the earth itself will perish. Except that right now, he doesn't know that. He can't even remember his own name, let alone the nature of his assignment or how to complete it.",
    publicationDate: "2021-05-04",
    pages: 496,
    isbn: "978-0593135204",
    publisher: "Ballantine Books",
    language: "English",
    inStock: 31,
    newRelease: true
  },
  {
    id: "book-6",
    title: "The Song of Achilles",
    author: "Madeline Miller",
    price: 16.55,
    coverImage: "/placeholder.svg",
    rating: 4.7,
    category: "cat-fiction",
    genre: "genre-fantasy",
    description: "Greece in the age of heroes. Patroclus, an awkward young prince, has been exiled to the court of King Peleus and his perfect son Achilles. By all rights their paths should never cross, but Achilles takes the shamed prince as his friend, and as they grow into young men skilled in the arts of war and medicine their bond blossoms into something deeper - despite the displeasure of Achilles' mother Thetis, a cruel sea goddess.",
    publicationDate: "2012-03-06",
    pages: 416,
    isbn: "978-0062060624",
    publisher: "Ecco",
    language: "English",
    inStock: 19,
    featured: true
  },
  {
    id: "book-7",
    title: "Where the Crawdads Sing",
    author: "Delia Owens",
    price: 12.39,
    originalPrice: 18.00,
    discount: 31,
    coverImage: "/placeholder.svg",
    rating: 4.8,
    category: "cat-fiction",
    genre: "genre-literary",
    description: "For years, rumors of the 'Marsh Girl' haunted Barkley Cove, a quiet fishing village. Kya Clark is barefoot and wild; unfit for polite society. So in late 1969, when the popular Chase Andrews is found dead, locals immediately suspect her.",
    publicationDate: "2018-08-14",
    pages: 384,
    isbn: "978-0735219090",
    publisher: "G.P. Putnam's Sons",
    language: "English",
    inStock: 23,
    bestseller: true
  },
  {
    id: "book-8",
    title: "Sapiens: A Brief History of Humankind",
    author: "Yuval Noah Harari",
    price: 15.99,
    coverImage: "/placeholder.svg",
    rating: 4.7,
    category: "cat-nonfiction",
    genre: "genre-history",
    description: "In Sapiens, Dr. Yuval Noah Harari spans the whole of human history, from the very first humans to walk the earth to the radical – and sometimes devastating – breakthroughs of the Cognitive, Agricultural, and Scientific Revolutions.",
    publicationDate: "2015-02-10",
    pages: 464,
    isbn: "978-0062316097",
    publisher: "Harper",
    language: "English",
    inStock: 38,
    bestseller: true
  },
  {
    id: "book-9",
    title: "The Very Hungry Caterpillar",
    author: "Eric Carle",
    price: 8.99,
    coverImage: "/placeholder.svg",
    rating: 4.9,
    category: "cat-children",
    genre: "genre-picture",
    description: "The classic children's book featuring a caterpillar eating his way through the week.",
    publicationDate: "1969-03-20",
    pages: 26,
    isbn: "978-0399226908",
    publisher: "Philomel Books",
    language: "English",
    inStock: 67,
    featured: true
  },
  {
    id: "book-10",
    title: "Principles of Economics",
    author: "N. Gregory Mankiw",
    price: 169.99,
    originalPrice: 299.99,
    discount: 43,
    coverImage: "/placeholder.svg",
    rating: 4.5,
    category: "cat-academic",
    genre: "genre-textbooks",
    description: "Now you can master the principles of economics with the help of the most popular, widely-used economics textbook by students worldwide -- Mankiw's PRINCIPLES OF ECONOMICS, 9E.",
    publicationDate: "2020-01-01",
    pages: 912,
    isbn: "978-0357038314",
    publisher: "Cengage Learning",
    language: "English",
    inStock: 12
  },
  {
    id: "book-11",
    title: "The Silent Patient",
    author: "Alex Michaelides",
    price: 13.29,
    originalPrice: 26.99,
    discount: 51,
    coverImage: "/placeholder.svg",
    rating: 4.5,
    category: "cat-fiction",
    genre: "genre-mystery",
    description: "Alicia Berenson's life is seemingly perfect. A famous painter married to an in-demand fashion photographer, she lives in a grand house with big windows overlooking a park in one of London's most desirable areas. One evening her husband Gabriel returns home late from a fashion shoot, and Alicia shoots him five times in the face, and then never speaks another word.",
    publicationDate: "2019-02-05",
    pages: 336,
    isbn: "978-1250301697",
    publisher: "Celadon Books",
    language: "English",
    inStock: 32,
    bestseller: true
  },
  {
    id: "book-12",
    title: "The Four Winds",
    author: "Kristin Hannah",
    price: 14.50,
    originalPrice: 28.99,
    discount: 50,
    coverImage: "/placeholder.svg",
    rating: 4.6,
    category: "cat-fiction",
    genre: "genre-literary",
    description: "From the number-one bestselling author of The Nightingale and The Great Alone comes a powerful American epic about love and heroism and hope, set during the Great Depression, a time when the country was in crisis and at war with itself, when millions were out of work and even the land seemed to have turned against them.",
    publicationDate: "2021-02-02",
    pages: 464,
    isbn: "978-1250178602",
    publisher: "St. Martin's Press",
    language: "English",
    inStock: 28,
    newRelease: true
  }
];

export const findBookById = (id: string): Book | undefined => {
  return books.find(book => book.id === id);
};

export const findCategoryById = (id: string): Category | undefined => {
  return categories.find(category => category.id === id);
};

export const findGenreById = (id: string): Genre | undefined => {
  return genres.find(genre => genre.id === id);
};

export const getBooksByCategory = (categoryId: string): Book[] => {
  return books.filter(book => book.category === categoryId);
};

export const getBooksByGenre = (genreId: string): Book[] => {
  return books.filter(book => book.genre === genreId);
};

export const getFeaturedBooks = (): Book[] => {
  return books.filter(book => book.featured);
};

export const getBestsellerBooks = (): Book[] => {
  return books.filter(book => book.bestseller);
};

export const getNewReleases = (): Book[] => {
  return books.filter(book => book.newRelease);
};
