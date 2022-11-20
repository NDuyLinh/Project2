import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Row, Card, Table, Dropdown, Button } from "react-bootstrap";
import moment from "moment";
import { STATUS_VOTE, PARTICIPATION_STATUS } from "../common/Foundation";
import { setMembers } from "../reducer/slices/MembersSlice";
import memberActions from "../services/memberActions";

const dateSunday = moment().endOf("isoweek").toDate();

export const PageVisitsTable = () => {
  const dispatch = useDispatch();
  const { members } = useSelector((slice) => slice.membersSlice);

  const filterJoinMember = () => {
    const joinMember = members.filter(member => member.status_id === PARTICIPATION_STATUS.JOIN) || [];
    return joinMember.length > 0 && (
      <p><strong>Tham gia:</strong> {joinMember.length} người.</p>
    )
  }

  const changeStatus = (e, memberId, st) => {
    e.preventDefault();
    const param = {
      memberId: memberId,
      statusId: st.statusId,
      status: st.status,
    }
    const dataMembers = JSON.parse(JSON.stringify(members));
    const newMember = dataMembers.map(member => member.memberId === memberId 
                      ? {...member, status_id: st.statusId, status: st.status} 
                      : member);
    memberActions.updateMemberStatus(param);
    dispatch(setMembers(newMember));
  }

  const TableRow = (props) => {
    const {memberId, name, status, status_id } = props;
    return (
      <tr>
        <td className="fw-bold">{name}</td>
        <td>{status}</td>
        <td>
          <Dropdown className="btn-toolbar">
            <Dropdown.Toggle as={Button} variant="primary" size="sm" className="me-2 btn-vote">
              Vote
            </Dropdown.Toggle>
            <Dropdown.Menu className="dashboard-dropdown dropdown-menu-left mt-2">
              {STATUS_VOTE.map((st) => (
                <Dropdown.Item onClick={(e) => changeStatus(e, memberId, st)} className={`${st.statusId === status_id ? "active" : ""} fw-bold`} key={`status-${st.statusId}`}>
                  <FontAwesomeIcon icon={st.icon} className={`${st.className} me-2`} />
                  <span className={st.className}>{st.status}</span>
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </td>
      </tr>
    );
  };

  return (
    <Card border="light" className="shadow-sm">
      <Card.Header>
        <Row className="align-items-center">
          <Col>
            <h5>{`Thời Gian: 8:00 AM, ${dateSunday.getDate()}/${dateSunday.getMonth() + 1}/${dateSunday.getFullYear()}`}</h5>
            <p><strong>Địa điểm:</strong> sân Tân Việt - 234 Bình Long, Phú Thạnh, Q.Tân Phú, TP.HCM</p>
            {filterJoinMember()}
          </Col>
        </Row>
      </Card.Header>
      <Table responsive className="align-items-center table-flush">
        <thead className="thead-light">
          <tr>
            <th scope="col">Anh em</th>
            <th scope="col">Trạng thái</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {members.map((member, index) => (
            <TableRow key={`page-visit-${index}`} {...member} />
          ))}
        </tbody>
      </Table>
    </Card>
  );
};
