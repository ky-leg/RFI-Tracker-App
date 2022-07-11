import React, { useEffect, useState } from "react";
import { Switch, Route, useRouteMatch, useParams, Redirect } from "react-router-dom"; 
import NavBar from "./NavBar";
import Login from "../pages/Login"
import ProjectList from "../pages/ProjectList";
import NewRFI from "../pages/NewRFI";
import RFIList from "../pages/RFIList";
import Params from "./Params"
import NewProject from "../pages/NewProject";
import ModifyRFI from "../pages/ModifyRFI";
import UsersProjects from "../pages/UsersProjects"


function App() {
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);

  const params = useParams();
  console.log("these are params", params);

  useEffect(() => {
      fetch("/projects")
      .then((r) => r.json())
      .then(setProjects)
  }, []);

    console.log(user)

  useEffect(() => {
    // auto-login
    fetch("/me").then((r) => {
      if (r.ok) {
        // r.json().then((user) => setUser(user));
        console.log(r)
        r.json()
        .then((user) => setUser(user))
      }
      
    });
  }, []);


  if (!user) return <Login onLogin={setUser} />;

  return (
   <>
   <NavBar user={user} setUser={setUser} />
    <main>
      
        <Switch>
          <Route exact path="/">
            <Redirect to="/projects"/>
          </Route>  
          <Route exact path="/rfis/new">
            <NewRFI projects={projects} user={user} setProjects={setProjects}/>
          </Route>
          <Route exact path="/projects">
            <ProjectList projects = {projects}/>
          </Route>
          <Route exact path="/projects/new">
            <NewProject setProjects={setProjects}/>
          </Route>
          <Route path={`/projects/:id`}>
            <RFIList user={user}/>
          </Route>
          <Route path={`/rfis/:id`}>
            <ModifyRFI setProjects={setProjects}/>
          </Route>
          <Route path={`/users/:id`}>
            <UsersProjects user={user}/>
          </Route>
        </Switch>

    </main>
   </>
  );
}

export default App;
