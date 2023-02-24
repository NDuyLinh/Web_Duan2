import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { getDocs } from "firebase/firestore";
import { fireStoreRef } from "../../services/firebaseConfig";
import MembersTable from "../../components/Members";

const Members = (props) => {
  const { isAdmin } = useSelector((state) => state.membersSlice);
  const [member, setMembet] = useState([]);

  if(!isAdmin) props.history.push("/");

  useEffect(() => {
    getDocs(fireStoreRef).then((snapShot) => {
      let members = [];
      snapShot.docs.forEach((doc) => {
        members.push({...doc.data(), id: doc.id})
      })
      if(members.length > 0) {
        const filter = members.filter(member => member.role === "user");
        setMembet(filter);
      }
    })
  }, []);

  return (
    <React.Fragment>
      <Row>
        <Col xs={12} xl={12} className="mb-4">
          <MembersTable members={member}/>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default withRouter(Members);
