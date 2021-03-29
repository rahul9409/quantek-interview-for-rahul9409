import {useState , useEffect} from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown } from 'react-bootstrap';
import Modal from "./Modal";
const Data =()=>{
        const [launches, setLaunches]=useState([]);
        const[currentPage, setcurrentPage]=useState(1);
        const[userperpage]=useState(10);
       
       
        useEffect(()=>{
            const fetchlaunches=async ()=>{
                const res=await axios.get('https://api.spacexdata.com/v3/launches');
                setLaunches(res.data);

            }
            fetchlaunches();
        },[])
        const indexoflast=currentPage*userperpage;
        const indexoffirst=indexoflast-userperpage;
        const currentlaunch=launches.slice(indexoffirst,indexoflast);
        const pageNumber=[];
        const total=launches.length;
        const paginate = (index)=>{
            setcurrentPage(index);}
        for(let i=1;i<=Math.ceil(total/userperpage);i++){
            pageNumber.push(i);
        }
        let str=launches.launch_date_local;
        const [isOpen, setisOpen]=useState(false);
        //status and orbit fields are not accessible cause of that each field of status have failed mark
        //for information field e=when click me button clicked it will give informatiion of all table datas so i have shhown only mission name
        return(
            <div className="Data_fetch">
                <img src="data:image/png;base64,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"/>
                <Dropdown classsName=" w3-right">
  <Dropdown.Toggle >
    All Launches
  </Dropdown.Toggle>

  <Dropdown.Menu>
    <Dropdown.Item href="#/action-1">Past Week</Dropdown.Item>
    <Dropdown.Item href="#/action-2">past Month</Dropdown.Item>
    <Dropdown.Item href="#/action-3">Past 6 Month</Dropdown.Item>
    <Dropdown.Item href="#/action-1">Past Year</Dropdown.Item>
    <Dropdown.Item href="#/action-1">Past 2 Year</Dropdown.Item>
  </Dropdown.Menu>
</Dropdown>
<br/>
<br/>
           <table>
            <tr>
              <th>No.</th>
              <th>Launched</th>
              <th>Location</th>
              <th>Mission</th>
              <th>Orbit</th>
              <th>Status</th>
              <th>Rocket</th>
              <th>Click here for more infromation</th>
            </tr>
           {currentlaunch.map((launch)=>(
               <tr key={launch.flight_number}>
               <td >{launch.flight_number}</td> 
               <td >{launch.launch_date_local}</td>
               <td >{launch.launch_site.site_name}</td>
               <td>{launch.mission_name}</td>
               <td>{launch.rocket.second_stage.payloads.orbit}</td>
               <td ><p className={
                   launch.rocket.launch_success ? "btn-btn-success" : "btn-btn-danger"
               }>{launch.rocket.launch_success ? "Success" : "Failed"}</p></td>
               <td >{launch.rocket.rocket_name}</td>
               <td  key={launch.flight_number}><button onClick={()=>setisOpen(true)}>click me</button></td>
               </tr>
           ))}
    </table>
    <Modal open={isOpen} onclose={()=>setisOpen(false)}>
    {currentlaunch.map((launch)=>(
        <div key={launch.flight_number}>
        <p>Mission_name:{launch.mission_name}</p>
        <p></p>
        </div>
        ))}
    </Modal>
    <br/><br/>
    <nav>
            <ul className="pagination">
                {pageNumber.map(number=>(
                    <li key={number} className="page-item">
                        <a onClick={()=>paginate(number)} href="#" className="page-link">
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
        </div>
    );

};
export default Data;