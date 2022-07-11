import { useState, useEffect } from "react"; 
import styled from "styled-components";
import { Box, Button } from "../styles";
import { BrowserRouter as Router,Link, Route, useRouteMatch, useParams } from "react-router-dom";

 

function UsersProjects({user}) {
    const match = useRouteMatch()
    const [projects, setProjects] = useState('');
    // const params = useParams()
    console.log('user is', user)

    useEffect(() => {
        fetch(`/usersprojects/${user.id}`)
        .then((r) => r.json())
        .then(r => setProjects(r))
    }, []);

    return (
        <Wrapper>
            <h1>{user.first_name}'s On-Going Projects</h1>
            {projects.length > 0 ? (
                projects.map((project) => (
                    <Wrapper>
                        <Project key={project.id} >
                            <Box>
                                <h2>{project.title}</h2>
                                <em>Project Location: {project.location}</em>
                                <p>
                                    <Link to={`${match.url}/${project.id}`}>
                                        <Button>
                                            Project RFIs
                                        </Button>
                                    </Link>                                    
                                </p>
                            </Box>
                        </Project>
                    </Wrapper>
                ))
            ) : (
                <>
                    <h2>No Projects Found</h2>
                    <Router>
                        <Button as = {Link} to="/projects">
                            Back To Homepage
                        </Button>
                    </Router>
                </>
            )}
            <Button as={Link} to="/projects/new">
                Create New Project
            </Button>
        </Wrapper>
    )
}

const Wrapper = styled.section`
  max-width: 800px;
  margin: 40px auto;
`;

const Project = styled.article`
  margin-bottom: 24px;
`;

export default UsersProjects;