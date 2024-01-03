import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Genres } from "@/typings";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

async function GenreDropdown() {
  const url = "https://api.themoviedb.org/3/genre/movie/list?language=en";
  const options: RequestInit = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
    },
    next: {
      revalidate: 60 * 60 * 24, // 24 hours
    },
  };

  const response = await fetch(url.toString(), options);
  // const response = await fetch(url, options);

  const data = (await response.json()) as Genres;
  // console.log(data.genres)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="text-white flex justify-center items-center">
        Genre <ChevronDown className="ml-1" />
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuLabel>Select a Genre</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {data.genres.map((genre) => (
          <DropdownMenuItem className="cursor-pointer" key={genre.id}>
            <Link href={`/genre/${genre.id}?genre=${genre.name}`}>
              {genre.name}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default GenreDropdown;

// import React, { useState, useEffect } from 'react';
// import { DropdownMenu, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
// import { Genres, Genre } from "@/typings";

// async function fetchGenres(): Promise<Genre[]> {
//   const url = "https://api.themoviedb.org/3/genre/movie/list?language=en";
//   const options: RequestInit = {
//     method: "GET",
//     headers: {
//       accept: "application/json",
//       Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
//     },
//   };

//   const response = await fetch(url, options);
//   const data = await response.json();
//   return data.genres as Genre[];
// }

// function GenreDropdown() {
//   const [genres, setGenres] = useState<Genre[]>([]);

//   useEffect(() => {
//     fetchGenres()
//       .then((fetchedGenres) => {
//         setGenres(fetchedGenres);
//       })
//       .catch((error) => {
//         console.error("Error fetching genres:", error);
//       });
//   }, []);

//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger>
//         <button>Genres</button>
//       </DropdownMenuTrigger>
//       {genres.map((genre) => (
//         <DropdownMenuItem key={genre.id}>
//           <span>{genre.name}</span>
//         </DropdownMenuItem>
//       ))}
//     </DropdownMenu>
//   );
// }

// export default GenreDropdown;
