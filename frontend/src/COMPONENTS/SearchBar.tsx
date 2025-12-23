import React, { useEffect } from 'react'
import SearchResults from './SearchResults';
import '../CSS/Search.css'
import { useNavigate } from 'react-router-dom';

function SearchBar() {

  const navigate = useNavigate()

    useEffect(() => {
      const verifyUser = async () => {
        const responseVerifyUser = await fetch ("http://localhost:3000/api/social/search", {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          },
          credentials: "include",
        });

        if (!responseVerifyUser.ok) {
          navigate("/account")
        }
      }

      verifyUser()

    }, [])


    const [isTyping, setIsTyping] = React.useState(false);
    const [inputText, setInputText] = React.useState("");

    const handleTyping = () => {
        const text = (document.getElementById("searchBar") as HTMLInputElement).value;
        setInputText(text);
      
        const input = document.getElementById("searchBar") as HTMLInputElement;
        if (input.value.length > 0) {
            setIsTyping(true);
        } else {
            setIsTyping(false);
        }
    }

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }} >
      <input id="searchBar" placeholder='Search' onChange={handleTyping} />
        {
            isTyping ? <SearchResults inputText={inputText} />  : <h1 id="searchText" >Search For The Users</h1> 
        }
    </div>
  )
}

export default SearchBar