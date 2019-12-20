import React, {useState, useEffect} from "react";
import axios from "axios";


const UpdateMovie = props => {
    console.log(props)
    const [movie, setMovie] = useState({id: "", title: "", director:"", metascore:"", stars:[]})
    const [starState, setStarState] = useState([])

    console.log(props.match.params.id)
    useEffect(() => {
        axios.get(`http://localhost:5000/api/movies/${props.match.params.id}`)
        .then(res => {
            console.log(res)
            setMovie(res.data)
        })
        .catch(err => console.log(err))
    }, [props.match.params.id])


    const handleChanges = e => {
        e.preventDefault()
        setMovie({...movie, [e.target.name]: e.target.value})
    }

    const addStars = e => {
        e.preventDefault();
        setMovie({...movie, stars: [...movie.stars, starState]})
        setStarState([])
    }

    const starHandleChanges = e => {
        setStarState([...e.target.value])
    }

    const handleSubmit = e => {
        e.preventDefault();
        axios
        .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
        .then(res => {
            console.log(res)
            props.history.push(`/`)
            setMovie(res.data)
        })
    }

    return(
        <div className="update-form">
            <h2>Update Movie</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="title" placeholder="Title" onChange={handleChanges} value={movie.title} />
                <input type="text" name="director" placeholder="Director" onChange={handleChanges} value={movie.director}  />
                <input type="number" name="metascore" placeholder="Metascore" onChange={handleChanges} value={movie.metascore}  />
                <input type="text" name="stars" placeholder="Stars" value={starState.stars} onChange={starHandleChanges}/>
                <h5>Stars</h5>
                <button onClick={addStars}>Add Stars</button>
                {movie.stars.map(star => {
                    return <p key={star.id}>{star}</p>
                })}
                <button type="submit">Save</button>
            </form>
        </div>
    )
}

export default UpdateMovie;