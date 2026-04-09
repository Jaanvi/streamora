import bg from "../assets/bacgroundimage.webp";

function HeroBanner(){

return(

<div className="h-[70vh] bg-cover bg-center flex items-end"
style={{
backgroundImage: `url(${bg})`
}}
>

<div className="p-10">

<h1 className="text-5xl font-bold mb-4">
Featured Movie
</h1>

<p className="max-w-lg text-sm mb-6">
Watch the most trending movies on Streamora. Enjoy unlimited entertainment just like a premium streaming platform.
</p>

<div className="flex gap-4">

<button className="bg-white text-black px-6 py-2 font-semibold rounded hover:bg-gray-200">
Play
</button>

<button className="bg-gray-700 px-6 py-2 rounded hover:bg-gray-600">
My List
</button>

</div>

</div>

</div>

)

}

export default HeroBanner