import * as React from 'react';
import Carousel from "react-elastic-carousel";
import './Topik.css';
import {
  BrowserRouter as Router,
  Link,
  Route,
  useParams,
  Routes,
  Outlet
} from "react-router-dom";
import { getInfo, getResource, getInfos } from "./api";
import {Work, Palma, About, Api, Bootstrap, Blu, Express, Java, Jquery, Json, Mama, Ncr, Node, Otp, Pub, Reakt, Responcive, Skills, Sql, Git} from './Pictures/images'


  function Contact(){
      return(
        <React.Fragment>
        <h1>Hello, this is my contact page, feel free to send me a mail</h1>
        <p>My email is branko.n.petrovic@gmail.com</p>
        <p>
          Click{" "}<Link className='here' to="/info">here</Link> to go back.
        </p>
      </React.Fragment>
      )
  }

  function NotFound() {
    return(
      <React.Fragment>
      <div className='not-found'>
      <h1>404</h1>
      <p>This is not the page you're looking for</p>
      <img className='palma' src={ Palma } alt='you..dont want none of this'/>
      <p>
        Go back from whence you{" "}<Link className='here' to="/info">came</Link>
      </p>
      </div>
    </React.Fragment>
    )

  }
  
  function Resource() {
    const { infoId, resourceId } = useParams();
  
    const { name, description, link } = getResource({ infoId, resourceId });
    
   
  
    if(link == null){
        return (
            <div>
              <h3>{name}</h3>
              <p>{description}</p>
            </div>
          );
    }else{
        return (
            <div>
              <h3>{name}</h3>
              <p>{description}</p>
              <a className='links' href={link}>Click here to check them out</a>
            </div>
          );
    }
  }
  
  function Info() {
    const { infoId } = useParams();
    const info = getInfo(infoId);
  
    return (
      <div className='row2'>
      <div className='info-name'>
        <h2>{info.name}</h2>
      </div>
  
        <ul>
          {info.resources.map((sub) => (
            <li key={sub.id}>
              <Link className='links' to={sub.id}>{sub.name}</Link>
            </li>
          ))}
        </ul>
  
  
        <Outlet />
      </div>
    );
  }
  
  function Infos() {
    const infos = getInfos();

  
    return (
      <div>
        <div className='titles'>
          {infos.map(({ name, id , picture}) => (
            <Link className='links' to={id}>
            <span className='card tooltip' style={{'display': 'block'}}>
            <div className='toprow1' key={id}>
              {/* <img src={require('./Pictures/' + infos.picture + '.jpeg') }/> */}
              <div className='row1'><p>{name}</p></div>
            </div>
            </span>
            </Link>
          ))}
        </div>
        <div className="titles-mobile">
        <Carousel >
        {infos.map(({ name, id, picture}) => (
          <Link className='links' to={id}>
            <div className='toprow1' key={id}>
              <div className='row1'><p>{name}</p></div>
            </div>
            </Link>
            ))}
        </Carousel>
      </div>
        <Outlet />
      </div>
    );
  }

  export default function Topik() {
    return (
      <Router>
        <div className='list'>
          <Routes>
            <Route path="/contact" element={<Contact/>}/>
            <Route path="/" element={<Infos />}>
              <Route path=":infoId" element={<Info />}>
                <Route path=":resourceId" element={<Resource />} />
              </Route>
            </Route>
            
          </Routes>
        </div>
      </Router>
    );
  }
  
  