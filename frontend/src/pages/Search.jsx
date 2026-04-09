import { useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import API from "../services/api"
import MovieRow from "../components/MovieRow"

function useQuery() {
  return new URLSearchParams(useLocation().search)
}

function Search() {
  const query = useQuery().get("q")
  const [results, setResults] = useState([])

  useEffect(()=>{
    if(query){
      API.get("/movies").then(res=>{
        const filtered = res.data.filter(movie=> 
          movie.title.toLowerCase().includes(query.toLowerCase())
        )
        setResults(filtered)
      })
    }
  }, [query])

  return (
    <div className="pt-24 bg-black min-h-screen text-white px-8">
      <h2 className="text-2xl font-bold mb-6">Search Results for "{query}"</h2>
      {results.length > 0 ? (
        <MovieRow title="Results" movies={results}/>
      ) : (
        <p className="text-gray-400">No movies found.</p>
      )}
    </div>
  )
}

export default Search