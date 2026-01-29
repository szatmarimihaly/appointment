import NavigatePurple from '@/components/Button/NavigatePurple'
import SearchBar from '@/components/Client/SearchBar'
import NewComers from '@/components/Client/searchPage/NewComers'
import SearchDisplay from '@/components/Client/searchPage/SearchDisplay'


interface SearchProps {
  searchParams : Promise<{
    q?:string;
  }>
}

export default async function Page ({ searchParams } : SearchProps) {

  return (
    <>
      <header className='p-6'>
        <NavigatePurple href="/"/>
      </header>
    
      <main className='flex flex-col items-center mt-20'>
        <h1 
            className='text-white text-5xl lg:text-5xl text-center mx-2'
        >
            Local <span className='purpleshadow'>Businesses around</span> you.
        </h1>
        <p className='text-sm text-textgray text-center mx-2 lg:text-lg'>Search for local service providers and book appointments instantly</p>

        <SearchDisplay searchParams={searchParams} />

        <NewComers/>
        
      </main>

    </>
  )
}