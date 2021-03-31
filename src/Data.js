import {useState , useEffect} from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./style.css"
const Data =()=>{
        const [launches, setLaunches]=useState([]);
        const[currentPage, setcurrentPage]=useState(1);
        const[userperpage]=useState(12);
        const [pagenumberlimit]=useState(2);
        const [maxpagenumberlimit, setmaxpagenumberlimit]=useState(2);
        const [minpagenumberlimit, setminpagenumberlimit]=useState(0)
       
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
        const handleClick=(event)=>{
            setcurrentPage(Number(event.target.id));
        };
        const pageNumber=[];
        const total=launches.length;
        const pages=Math.ceil(total/userperpage);
        for(let i=1;i<=pages;i++){
            pageNumber.push(i);
        }
      
        const renderpagenumber=pageNumber.map(number=>{
            if(number<maxpagenumberlimit+1 && number>minpagenumberlimit){
            return(
                <li key={number} id={number} onClick={handleClick}>
                    {number}
                </li>
            );
            }
            else{
                return null;
            }
        })
        const str="<";
        const str1=">"
        const handleLast=()=>{
            setcurrentPage({pages});
        }
        const handlenext=()=>{
            setcurrentPage(currentPage+1);
            if(currentPage+1>maxpagenumberlimit){
                setmaxpagenumberlimit(maxpagenumberlimit+pagenumberlimit);
                setminpagenumberlimit(minpagenumberlimit+pagenumberlimit);
            }
        }
        const handleprev=()=>{
            setcurrentPage(currentPage-1);
            if((currentPage-1) % pagenumberlimit===0){
                setmaxpagenumberlimit(maxpagenumberlimit-pagenumberlimit);
                setminpagenumberlimit(minpagenumberlimit-pagenumberlimit);
            }
        }
        //status and orbit fields are not accessible cause of that each field of status have failed mark
        //for information field e=when click me button clicked it will give informatiion of all table datas so i have shhown only mission name
        return(
            
            <div className="Data_fetch">
                <img src="data:image/png;base64,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"/>
                <hr color="silver"/>  
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css"></link>
                <i class="fa fa-calendar fa_custom"></i>
            
            
            <select className="dd">
            <option value="Last 6 Months">Last 6 Months</option>
            <option value="Last 3 Months">Last 3 Months</option>
            <option value="Last Month">Last Month</option>
            <option value="Last Year">Last Year</option>
            <option value="Last 2 Years">Last 2 Years</option>
            <option value="Last 2 Weeks">Last 2 Weeks</option>
            <option value="Last Week">Last Week</option>
            </select>    
           
              
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css"></link>
            <i class="fa fa-filter  scd"></i>  
            <select className="dd1">
            <option  value="All Launches">All Launches</option>
            <option value="Upcoming">Upcoming</option>
            <option value="Successfull Launches">Successfull</option>
            <option value="Failed Launches">Failed Launches</option>
            </select>
          
             <br/><br/>

           < table className="tab">
            <tr className="tab1">
              <th>No.</th>
              <th>Launched</th>
              <th>Location</th>
              <th>Mission</th>
              <th>Orbit</th>
              <th>Status</th>
              <th>Rocket</th>
            </tr>
           {currentlaunch.map((launch)=>(
               <tr className="tbody" key={launch.flight_number}>
               <td >{launch.flight_number}</td> 
               <td >{launch.launch_date_local}</td>
               <td >{launch.launch_site.site_name}</td>
               <td>{launch.mission_name}</td>
               <td>{launch.rocket.second_stage.payloads.orbit}</td>
               <td ><p className={
                   launch.rocket.launch_success ? "success" : "failure"
               }>{launch.rocket.launch_success ? "Success" : "Failed"}</p></td>
               <td >{launch.rocket.rocket_name}</td>
               </tr>
           ))}
    </table>

    <br/>
            <ul className="pagenumber">
                <li>
                    <button onClick={handleprev}> {str} </button>
                </li>
               {renderpagenumber}
               <li>&hellip;</li>
               <li onclick={handleLast}>{pages}</li>
               <li>
                    <button onClick={handlenext}> {str1} </button>
                </li>
            </ul>
        </div>
    );

};
export default Data;