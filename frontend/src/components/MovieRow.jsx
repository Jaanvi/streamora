import MovieCard from "./MovieCard"

function MovieRow({ title, movies = [], refreshMovies }) {

return (

<div className="px-8 my-8">

<h2 className="text-2xl font-bold mb-4">
{title}
</h2>

<div className="flex gap-5 overflow-x-auto pb-2 scrollbar-hide">

{movies.length > 0 ? (

movies.map((movie) => (
<MovieCard key={movie._id} movie={movie} refreshMovies={refreshMovies} />
))

) : (

<p className="text-gray-400">No movies available</p>

)}

</div>

</div>

)

}

export default MovieRow