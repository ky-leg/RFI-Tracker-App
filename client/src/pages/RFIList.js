import { useState, useEffect } from "react"; 
import styled from "styled-components";
import { Box, Button, DeleteButton } from "../styles";
import { BrowserRouter as Router, Link, useParams } from "react-router-dom";
 

function RFIList({user}) {
    const params = useParams()
    const [project, setProject] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [rfis, setRfis] = useState('')
    console.log("this is user", user)
    
    useEffect(() => {
        fetch(`/projects/${params.id}`)
        .then((r) => r.json())
        .then(r => setProject(r))
    }, [])

    // setRfis(project.rfis)
    function handleDelete(e, id) {
        e.preventDefault();
        setIsLoading(true);
        fetch(`/rfis/${id}`, {
          method: "DELETE",
        })
        .then(() => {
            const newRfis = project.rfis.filter(rfi => (rfi.id !== id))
            setProject({...project, rfis: newRfis})
        });
    }

  


    
    if (!project) return <p>Loading...</p>;

    return (
        <Wrapper>
            <h1>{project.name} RFIs</h1>
            {project.rfis.length > 0 ? (
                project.rfis.map((rfi) => (
                    <RFI key={rfi.id}>
                        <Box>
                            <h2>{rfi.title}</h2>
                            <h4>RFI Creator: {rfi.user_name}</h4>
                            <em>Priority: {rfi.level}</em>
                            <p>{rfi.body}</p>
                            <Wrapper>
                                {user.id === rfi.user_id ? (
                                    <>
                                    <Button as={Link} to={`/rfis/${rfi.id}`}>
                                        Modify RFI
                                    </Button>
                                    <Button onClick={e => handleDelete(e, rfi.id)} variant="outline">
                                        Delete RFI
                                    </Button>
                                    </> 
                                ): null} 
                            </Wrapper>
                            
                        </Box>
                    </RFI>
                ))
            ) : (
                <>
                    <h2>No RFIs Found</h2>
                    <>
                        <Button as={Link} to="/projects">
                            Back To Homepage
                        </Button>
                    </>          
                </>
            )}
        </Wrapper>
    )
}

const Wrapper = styled.section`
  max-width: 800px;
  margin: 40px auto;
`;

const RFI = styled.article`
  margin-bottom: 24px;
`;

export default RFIList;


                            