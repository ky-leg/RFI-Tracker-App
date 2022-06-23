import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router";
import styled from "styled-components";
import ReactMarkdown from "react-markdown";
import { Button, Error, FormField, Input, Label, Textarea } from "../styles";

function ModifyRFI({ setProjects}) {
  const params = useParams()
  // const [title, setTitle] = useState("");
  // const [description, setDesecription] = useState("");
  // const [priority, setPriority] = useState(``);
//   const [project_id, setProjectID] = useState('');
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const [rfi, setRfi] = useState('')

  useEffect(() => {
    fetch(`/rfis/${params.id}`)
    .then((r) => r.json())
    .then(r => setRfi(r))
}, [])

console.log(rfi)

  function handleSubmit(e) {
    e.preventDefault();
    console.log("title is:", e.target[0].value,
                "priority level is:", e.target[1].value,
                "body is:", e.target[2].value
    )
    setIsLoading(true);
    fetch(`/rfis/${params.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: e.target[0].value,
        body: e.target[2].value,
        level: e.target[1].value
        // project_id,
        // user_id: user.id,
        // status: "open"
      }),
    }).then((r) => {
      setIsLoading(false);
      if (r.ok) {
        r.json().then((r)=> setProjects(r))
        .then(history.push(`/projects/${rfi.project_id}`));
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }

  // console.log(project_id)

  return (
    <Wrapper>
      <WrapperChild>
        <h2>Modify RFI</h2>
        <form 
        onSubmit={handleSubmit}
        >
          <FormField>
            <Label htmlFor="title">RFI Title</Label>
            <Input
              type="text"
              id="title"
              defaultValue={rfi.title}
              // onChange={(e) => setTitle(e.target.value)}
            />
          </FormField>
          <FormField>
            <Label htmlFor="priority">Priority Level</Label>
            <select
              id="priority"
              defaultValue= {rfi.level}
              // onChange={(e) => setPriority(e.target.value)}
              >
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
              defaultValue={rfi.body}
              // onChange={(e) => setDesecription(e.target.value)}
            />
          </FormField>
          <FormField>
            <Button color="primary" type="submit">
              {isLoading ? "Loading..." : "Update RFI"}
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

export default ModifyRFI;
