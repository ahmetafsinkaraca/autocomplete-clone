import './App.scss';
import { useEffect, useRef, useState } from 'react';
import ContentLoader from "react-content-loader"

const data = [
  { id: 1, title: "text1", image:"../../image/image-1.jpg", alt:"image-1", date:"12.12.2024", link:'http://localhost:3000/'},
  { id: 2, title: "Test2", image:"./../image/image-1.jpg", alt:"image-1", date:"12.12.2024", link:'http://localhost:3000/'},
  { id: 3, title: "deneme1", image:"./../image/image-1.jpg", alt:"image-1", date:"12.12.2024", link:'http://localhost:3000/'},
  { id: 4, title: "Deneme2", image:"./../image/image-1.jpg", alt:"image-1", date:"12.12.2024", link:'http://localhost:3000/'}
];

const AutocompleteLoader = () => (
  <ContentLoader
    speed={2}
    width={500}
    height={60}
    viewBox="0 0 500 60"
    backgroundColor="#f3f3f3"
    foregroundColor="#dedede"
  >
    <rect x="203" y="22" rx="0" ry="0" width="4" height="3"/>
    <rect x="15" y="10" rx="0" ry="0" width="71" height="40" />
    <rect x="96" y="20" rx="0" ry="0" width="169" height="8" />
    <rect x="96" y="35" rx="0" ry="0" width="92" height="6" />
  </ContentLoader>
)

function App() {

  const [search, setSearch] = useState('')
  const [result, setResult] = useState(false)
  const [loading, setLoading] = useState(false)
  const searchRef = useRef()

  const isTyping = search.replace(/\s+/, '').length > 0;

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.addEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleClickOutside = (e) => {
    if (searchRef.current && !searchRef.current.contains(e.target)) {
      setSearch('')
    }
  }

    const getResultItem = (link) => {
      // console.log(item)
      window.location.href = link
    }
  

  useEffect(() => {
    console.log(loading)
  }, [loading])


  useEffect(() => {

    if (isTyping) {

      setLoading(true);
      const getData = setTimeout(() => {
        const filteredResult = data.filter(item =>
          item.title.toLowerCase().includes(search.toLowerCase())
        );
        setResult(filteredResult);
        setLoading(false);
      }, 500);

/* 			setLoading(true)
			const getData = setTimeout(() => {
				fetch(`https://frontendaily.com/search.php?query=${search}`)
					.then(res => res.json())
					.then(data => {
						setResult(data.length > 0 ? data : false)
						setLoading(false)
					})
			}, 500) */

 return () => clearTimeout(getData);
    } else {
      setResult([]);
      setLoading(false);
    }
  }, [search]);



  return (
    <>
      <div className="search" ref={searchRef}>
        <input type='text' value={search} className={isTyping ? 'typing' : null} placeholder='Bir şeyler ara..' onChange={(e) => setSearch(e.target.value)} />
        {isTyping && (
          <div className='search-result'>
            {result && loading === false && result.map(item => (
              <div onClick={() => getResultItem(item.link)} key={item.id} className='search-result-item'>
                <div>
                  <img src={item.image} alt={item.alt} />
                </div>
                <div>
                  <div className='title'>{item.title}</div>
                  <div className='date'>{item.date}</div>
                </div>
              </div>
            ))}
            {loading && new Array(3).fill().map(() => <AutocompleteLoader />)}
            {!result && loading === false && (
              <div className='result-not-found'>
                "{search}" ile ilgili bir şey bulamadık!
              </div>
            )}
          </div>
        )}
      </div>
    </>

  );
}

export default App;
