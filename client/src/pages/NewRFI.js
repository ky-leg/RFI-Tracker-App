import { useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import ReactMarkdown from "react-markdown";
import { Button, Error, FormField, Input, Label, Textarea } from "../styles";

function NewRFI({ projects, user, setProjects }) {
  const [title, setTitle] = useState("");
  const [description, setDesecription] = useState("");
  const [priority, setPriority] = useState(``);
  const [project_id, setProjectID] = useState('');
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const projectOptions = projects.map(project => (
    <option value={project.id}>{project.name}</option>
  ))

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    fetch("/rfis", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        body: description,
        level: priority,
        project_id,
        user_id: user.id,
        status: "open"
      }),
    }).then((r) => {
      setIsLoading(false);
      if (r.ok) {
        r.json().then((r)=> setProjects(r))
        .then(history.push(`/projects/${project_id}`));
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }

  console.log(project_id)

  return (
    <Wrapper>
      <WrapperChild>
        <h2>Create RFI</h2>
        <form onSubmit={handleSubmit}>
          <FormField>
            <Label htmlFor="Project">Project</Label>
            <select
              id="project"
              value={project_id}
              onChange={(e) => setProjectID(e.target.value)}
              >
                <option value="-">(Select One)</option>
                {projects.map(project => (
                  <option value={project.id}>{project.title}</option>
                ))}
            </select>
          </FormField>
          <FormField>
            <Label htmlFor="title">RFI Title</Label>
            <Input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormField>
          <FormField>
            <Label htmlFor="priority">Priority Level</Label>
            <select
              id="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              >
                <option value="-">(Select One)</option>
                <option value="Low">Low</option>
                <option value="High">High</option>
                <option value="Urgent">Urgent</option>
            </select>
          </FormField>
          <FormField>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              rows="10"
              value={description}
              onChange={(e) => setDesecription(e.target.value)}
            />
          </FormField>
          <FormField>
            <Button color="primary" type="submit">
              {isLoading ? "Loading..." : "Submit RFI"}
            </Button>
          </FormField>
          <FormField>
            {errors.map((err) => (
              <Error key={err}>{err}</Error>
            ))}
          </FormField>
        </form>
      </WrapperChild>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  max-width: 1000px;
  margin: 40px auto;
  padding: 16px;
  display: flex;
  gap: 24px;
`;

const WrapperChild = styled.div`
  flex: 1;
`;

export default NewRFI;
